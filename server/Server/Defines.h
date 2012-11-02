#ifdef WIN32
#ifdef _DEBUG
#define DEBUG
#endif
#endif

typedef unsigned int uint;
typedef unsigned char uchar;

#define DEBUG_SERVER true
#define DEBUG_PROTOCOLL false
#define DEBUG_MSG true
#define LOG_ERROR true
#define DEBUG_WEBSOCKET false


#ifdef DEBUG

#include "Output.h"

#define ASSERT(x,y) if(!(x)) sv::Output::Error(y);
#define LOG(x,y) if(x) sv::Output::Print(y);
#define LOG1(x,y,z) if(x) { char buf[1024]; sprintf_s(buf,y,z); sv::Output::Print(buf); }

#else

#define ASSERT(x,y)
#define LOG(x,y)
#define LOG1(x,y,z)

#endif
