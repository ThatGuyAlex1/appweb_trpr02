import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import LeaveModel from '../LeaveModal.vue'
import { Modal } from 'bootstrap'

describe('LeaveModel.vue', () => {

  it('Doit afficher les bonnes informations dans la boite de dialogue.', () => {
    const wrapper = mount(LeaveModel, {
      props: {
        title: 'mon titre',
        body: 'mon contenu',
        cancelButton: 'cancel',
        confirmButton: 'OK',
      }
    })

    expect(wrapper.text()).toContain('mon titre')
    expect(wrapper.text()).toContain('mon contenu')
    expect(wrapper.find('button[name="confirmer"]').exists()).toBe(true)
    expect(wrapper.find('button[name="annuler"]').exists()).toBe(true)
  })

  it('Sur confirmation, doit émettre un événement.', async () => {
    const wrapper = mount(LeaveModel, {
      props: {
        title: 'mon titre',
        body: 'mon contenu',
        dismissButton: 'OK',
      }
    })

    await wrapper.find('button[name="confirmer"]').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('onLeaveConfirmed')
  })
})