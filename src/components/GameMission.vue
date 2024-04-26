<script setup lang="ts">


const props = defineProps({
  currentMission: Number
})


</script>

<template>
    <div class="card col-lg-3 col-md-6 ps-0 pe-0">
        <h5 class="card-header bg-primary text-white">Mission en cours</h5>
        <div class="card-body text-white bg-dark">
            <p class="card-text" id="currentMissionText">{{ props.currentMission }} / 5</p>
            <p class="card-text">Objectif: survivre à 5 missions en obtenant le plus de crédits</p>
        </div>
    </div>
</template>