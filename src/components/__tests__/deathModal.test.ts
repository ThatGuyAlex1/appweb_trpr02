import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import DeathModel from '../DeathModal.vue'
import { Modal } from 'bootstrap'

describe('DeathModel.vue', () => {

  it('Doit afficher les bonnes informations dans la boite de dialogue.', () => {
    const wrapper = mount(DeathModel, {
      props: {
        title: 'mon titre',
        body: 'mon contenu',
        dismissButton: 'OK',
      }
    })

    expect(wrapper.text()).toContain('mon titre')
    expect(wrapper.text()).toContain('mon contenu')
    expect(wrapper.find('button[name="confirmer"]').exists()).toBe(true)
  })

  it('Sur confirmation, doit émettre un événement.', async () => {
    const wrapper = mount(DeathModel, {
      props: {
        title: 'mon titre',
        body: 'mon contenu',
        dismissButton: 'OK',
      }
    })

    await wrapper.find('button[name="confirmer"]').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('onDeathConfirmed')
  })
})