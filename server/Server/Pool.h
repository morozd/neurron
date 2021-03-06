#ifndef Pool_h__
#define Pool_h__

#include <stdlib.h>

namespace sv
{
	template <class T>
	class Pool
	{
	private:
		struct Entry
		{
			T*		m_Object;
			Entry*	m_Next;
		};

	public:
		typedef Entry* Iterator;

		Pool();
		~Pool();

		void		Init(uint size);
		void		Clear();

		T*			Get();
		void		Free (T* object);
		void		FreeAll();

		Iterator	First() { return m_UsedEntries; }
		T*			Get(Iterator iterator) { return iterator->m_Object; }
		Iterator	Next(Iterator iterator) { return iterator->m_Next; }

	private:
		void		Resize(uint size);

		uint		m_Size;
		Entry*		m_Entries;
		Entry*		m_FreeEntries;
		Entry*		m_UsedEntries;
	};
}

//////////////////////////////////////////////////////////////////////////////////////////////////7

template <class T>
sv::Pool<T>::Pool()
: m_Size(0)
, m_Entries(0)
, m_UsedEntries(0)
, m_FreeEntries(0)
{
}

template <class T>
sv::Pool<T>::~Pool()
{
	Clear();
}

template <class T>
void sv::Pool<T>::Init(uint size)
{
	Clear();

	m_Size = size;
	m_Entries = static_cast<Entry*>(malloc(sizeof(Entry) * m_Size));

	for(uint i=0; i<m_Size-1; ++i)
	{
		m_Entries[i].m_Next = &m_Entries[i+1];
		m_Entries[i].m_Object = S_NEW T();
	}
	m_FreeEntries = &m_Entries[0];

	m_Entries[m_Size-1].m_Next = 0;
	m_Entries[m_Size-1].m_Object = S_NEW T();
}

template <class T>
void sv::Pool<T>::Clear()
{
	if(m_Entries)
	{
		for(uint i=0; i<m_Size; ++i)
			delete(m_Entries[i].m_Object);
		free(m_Entries);

		m_Entries = 0;
	}
}

template <class T>
T* sv::Pool<T>::Get()
{
	if(! m_FreeEntries)
		Resize(m_Size * 2);

	Entry* entry = m_FreeEntries;
	m_FreeEntries = m_FreeEntries->m_Next;

	entry->m_Next = m_UsedEntries;
	m_UsedEntries = entry;

	return entry->m_Object;
}

template <class T>
void sv::Pool<T>::Free(T* object)
{
	Entry** formerPt = &m_UsedEntries;
	Entry* entry = m_UsedEntries;
	while(entry)
	{
		if(entry->m_Object == object)
		{
			*formerPt = entry->m_Next;

			entry->m_Next = m_FreeEntries;
			m_FreeEntries = entry;
		}
		formerPt = &entry->m_Next;
		entry = entry->m_Next;
	}
}

template <class T>
void sv::Pool<T>::FreeAll()
{
	Entry* entry = m_UsedEntries;
	Entry* temp = 0;
	while(entry)
	{
		temp = entry->m_Next;

		entry->m_Next = m_FreeEntries;
		m_FreeEntries = entry;

		entry = temp;
	}
	m_UsedEntries = 0;
}

template <class T>
void sv::Pool<T>::Resize(uint size)
{
	ASSERT(m_Size < size, "can't shrink pool.");

	Entry* entries = static_cast<Entry*>(malloc(sizeof(Entry) * size));
	Entry* temp = m_UsedEntries;

	for(uint i=0; i<m_Size-1; ++i)
	{
		entries[i].m_Next = &entries[i+1];
		entries[i].m_Object = temp->m_Object;
		temp = temp->m_Next;
	}
	m_UsedEntries = &entries[0];
	entries[m_Size-1].m_Next = 0;
	entries[m_Size-1].m_Object = temp->m_Object;

	for(uint i=m_Size; i<size-1; ++i)
	{
		entries[i].m_Next = &entries[i+1];
		entries[i].m_Object = S_NEW T();
	}
	m_FreeEntries = &entries[m_Size];
	entries[size-1].m_Next = 0;
	entries[size-1].m_Object = S_NEW T();

	m_Size = size;
	free(m_Entries);
	m_Entries = entries;
}

#endif // Pool_h__