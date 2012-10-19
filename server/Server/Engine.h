#ifndef Engine_h__
#define Engine_h__

#include "Singleton.h"

namespace sv
{
	class Engine : public Singleton<Engine>
	{
	public:
		Engine(void);
		~Engine(void);

	public:
		void Run();
	};
}

#endif
