#ifndef Game_h__
#define Game_h__

#include <WinSock2.h>

namespace sv
{
	class Game
	{
		friend class GameFactory;
	public:
		unsigned int		GetId() { return m_Id; }

		void				SetSocket(SOCKET s) { m_Socket = s; }
		SOCKET				GetSocket() { return m_Socket; }

	private:
		Game(unsigned int id);
		~Game();

		SOCKET m_Socket;
		unsigned int m_Id;
	};
}

#endif

