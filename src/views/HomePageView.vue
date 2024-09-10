<script setup>

import MyHeader from "@/components/myHeader.vue";
import QuestionnaireList from "../components/QuestionnaireList.vue";

function logout() {
  localStorage.removeItem('jwt');
}
</script>

<template>
  <div class="all">
    <my-header />
    <QuestionnaireList />
    Les FouFourmulaires
  </div>





</template>

<style scoped>
.all{
  position: absolute;
  left: 1%;
  /* border: orange 1px solid; */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10vh; /* faire mieux !*/
}
span{
  color: #004a6c;
  font-weight: bold;
  font-size: 1.5em;

}

</style>