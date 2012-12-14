#include "ServerPCH.h"
#include "ObstacleManager.h"

#include "Grid.h"
#include "Game.h"
#include "Msg.h"
#include "StatusManager.h"
#include "Player.h"

#include <iostream>
#include <fstream>

#ifdef WIN32
#include <direct.h>
#define GetWorkingDir _getcwd
#else
#include <unistd.h>
#define GetWorkingDir getcwd
#endif

/*
const int sv::ObstacleManager::s_LevelSize = 1;//30;
const char* sv::ObstacleManager::s_Level[s_LevelSize] = 
{
//a - ein Feld, 1, Energie minus 10%, rot
//b - ein Feld, 1, Energie plus 10%, gr�n
//c - ein Feld, 1, Punkte plus 100, gelb
//d - ein Feld, 1, Punkte plus 50, gelb

//  0         10        20
//  012345678901234567890
/*	"cadacadadaacadcc",
	"   c  a  d   aaa",
	"acacabccac a bc ",
	"  b bcbc cb   cb",
	"dada a adaadada ",
	" b  dbd   a b  b",
	"a da dd abaaba  ",
	"dadda dab bd ddd",
	"bca  ca aaaca   ",
	" b  cbc   a b  b",
    "d  a a a db d b ",
	"  b bdbd db   db",
	"dada a adaadadaa",
	" b  dbd   a b  b",
	"a da dd abaaba  ",
	"dadda dab bd ddd",
	"bdb  da aaada   ",
	"  d d  d dba aaa",
	"da a a a db d b ",
	" b  dbd   a b  b",
    "a ca cc abaaba  ",
	"cbcca cab bc ddd",
	"bda  da aaada   ",
	" ac c  c cba aaa",
	"c  a a a cb c b ",
	"  b bcbc cb   cb",
	"dada a adaadada ",
	" b  dbd   a b  b",
	"a da dd abaaba  ",
	"dadda dab bd ddd", * /
	"a               ",
};
*/

sv::Obstacle::Properties sv::ObstacleManager::GetProperties(uchar category)
{
	Obstacle::Properties prop;
	switch(category)
	{
	case 1:
		{
			prop.m_Type = Obstacle::eObstacleType_EnergyDown;
			prop.m_Value = 10;
			prop.m_Size = 1;
			prop.m_Velocity = 1;
		} break;
	case 2:
		{
			prop.m_Type = Obstacle::eObstacleType_EnergyUp;
			prop.m_Value = 10;
			prop.m_Size = 1;
			prop.m_Velocity = 1;
		} break;
	case 3:
		{
			prop.m_Type = Obstacle::eObstacleType_PointsUp;
			prop.m_Value = 100;
			prop.m_Size = 1;
			prop.m_Velocity = 1;
		} break;
	case 4:
		{
			prop.m_Type = Obstacle::eObstacleType_PointsUp;
			prop.m_Value = 50;
			prop.m_Size = 1;
			prop.m_Velocity = 1;
		} break;
	}
	return prop;
}

sv::ObstacleManager::ObstacleManager(Game* game)
: Manager(game)
, m_IdCount(1)
, m_PassedTime(0)
, m_Step(0)
, m_LevelSize(0)
, m_Level(0)
{
	ParseLevel();
}


sv::ObstacleManager::~ObstacleManager()
{
	for(uint i=0; i<m_LevelSize; i++)
		free(m_Level[i]);
	free(m_Level);
}

void sv::ObstacleManager::Reset()
{
	m_IdCount = 1;
	m_Step = 0;
	m_PassedTime = 0;

	Pool<Obstacle>::FreeAll();
	Pool<Obstacle>::Clear();
}

void sv::ObstacleManager::Start()
{
	Pool<Obstacle>::Init(80);
}

void sv::ObstacleManager::Update(ulong deltaTime)
{
	Iterator iter = First();
	while(iter)
	{
		Obstacle* obstacle = Get(iter);
		iter = Next(iter);

		obstacle->Update(deltaTime);
		if( obstacle->IsEdge() )
			HandleCollision(obstacle);
		if( obstacle->GetPos() == Grid::InvalidPos )
			DeleteObstacle(obstacle);
	}

	UpdateLevel(deltaTime);
}

void sv::ObstacleManager::UpdateLevel(ulong deltaTime)
{
	m_PassedTime += deltaTime;
	if(m_PassedTime > MOVE_TIME_OB)
	{
		m_PassedTime -= MOVE_TIME_OB;
		m_Step ++;
		if(m_Step == m_LevelSize)
			m_Step = 0;

		for(uchar i=0; i<GetGrid()->GetNumberLanes(); ++i)
		{
			if(m_Level[m_Step][i] != ' ')
				CreateObstacle(m_Level[m_Step][i] - 'a' +1, i);
		}
	}
}

sv::Obstacle* sv::ObstacleManager::CreateObstacle(uchar category, uchar lane)
{
	Obstacle* obstacle = Get();
	Obstacle::Properties prop = GetProperties(category);
	uchar pos = GetGrid()->GetInnerPos(lane);
	obstacle->Init(m_IdCount, GetGrid(), prop);
	obstacle->Start(pos);

	LOG2(DEBUG_OBSTACLES, "Obstacle created: id: %i, pos: %i", m_IdCount, pos);

	ObstacleMsg obstacleMsg(m_IdCount, category, pos);
	GetGame()->SendMsg(&obstacleMsg);

	if(m_IdCount == 255)
		m_IdCount = 1;
	else
		m_IdCount++;

	return obstacle;
}
		
void sv::ObstacleManager::DeleteObstacle(Obstacle* obstacle)
{
	obstacle->Reset();
	Free(obstacle);
}

void sv::ObstacleManager::HandleCollision(Obstacle* obstacle)
{
	Player* player[PLAYER_MAX];
	uchar count = 0;
	GetGrid()->GetPlayer(obstacle->GetPos(), player, count);

	uchar pos = 0;
	for(uchar i=0; pos<count; ++i)
	{
		Player* pl = player[i];

		if(pl->GetEnergy())
			player[pos++] = pl;
		else
			count--;
	}

	if(count)
	{
		uchar playerIds[PLAYER_MAX];
		for(uint i=0; i<count; ++i)
			playerIds[i] = player[i]->GetId();
		CollisionMsg collisionMsg(obstacle->GetId(), count);
		collisionMsg.SetPlayer(playerIds);
		GetGame()->SendMsg(&collisionMsg);

		GetStatusManager()->CalculateCollision(obstacle, player, count);
		LOG1(DEBUG_OBSTACLES, "Collision: id %i", obstacle->GetId());

	//	if(obstacle->GetType() != Obstacle::eObstacleType_EnergyDown)
	//	{
			DeleteObstacle(obstacle);
	//	}
	}
}

void sv::ObstacleManager::ParseLevel(){
	char dir[1024];
#ifdef WIN32
	GetModuleFileName(0, dir, sizeof(dir));
#else
	readlink("/proc/self/exe", dir, sizeof(dir));
#endif

	int pos = strlen(dir) - 1;
	while(pos >= 0 && dir[pos] != '/' && dir[pos] != '\\')
		pos--;

	char seperator = dir[pos];
	
#ifdef WIN32
	sprintf_s(dir + pos + 1, sizeof(dir) - pos - 1, "..%cLevel%cdefault.lvl", seperator, seperator);
#else
	sprintf(dir + pos + 1, "..%cLevel%cdefault.lvl", seperator, seperator);
#endif

	std::ifstream inFile;
	inFile.open(dir);

	bool success = ! inFile.fail();
	if(success)
	{
		char lane = 0;
		char step = 0;
		char c = inFile.get();

		char line[LANE_MAX];
		char* level[1024];

		while(inFile.good() && lane < sizeof(level))
		{
			while(c != '\n' && c != '\r')
			{
				if(step < 16)
					line[step++] = c;
				
				c = inFile.get();
			}

			if(step > 0)
			{
				level[lane] = (char*) malloc(LANE_MAX * sizeof(char));
				memcpy(level[lane], line, LANE_MAX * sizeof(char));

				lane++;
			}
			step = 0;

			c = inFile.get();
		}

		m_LevelSize = lane;
		m_Level = (char**) malloc(lane * sizeof(char*));
		memcpy(m_Level, level, lane * sizeof(char*));
	}
	else
	{
		m_LevelSize = 1;
		m_Level = (char**) malloc(1 * sizeof(char*));
		m_Level[0] = (char*) malloc(LANE_MAX * sizeof(char));
		memset(m_Level[0], ' ', LANE_MAX * sizeof(char));
	}
}