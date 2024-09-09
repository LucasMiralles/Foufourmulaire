<script setup>
import {RouterView} from 'vue-router'
import MyHeader from "@/components/myHeader.vue";

</script>

<template>


    
  <div id="app">
    <my-header />
    <RouterView />
  </div>
  

</template>

<style scoped>
app{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

</style>