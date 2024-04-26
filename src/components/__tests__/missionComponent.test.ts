import { describe, afterEach, expect, vi, it } from 'vitest'
import { mount } from '@vue/test-utils'
import GameMission from '../GameMission.vue'

describe('GameMission.vue', () => {
    it("Doit afficher les props aux bonnes places sur la page", async () => {
        const wrapper = mount(GameMission, {
            props: { currentMission: 1 }
        }   )

    expect(wrapper.find('#currentMissionText').text()).toContain('1');
    })
  })
  