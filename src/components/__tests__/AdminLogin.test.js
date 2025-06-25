import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import AdminLogin from '@/views/AdminLogin.vue'
import { createTestingPinia } from '@pinia/testing'
import { useProfileStore } from '@/stores/cars'

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn()
  })
}))

describe('AdminLogin.vue', () => {
  let store

  beforeEach(() => {
    const pinia = createTestingPinia({ createSpy: vi.fn })
    store = useProfileStore(pinia)
    store.fetchAdmin = vi.fn().mockResolvedValue()
    store.admin = { email: 'admin@test.com', password: '1234' }
  })

  it('logs in with correct credentials and redirects', async () => {
    const wrapper = mount(AdminLogin, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })]
      }
    })

    const store = useProfileStore()
    store.fetchAdmin = vi.fn(() => {
      store.admin = { email: 'admin@admin.com', password: 'admin' }
    })

    await wrapper.find('input[placeholder="Email"]').setValue('admin@admin.com')
    await wrapper.find('input[placeholder="Password"]').setValue('admin')
    await wrapper.find('form').trigger('submit.prevent')

    await flushPromises()

    expect(store.fetchAdmin).toHaveBeenCalled()
    expect(localStorage.getItem('admin')).toBe('true')
  })

  it('shows error with incorrect credentials', async () => {
    const wrapper = mount(AdminLogin, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })]
      }
    })

    const store = useProfileStore()
    store.fetchAdmin = vi.fn(() => {
      store.admin = { email: 'admin@admin.com', password: 'admin' }
    })

    await wrapper.find('input[placeholder="Email"]').setValue('wrong@test.com')
    await wrapper.find('input[placeholder="Password"]').setValue('wrongpass')
    await wrapper.find('form').trigger('submit.prevent')

    await flushPromises()

    expect(wrapper.vm.error).toBe(true)
  })
})
