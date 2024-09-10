<script setup>
import router from "@/router/router.js";

function logout() {
  localStorage.removeItem('patientId');
  localStorage.removeItem('generalPractitioner');
  //refresh the page
  router.go();
}
</script>

<template>
  <div class="top-bar">
    <div class="logo-container">
      <img src="../assets/img/logoCrazy.png" alt="logo" class="logo">
    </div>
    <div class="center-container">
      <h1 class="title">Les Foufous de Sochaux</h1>
    </div>
    <button class="logout" @click="logout">Déconnexion</button>
  </div>
</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #3A5199;
  color: #004a6c;
  display: flex;
  justify-content: space-between;
  align-items: center; 
  padding: 15px 30px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  height: 10vh;   margin-bottom: 10vh; 
}

.logo-container {
  display: flex;
  align-items: center;
  width: 100px;
}

.logo {
  width: 5vw;
  height: auto;
}

.center-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
}

.title {
  font-size: 2vw;
  font-weight: bold;
  text-align: center; 
  color: #ffffff; 
  font-family: 'Ppoppins', sans-serif; 
  letter-spacing: 0.01em; 
}

.logout {
  padding: 12px 20px;
  background-color: #ff5722;
  color: white; 
  font-size: 12px;
  border: none; 
  border-radius: 8px; 
  cursor: pointer; 
  transition: background-color 0.3s ease, transform 0.3s ease; 
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  outline: none;
  font-weight: bold;
}

.logout:hover {
  background-color: #e64a19;
  transform: translateY(-2px);
}

.logout:active {
  background-color: #d84315;
  transform: translateY(1px);
}

.logout:focus {
  outline: 2px solid #ff5722;
  outline-offset: 2px;
}
</style>