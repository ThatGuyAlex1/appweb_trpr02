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
    <div class="card col-lg-4 col-md-6 ps-0 pe-0"> 
        <h5 class="card-header text-white bg-danger d-flex justify-content-center" id="ennemyNameText">{{ props.ennemyName }}</h5>
        <div class="card-body bg-dark text-white">
            <h6 class="card-text d-flex justify-content-center" id="ennemyExperience&CGText">{{ ennemyExperienceName }} - {{ props.ennemyCG }} CG</h6>
            <h6 class="card-text d-flex justify-content-center" id="ennemyShipText">{{ props.ennemyShip }}</h6>

            <div class="progress mb-2">
                <!-- aidé un peu de chatGPT -->
                <div class="progress-bar bg-danger" id="ennemyLifeBar" role="progressbar" :style="{ width: lifePercentage + '%' }" aria-valuemin="0" aria-valuemax="100">{{ lifePercentage.toFixed(0) }}%</div>
            </div>
        </div>
    </div>
</template>