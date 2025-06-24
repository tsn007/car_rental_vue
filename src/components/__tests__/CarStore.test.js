import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCarStore } from '@/stores/cars'

vi.stubGlobal('fetch', vi.fn())

describe('Car store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    fetch.mockReset()
  })

  it('fetches cars successfully', async () => {
    const mockCars = [
      { id: 1, brand: 'Toyota', model: 'Corolla', year: 2020 },
      { id: 2, brand: 'Ford', model: 'Focus', year: 2021 }
    ]
    fetch.mockResolvedValueOnce({ ok: true, json: async () => mockCars })

    const store = useCarStore()
    await store.fetchCars()

    expect(store.cars).toEqual(mockCars)
    expect(store.error).toBe(null)
    expect(store.loading).toBe(false)
  })

  it('handles network error during fetchCars', async () => {
    fetch.mockRejectedValueOnce(new Error('Network failure'))
    const store = useCarStore()
    await store.fetchCars()

    expect(store.cars).toEqual([])
    expect(store.error.message).toBe('Network failure')
    expect(store.loading).toBe(false)
  })

  it('handles non-ok response from server (fetchCars)', async () => {
    fetch.mockResolvedValueOnce({ ok: false })
    const store = useCarStore()
    await store.fetchCars()

    expect(store.cars).toEqual([])
    expect(store.error).toBeInstanceOf(Error)
    expect(store.error.message).toBe('Failed to load data')
    expect(store.loading).toBe(false)
  })

  it('saves reservation successfully', async () => {
    fetch.mockResolvedValueOnce({ ok: true })
    fetch.mockResolvedValueOnce({ ok: true, json: async () => [] })
    const store = useCarStore()
    store.selectedCar = { id: 1 }
    store.reservations = []

    await store.saveReservation('John Doe', 'john@example.com', '123 Main St', '123456789')
    expect(fetch).toHaveBeenCalled()
  })

  it('handles error during saveReservation', async () => {
    fetch.mockResolvedValueOnce({ ok: false })
    const store = useCarStore()
    store.selectedCar = { id: 1 }
    store.reservations = []

    console.error = vi.fn()
    await store.saveReservation('Jane Doe', 'jane@example.com', '456 Main St', '987654321')
    expect(console.error).toHaveBeenCalledWith('Error submitting reservation')
  })

  it('adds a new car successfully', async () => {
    fetch.mockResolvedValueOnce({ ok: true })
    fetch.mockResolvedValueOnce({ ok: true, json: async () => [] })
    const store = useCarStore()
    store.cars = []

    await store.saveCar('Audi', 'A4', 2022, 'Manual', 'Diesel', 5, 20000, 'image.jpg')
    expect(fetch).toHaveBeenCalled()
  })

  it('handles error while adding car', async () => {
    fetch.mockResolvedValueOnce({ ok: false })
    const store = useCarStore()
    console.error = vi.fn()

    await store.saveCar('BMW', 'X5', 2021, 'Auto', 'Petrol', 5, 30000, 'image.png')
    expect(console.error).toHaveBeenCalledWith('Error while adding car!')
  })

  it('updates a car successfully', async () => {
    fetch.mockResolvedValueOnce({ ok: true })
    fetch.mockResolvedValueOnce({ ok: true, json: async () => [] })
    const store = useCarStore()

    await store.updateCar(1, 'Ford', 'Fiesta', 2020, 'Manual', 'Petrol', 5, 15000, 'image.png')
    expect(fetch).toHaveBeenCalled()
  })

  it('handles error while updating car', async () => {
    fetch.mockResolvedValueOnce({ ok: false })
    const store = useCarStore()
    console.error = vi.fn()

    await store.updateCar(1, 'Ford', 'Fiesta', 2020, 'Manual', 'Petrol', 5, 15000, 'image.png')
    expect(console.error).toHaveBeenCalledWith('Error while updating car!')
  })
})
