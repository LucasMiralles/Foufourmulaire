<script setup>

import MyHeader from "@/components/myHeader.vue";

function logout() {
  localStorage.removeItem('jwt');
}
</script>

<template>
  <div class="all">
    <my-header />
    <!-- TODO rajouter un système pour switcher entre les cas d'usage avec bootstrap, voir sécu-->

    <p><span>N</span>ew <span>O</span>perations <span>V</span>alidate and <span>E</span>nsure <span>S</span>ecurity <span>Manager</span></p>

  </div>





</template>

<style scoped>
.all{
  position: absolute;
  left: 1%;
  //border: orange 1px solid;
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