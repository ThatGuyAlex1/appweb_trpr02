import { describe, afterEach, expect, vi, it } from 'vitest'
import { mount } from '@vue/test-utils'
import GameAction from '../GameActions.vue'

describe('GameAction.vue', () => {
    it("Sur le clic du button combattre, le combat se produit et envoie de nouvelle données dans le bon emit", async () => {
        const wrapper = mount(GameAction, {
            props: { playerLife: 200,
                maxPlayerLife: 300,
                playerExperience: 4,
                ennemyLife: 80,
                maxEnnemyLife: 80,
                ennemyExperience: 2,
                currentPlayerCG: 0 }
          })

      await wrapper.find('#fight').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('updateLife');
    expect(wrapper.emitted('updateLife')).toHaveLength(1);
    //aidé avec chatGPT
    expect(wrapper.emitted('updateLife')![0]).toEqual([expect.any(Number), expect.any(Number)]);
    })
  
    it("Sur le clic du button terminer la mission, la mission est supposé se terminer et envoie le bon emit", async () => {
        const wrapper = mount(GameAction, {
            props: { playerLife: 200,
                maxPlayerLife: 300,
                playerExperience: 4,
                ennemyLife: 80,
                maxEnnemyLife: 80,
                ennemyExperience: 2,
                currentPlayerCG: 0 }
          })
      await wrapper.find('#finishMission').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('updateFinishMission');
    expect(wrapper.emitted('updateFinishMission')).toHaveLength(1);     
    })

    it("Sur le clic du button terminer la mission et réparer le vaisseau, la mission est supposé se terminer et la réparation du vaisseau est fait. Les nouvelles informations son envoyé dans le bon emit", async () => {
        const wrapper = mount(GameAction, {
            props: { playerLife: 200,
                maxPlayerLife: 300,
                playerExperience: 4,
                ennemyLife: 80,
                maxEnnemyLife: 80,
                ennemyExperience: 2,
                currentPlayerCG: 100 }
          })
    await wrapper.find('#finishMissionAndRepairShip').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('updateFinishMissionAndRepair');
    expect(wrapper.emitted('updateFinishMissionAndRepair')).toHaveLength(1);
    expect(wrapper.emitted('updateFinishMissionAndRepair')![0]).toEqual([expect.any(Number), expect.any(Number)]);   
      })
  })
  