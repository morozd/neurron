#ifndef LeakDetector_h__
#define LeakDetector_h__

/*#ifdef _DEBUG

#include <Windows.h>
#include <list>

struct AllocInfo
{
	DWORD	address;
	DWORD	size;
	char	file[64];
	DWORD	line;
};

void AddTrack(DWORD addr,  DWORD asize,  const char *fname, DWORD lnum);
void RemoveTrack(DWORD addr);
void DumpUnfreed();

inline void * __cdecl operator new(unsigned int size, const char *file, int line)
{
	void *ptr = (void *)malloc(size);
	AddTrack((DWORD)ptr, size, file, line);
	return(ptr);
};

inline void __cdecl operator delete(void *p)
{
	RemoveTrack((DWORD)p);
	free(p);
};

#define DEBUGNEW new(__FILE__, __LINE__)

#else

#define DEBUGNEW new



#endif


#define new DEBUGNEW*/

#endif // LeakDetector_h__