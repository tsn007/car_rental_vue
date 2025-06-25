
import { mount, flushPromises } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useCarStore } from '@/stores/cars'
import ReserveView from '@/views/ReserveView.vue'
import { describe, it, beforeEach, expect, vi } from 'vitest'

describe('ReserveView.vue', () => {
  let pinia
  let store

  beforeEach(() => {
    pinia = createTestingPinia({ createSpy: vi.fn, stubActions: false })
    store = useCarStore(pinia)

    store.selectedCar = {
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
    store.fromDate = '2025-01-01'
    store.toDate = '2025-01-03'
  })

  it('renders selected car info', () => {
    const wrapper = mount(ReserveView, {
      global: { plugins: [pinia] }
    })
    expect(wrapper.html()).toContain('Toyota')
    expect(wrapper.html()).toContain('car.jpg')
  })

  it('shows error if form is incomplete', async () => {
    const wrapper = mount(ReserveView, {
      global: { plugins: [pinia] }
    })
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()
    expect(wrapper.vm.error).toBe(true)
  })
})
