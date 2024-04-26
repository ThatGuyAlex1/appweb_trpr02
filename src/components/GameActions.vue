<script setup lang="ts">
import type Ship from '../scripts/ship'
const CGPerPercent: number = 3;
const props = defineProps({
  playerLife: Number,
  maxPlayerLife: Number,
  playerExperience: Number,
  ennemyLife: Number,
  maxEnnemyLife: Number,
  ennemyExperience: Number,
  currentPlayerCG: Number
})

const emit = defineEmits<{
  (event: 'updateLife', lifePlayer: number, lifeEnnemy: number): void,
  (event: 'updateFinishMission'): void,
  (event: 'updateFinishMissionAndRepair', lifePlayer: number, CGPlayer: number): void,
  (event: 'errorUpdate', error: string): void
}>()

function setupFightChance(experience: number){
    if(experience == 1){
        return 0.2;
    }
    else if(experience == 2){
        return 0.35;
    }
    else if(experience == 3){
        return 0.5;
    }
    else {
        return 0.7;
    }
}

function fight(){
    try{
        let ennemyFightChance: number = setupFightChance(props.ennemyExperience!)
        let playerFightChance: number = setupFightChance(props.playerExperience!)

        let chanceOfFailurePlayer = Math.random();
        let finalPlayerLife = props.playerLife!;
        if(ennemyFightChance > chanceOfFailurePlayer){
            let percentPlayerDamageReceived = Math.random() * 3 + 3;
            let damageAmountOnPlayer = Math.floor(props.maxPlayerLife! * (percentPlayerDamageReceived / 100));
            finalPlayerLife = props.playerLife! - damageAmountOnPlayer;
        }

        
        let chanceOfFailureEnnemy = Math.random();
        let finalEnnemyLife = props.ennemyLife!
        if(playerFightChance > chanceOfFailureEnnemy){
            let percentEnnemyDamageReceived = Math.random() * 8 + 5;
            let damageAmountOnEnnemy = Math.floor(props.maxEnnemyLife! * (percentEnnemyDamageReceived / 100));
            finalEnnemyLife = props.ennemyLife! - damageAmountOnEnnemy;
        }

        emit('updateLife',finalPlayerLife,finalEnnemyLife);
    }
    catch(error){
    emit('errorUpdate', 'Error when trying to fight: ' + error);
    }
    
}

function finishMission(){
    emit('updateFinishMission');
}

function finishMissionAndRepairShip(){
    let playerLifePercentage = (props.playerLife! / props.maxPlayerLife!) * 100;
    let percentToHeal = 100 - playerLifePercentage;
    let amountToPay = CGPerPercent * percentToHeal;
    if(props.currentPlayerCG! >= amountToPay){
        let newCGAmount = props.currentPlayerCG! - amountToPay
        emit('updateFinishMissionAndRepair', props.maxPlayerLife!, newCGAmount);
    }
    else{
        let amountOfHealPossibleInPercent = props.currentPlayerCG! / CGPerPercent
        emit('updateFinishMissionAndRepair', props.playerLife! + (amountOfHealPossibleInPercent / 100) * props.maxPlayerLife!, 0);
    }
}

</script>


<template>
    <div class="card col-lg-9 col-md-12">
        <div class="card-body">
            <h5 class="card-title">Actions</h5>
            <div class="row">
                <div class="col-4">
                    <button @click="fight()" type="button" class="btn btn-primary" id="fight">Combattre</button>
                </div>
                <div class="col-4">
                    <button @click="finishMission()" type="button" class="btn btn-primary" id="finishMission">Terminer la mission</button>
                </div>
                <div class="col-4">
                    <button @click="finishMissionAndRepairShip()" type="button" class="btn btn-primary" id="finishMissionAndRepairShip">Terminer la mission et réparer le vaisseau</button>
                </div>
            </div>
        </div>
    </div>
</template>