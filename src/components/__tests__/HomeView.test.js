import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'
import { createTestingPinia } from '@pinia/testing'
import { useCarStore } from '@/stores/cars'
import { nextTick } from 'vue'

const mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({ push: mockPush })
}))

describe('HomeView.vue', () => {
  let store
  let pinia

  beforeEach(() => {
    mockPush.mockReset()

    pinia = createTestingPinia({
      createSpy: vi.fn,
      stubActions: false
    })

    store = useCarStore(pinia)

    store.cars = [
      {
        id: 1,
        brand: 'Toyota',
        model: 'Corolla',
        year: 2002,
        transmission: 'Automatic',
        fuel_type: 'Petrol',
        passengers: 5,
        daily_price_huf: 10000,
        image: 'car.jpg'
      }
    ]
    store.reservations = []

    // !!! Itt mockoljuk a metódusokat
    store.fetchCars = vi.fn()
    store.fetchReservations = vi.fn()
  })

  it('shows cars correctly if no reservation conflict', async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [pinia]
      }
    })

    await flushPromises()
    expect(wrapper.html()).toContain('Toyota')
  })

  it('displays error if fromDate is after toDate', async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [pinia]
      }
    })

    store.fromDate = '2025-12-12'
    store.toDate = '2025-01-01'

    await wrapper.vm.checkDates(store.fromDate, store.toDate)
    await nextTick()

    expect(wrapper.vm.dateError).toBe(true)
  })

  it('calls router.push when reserve is clicked', async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [pinia]
      }
    })

    wrapper.vm.goToReserve(store.cars[0])
    expect(mockPush).toHaveBeenCalledWith('/reserve')
  })
})
