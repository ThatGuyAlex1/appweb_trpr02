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
            <h5 class="card-title" id="playerNameText">{{ props.playerName }}</h5>
            <p class="card-text" id="playerExperience&CGText">{{ playerExperienceName }} - {{ props.currentPlayerCG }} CG</p>
            <div class="progress mb-2">
              <!-- aidé un peu de chatGPT -->
                <div class="progress-bar" id="playerLifeBar" role="progressbar" :style="{ width: lifePercentage + '%' }" aria-valuemin="0" aria-valuemax="100">{{ props.playerShip }} {{ lifePercentage.toFixed(0) }}%</div>
            </div>
        </div>
    </div>
</template>