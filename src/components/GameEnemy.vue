<script setup lang="ts">

import { computed } from 'vue';


const props = defineProps({
  ennemyName: String,
  ennemyShip: String,
  ennemyLife: Number,
  maxEnnemyLife: Number,
  ennemyExperience: Number,
  ennemyCG: Number
})

function ConvertLifeToPercent(life:number, maxLife:number){
  return (life/maxLife)*100;

}

const lifePercentage = computed(() => {
  return ConvertLifeToPercent(props.ennemyLife ?? 0, props.maxEnnemyLife ?? 0);
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

const ennemyExperienceName = computed(() => {
  return setupExperienceName(props.ennemyExperience ?? 0);
});



</script>

<template>
    <div class="card col-lg-4 col-md-6"> 
        <div class="card-body">
            <h5 class="card-title" id="ennemyNameText">{{ props.ennemyName }}</h5>
            <p class="card-text" id="ennemyExperience&CGText">{{ ennemyExperienceName }} - {{ props.ennemyCG }} CG</p>
            <div class="progress">
                <div class="progress-bar" id="ennemyLifeBar" role="progressbar" :style="{ width: lifePercentage + '%' }" aria-valuemin="0" aria-valuemax="100">{{ props.ennemyShip }} {{ lifePercentage.toFixed(0) }}%</div>
            </div>
        </div>
    </div>
</template>