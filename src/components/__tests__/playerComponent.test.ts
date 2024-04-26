import { describe, afterEach, expect, vi, it } from 'vitest'
import { mount } from '@vue/test-utils'
import GamePlayer from '../GamePlayer.vue'

describe('GamePlayer.vue', () => {
    it("Doit afficher les props aux bonnes places sur la page", async () => {
        const wrapper = mount(GamePlayer, {
            props: { playerName: 'testName',
                playerShip: 'shipName',
                playerLife: 200,
                maxPlayerLife: 200,
                playerExperience: 4,
                currentPlayerCG: 50 }
        }   )

    expect(wrapper.find('#playerNameText').text()).toContain('testName');
    expect(wrapper.find('#playerExperienceAndCGText').text()).toContain('Maitre');
    expect(wrapper.find('#playerExperienceAndCGText').text()).toContain('50');
    expect(wrapper.find('#playerShipText').text()).toContain('shipName');
    expect(wrapper.find('#playerLifeBar').text()).toContain('100');
    })
  
    it("Doit afficher le bon pourcentage de vie et l'arrondir au besoins", async () => {
        const wrapper = mount(GamePlayer, {
            props: { playerName: 'testName',
                playerShip: 'shipName',
                playerLife: 16,
                maxPlayerLife: 200,
                playerExperience: 4,
                currentPlayerCG: 50 }
        }   )

        expect(wrapper.find('#playerNameText').text()).toContain('testName');
        expect(wrapper.find('#playerExperienceAndCGText').text()).toContain('Maitre');
        expect(wrapper.find('#playerExperienceAndCGText').text()).toContain('50');
        expect(wrapper.find('#playerShipText').text()).toContain('shipName');
        expect(wrapper.find('#playerLifeBar').text()).toContain('8');  
    })
  })
  