<script setup>
import Login from "@/components/Login.vue";
</script>

<template>
  <div class="login">
    <Login />

  </div>

</template>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
  overflow: hidden;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  left: -120px;
}

.login::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0px;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/img/image_de_fond.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(10px); 
  z-index: -1;
}
</style>