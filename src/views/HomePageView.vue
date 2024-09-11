<script setup>

import MyHeader from "@/components/myHeader.vue";
import QuestionnaireList from "../components/QuestionnaireList.vue";
import QuestionnaireResponseList from "@/components/QuestionnaireResponseList.vue";


</script>

<template>
  <div class="all">
    <my-header />
    <QuestionnaireList />
    <QuestionnaireResponseList />
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