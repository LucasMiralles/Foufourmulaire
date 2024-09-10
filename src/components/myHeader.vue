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
      <img src="../assets/logo.svg" alt="logo" class="logo">
    </div>
    <div class="text">
      <h1 class="title">Les Foufous de Sochaux</h1>
      <button class= "logout" @click="logout">Logout</button>

    </div>

  </div>
</template>

<style scoped>
.top-bar {
  /* border: red 1px solid; */
  position: fixed;
  top: 0; /* Positionne la barre au sommet de la fenêtre */
  left: 0; /* Ajuste la position de la barre sur la gauche */
  width: 100%; /* La barre prendra toute la largeur de l'écran */
  background-color: #3e4449; /* Couleur de fond de la barre */
  color: #004a6c; /* Couleur du texte */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1); /* Ombre portée */
  height: 6vh;
  margin-bottom: 6vh;
  background-color:rgba(255, 255, 255, 0.8);
}

.logo-container {
  width: 150px; /* Ajustez la largeur du conteneur du logo */
}
.logo {
  width: 7vw; /* Utilisation de 10% de la largeur de la fenêtre */
  height: auto; /* Hauteur automatique pour maintenir les proportions du logo */
}


.title {
  margin-right: 5em;
  font-size: 1.5vw; /* Ajustez la taille du titre */
  font-weight: bold; /* Texte en gras */
}
.text{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}


</style>