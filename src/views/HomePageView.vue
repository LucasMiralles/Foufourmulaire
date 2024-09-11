<script setup>
import MyHeader from "@/components/myHeader.vue";
import QuestionnaireList from "../components/QuestionnaireList.vue";
import QuestionnaireResponseList from "@/components/QuestionnaireResponseList.vue";
</script>

<template>
  <div class="all">
    <my-header />
    <div class="content">
      <div class="section">
        <QuestionnaireList />
      </div>
      <div class="section">
        <QuestionnaireResponseList />
      </div>
    </div>
  </div>
</template>

<style scoped>
.all {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh; 
  overflow-y: auto; 
  box-sizing: border-box;
}

.content {
  display: flex;
  flex-direction: column;
  width: 100%; 
  flex-grow: 1; 
  margin-top: 10vh; 
}

.section {
  margin: 20px 0;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  max-width: 1200px;
  width: 100%;
}
</style>