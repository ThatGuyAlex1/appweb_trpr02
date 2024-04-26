import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import WinModel from '../WinModal.vue'
import { Modal } from 'bootstrap'

describe('WinModel.vue', () => {

  it('Doit afficher les bonnes informations dans la boite de dialogue.', () => {
    const wrapper = mount(WinModel, {
      props: {
        title: 'mon titre',
        body1: 'mon contenu1',
        body2: 'mon contenu2',
        credits: 5,
        dismissButton: 'OK',
      }
    })

    expect(wrapper.text()).toContain('mon titre')
    expect(wrapper.text()).toContain('mon contenu1')
    expect(wrapper.text()).toContain('mon contenu2')
    expect(wrapper.text()).toContain('5')
    expect(wrapper.find('button[name="confirmer"]').exists()).toBe(true)
  })

  it('Sur confirmation, doit émettre un événement.', async () => {
    const wrapper = mount(WinModel, {
      props: {
        title: 'mon titre',
        body: 'mon contenu',
        dismissButton: 'OK',
      }
    })

    await wrapper.find('button[name="confirmer"]').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('onWinConfirmed')
  })
})