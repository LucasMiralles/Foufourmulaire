<script setup>


import router from "@/router/router.js";
import {ref} from "vue";
import {url, urlToken, audience} from "../api.js"
let errorMessage = ref("");

/*
* this function is used to ask for a jwt token by sending a post request to the server with the client id and the client secret
* receiving a jwt means that the user is authenticated
* @param clientId: the client id of the user
* @param clientSecret: the client secret of the user
*
* */
// function askForJWT(id, birthdate){
//     localStorage.setItem("jwt", "connected")
//     router.push("/")
    

function askForJWT(id, birthdate){
  console.log(id, birthdate)
  let iHaveResponse = false;

    console.log(id, birthdate)
   const fetchOptions = {
     method: "GET",
     headers: {
      "Content-Type": "application/json",
    }
   };
   // find the patient with the id and the birthdate
   fetch(url + "patient/" + id, fetchOptions)
       .then((response) => {
         console.log(response)
         if(response.status === 200){ // if the response is 200, we set iHaveJwt to true

           iHaveResponse = true;
         }else {
           errorMessage.value = "An error occurred ";

         }
         return response.json();

       })
       .then((dataJSON) => {
         console.log(dataJSON);
         //console.log(iHaveJwt) //debug
         if(iHaveResponse){ // if the response is 200, we store the jwt in the local storage
          //log the id, name and generalPractionner get from dataJSOn
          console.log(dataJSON.id, dataJSON.generalPractitioner[0].reference) 
          localStorage.setItem('patientId', dataJSON.id);
          localStorage.setItem('generalPractitioner', dataJSON.generalPractitioner[0].reference)
          localStorage.setItem('name', dataJSON.name[0].given[0] + " " + dataJSON.name[0].family)
          router.push("/")

         }else{ // if the response is not 200, we display the error message
           errorMessage.value = "An error occurred: " + dataJSON.error;
         }
         if(localStorage.getItem('patientId')){ // if the jwt is stored in the local storage, we redirect to the home page
           router.push("/")
         }

       })
       .catch((error) => {
         console.log(error)
       });
}
const submitForm = () => {
  askForJWT(id.value, birthdate.value);
};

</script>

<template>
  <div class="container">
    <h2>Authentification</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="id">Identifiant Patient:</label>
        <input type="text" id="id" v-model="id" required>
      </div>
      <div class="form-group">
        <label for="secretId">Date de naissance (AAAAMMJJ):</label>
        <input type="text" id="birthdate" v-model="birthdate" required>
      </div>
      <button type="submit">Se connecter</button>
    </form>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.container {
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 350px;
  margin: auto;
  padding: 20px;
  text-align: center;
  position: relative;
  z-index: 1;
  overflow: hidden;
}

h2 {
  color: #333;
  font-size: 28px;
  margin-bottom: 15px;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
}

.form-group {
  margin-bottom: 15px;
  width: 100%;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 16px;
  color: #2a3e6f;
  text-align: left;
  width: 100%;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  color: #2a3e6f;
  background-color: #f9f9f9;
  box-shadow: inset 0px 2px 5px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

input[type="text"]:focus,
input[type="password"]:focus {
  border-color: #3A5199;
  background-color: #fff;
  box-shadow: 0px 0px 8px rgba(58, 81, 153, 0.3);
  outline: none;
}

input[type="text"]::placeholder,
input[type="password"]::placeholder {
  color: #aaa;
  font-style: italic;
}


button {
  padding: 12px 20px;
  background-color: #3A5199;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  outline: none;
  font-weight: bold;
}

button:hover {
  background-color: #2a3e6f;
  transform: translateY(-2px);
}

button:active {
  background-color: #1d2a4a;
  transform: translateY(1px);
}

button:focus {
  outline: 2px solid #3A5199;
  outline-offset: 2px;
}

.error {
  background-color: #f8d7da;
  border-left: 5px solid #dc3545;
  border-radius: 8px;
  color: #721c24;
  padding: 10px 15px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  font-size: 14px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.error::before {
  content: '⚠️'; 
  font-size: 18px;
  margin-right: 8px;
}
</style>