#include "ServerPCH.h"
#include "Element.h"

#include "Grid.h"

sv::Element::Element()
: m_Id(0)
, m_Pos(0)
, m_NextPos(m_Pos)
, m_DesiredPos(m_Pos)
, m_PassedTime(0)
, m_Moving(false)
, m_Grid(0)
{
}

sv::Element::~Element()
{
}

void sv::Element::Init(uchar id, Grid* grid)
{
	m_Id = id;
	m_Moving = false;
	m_Grid = grid;
}

void sv::Element::Reset()
{
	m_Id = 0;
	m_Pos = 0;
	m_NextPos = 0;
	m_DesiredPos = 0;
	m_PassedTime = 0;
	m_Moving = false;
	m_Grid = 0;
}

void sv::Element::Start(uchar pos)
{
	m_Pos = pos;
	m_NextPos = m_Pos;
	m_DesiredPos = m_Pos;
}

void sv::Element::Update(ulong deltaTime)
{
	if(m_Moving)
	{
		m_PassedTime += deltaTime;
		if(m_PassedTime > GetChangeTime())
		{
			SetPos(m_NextPos);
		}
		if(m_PassedTime > MOVE_TIME)
		{
			if(m_DesiredPos != m_Pos)
			{
				m_PassedTime = 0;
				m_NextPos = m_DesiredPos;
			}
			else
			{
				m_Moving = false;
			}
		}
	}
}

uchar sv::Element::MoveRigth()
{
	m_DesiredPos = m_Grid->GetPosRight(m_NextPos);
	if(! m_Moving)
	{
		m_PassedTime = 0;
		m_NextPos = m_DesiredPos;
		m_Moving = true;
	}
	LOG1(DEBUG_MOVEMENT, "Move right to %i", m_DesiredPos);
	return m_DesiredPos;
}

uchar sv::Element::MoveLeft()
{
	m_DesiredPos = m_Grid->GetPosLeft(m_NextPos);
	if(! m_Moving)
	{
		m_PassedTime = 0;
		m_NextPos = m_DesiredPos;
		m_Moving = true;
	}
	LOG1(DEBUG_MOVEMENT, "Move left to %i", m_DesiredPos);
	return m_DesiredPos;
}

uchar sv::Element::MoveOut()
{
	m_DesiredPos = m_Grid->GetPosOut(m_NextPos);
	if(! m_Moving)
	{
		m_PassedTime = 0;
		m_NextPos = m_DesiredPos;
		m_Moving = true;
	}
	LOG1(DEBUG_MOVEMENT, "Move out to %i", m_DesiredPos);
	return m_DesiredPos;
}
