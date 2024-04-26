<script setup lang="ts">
import { computed } from 'vue';


const props = defineProps({
  playerName: String,
  playerShip: String,
  playerLife: Number,
  maxPlayerLife: Number,
  playerExperience: Number,
  currentPlayerCG: Number
})

function ConvertLifeToPercent(life:number, maxLife:number){
  return (life/maxLife)*100;

}

const lifePercentage = computed(() => {
  return ConvertLifeToPercent(props.playerLife ?? 0, props.maxPlayerLife ?? 0);
});

function setupExperienceName(experience: number){
    if(experience == 1){
        return "Débutant";
    }
    else if(experience == 2){
        return "Confirmé";
    }
    else if(experience == 3){
        return "Expert";
    }
    else {
        return "Maitre";
    }
}

let playerExperienceName = setupExperienceName(props.playerExperience!);


</script>

<template>
    <div class="card col-lg-4 col-md-6"> 
        <div class="card-body">
            <h5 class="card-title d-flex justify-content-center" id="playerNameText">{{ props.playerName }}</h5>
            <h6 class="card-text d-flex justify-content-center" id="playerExperienceAndCGText">{{ playerExperienceName }} - {{ props.currentPlayerCG }} CG</h6>
            <h6 class="card-text d-flex justify-content-center" id="playerShipText">{{ props.playerShip }}</h6>
            <div class="progress mb-2">
              <!-- aidé un peu de chatGPT -->
                <div class="progress-bar" :class="{ 'shake': lifePercentage < 20 }" id="playerLifeBar" role="progressbar" :style="{ width: lifePercentage + '%' }" aria-valuemin="0" aria-valuemax="100">{{ lifePercentage.toFixed(0) }}%</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* aidé de chatGPT pour faire des animations */
@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
  75% { transform: rotate(-5deg); }
  100% { transform: translateX(0); }
}

.shake {
  animation: shake 0.1s infinite;
}
</style>