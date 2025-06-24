import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useProfileStore } from '@/stores/cars'
import { setActivePinia, createPinia } from 'pinia'

vi.stubGlobal('fetch', vi.fn())

describe('useProfileStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    fetch.mockReset()
  })

  it('fetches admin data successfully', async () => {
    const mockData = { email: 'admin@admin.com', password: 'admin' }

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    })

    const store = useProfileStore()
    await store.fetchAdmin()

    expect(store.admin).toEqual(mockData)
    expect(store.error).toBe(null)
    expect(store.loading).toBe(false)
  })

  it('sets error when response is not ok', async () => {
    fetch.mockResolvedValueOnce({ ok: false })

    const store = useProfileStore()
    await store.fetchAdmin()

    expect(store.admin).toBe(null)
    expect(store.error).toBeInstanceOf(Error)
    expect(store.loading).toBe(false)
  })

  it('sets error when fetch throws', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'))

    const store = useProfileStore()
    await store.fetchAdmin()

    expect(store.admin).toBe(null)
    expect(store.error).toBeInstanceOf(Error)
    expect(store.error.message).toBe('Network error')
    expect(store.loading).toBe(false)
  })

  it('sets error if json parsing fails', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => { throw new Error('Invalid JSON') },
    })

    const store = useProfileStore()
    await store.fetchAdmin()

    expect(store.admin).toBe(null)
    expect(store.error).toBeInstanceOf(Error)
    expect(store.error.message).toBe('Invalid JSON')
    expect(store.loading).toBe(false)
  })
})
