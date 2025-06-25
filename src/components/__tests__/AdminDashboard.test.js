import { describe, it, expect, beforeEach, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import AdminView from '@/views/AdminDashboard.vue'
import { createTestingPinia } from '@pinia/testing'

describe('AdminView.vue', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('shows not authorized if admin is not in localStorage', () => {
    const wrapper = mount(AdminView, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })]
      }
    })
    expect(wrapper.text()).toContain('Not authorized!')
  })

  it('shows dashboard if admin is in localStorage', async () => {
    localStorage.setItem('admin', 'true')

    const wrapper = mount(AdminView, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })]
      }
    })

    await flushPromises()

    expect(wrapper.text()).toContain('Admin Dashboard')
    expect(wrapper.text()).toContain('Reservations')
    expect(wrapper.text()).toContain('Add car')
    expect(wrapper.text()).toContain('Modify Car')
  })

   it('sets isReservations true and others false on handleResClick', async () => {
    const wrapper = mount(AdminView, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })]
      }
    })

    await wrapper.vm.handleResClick()
    expect(wrapper.vm.isReservations).toBe(true)
    expect(wrapper.vm.isAddCar).toBe(false)
    expect(wrapper.vm.isModifyCar).toBe(false)
  })

  it('sets isAddCar true and others false on handleAddClick', async () => {
    const wrapper = mount(AdminView, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })]
      }
    })

    await wrapper.vm.handleAddClick()
    expect(wrapper.vm.isAddCar).toBe(true)
    expect(wrapper.vm.isReservations).toBe(false)
    expect(wrapper.vm.isModifyCar).toBe(false)
  })

  it('sets isModifyCar true and others false on handleModClick', async () => {
    const wrapper = mount(AdminView, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })]
      }
    })

    await wrapper.vm.handleModClick()
    expect(wrapper.vm.isModifyCar).toBe(true)
    expect(wrapper.vm.isReservations).toBe(false)
    expect(wrapper.vm.isAddCar).toBe(false)
  })
})
