import { describe, afterEach, expect, vi, it } from 'vitest'
import { mount } from '@vue/test-utils'
import GameEnemy from '../GameEnemy.vue'

describe('GameEnemy.vue', () => {
    it("Doit afficher les props aux bonnes places sur la page", async () => {
        const wrapper = mount(GameEnemy, {
            props: { ennemyName: 'testName',
                ennemyShip: 'shipName',
                ennemyLife: 200,
                maxEnnemyLife: 200,
                ennemyExperience: 2,
                ennemyCG: 50 }
        }   )

    expect(wrapper.find('#ennemyNameText').text()).toContain('testName');
    expect(wrapper.find('#ennemyExperienceAndCGText').text()).toContain('Confirmé');
    expect(wrapper.find('#ennemyExperienceAndCGText').text()).toContain('50');
    expect(wrapper.find('#ennemyShipText').text()).toContain('shipName');
    expect(wrapper.find('#ennemyLifeBar').text()).toContain('100');
    })
  
    it("Doit afficher le bon pourcentage de vie et l'arrondir au besoins", async () => {
        const wrapper = mount(GameEnemy, {
            props: { ennemyName: 'testName',
                ennemyShip: 'shipName',
                ennemyLife: 99,
                maxEnnemyLife: 200,
                ennemyExperience: 2,
                ennemyCG: 50 }
        }   )

      expect(wrapper.find('#ennemyNameText').text()).toContain('testName');
      expect(wrapper.find('#ennemyExperienceAndCGText').text()).toContain('Confirmé');
      expect(wrapper.find('#ennemyExperienceAndCGText').text()).toContain('50');
      expect(wrapper.find('#ennemyShipText').text()).toContain('shipName');
      expect(wrapper.find('#ennemyLifeBar').text()).toContain('50');     
    })
  })
  