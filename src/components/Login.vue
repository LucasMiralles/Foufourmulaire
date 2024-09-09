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
function askForJWT(id, birthdate){
    console.log(id, birthdate)
    

   const fetchOptions = {
     method: "GET",
        headers: {
        "Content-Type": "application/json",
        }
   };
   // find the patient with the id and the birthdate
   url = url + "/Patient?identifier=" + id + "&birthdate=" + birthdate;
   fetch(url, fetchOptions)
       .then((response) => {
         console.log(response)
         if(response.status === 200){ // if the response is 200, we set iHaveJwt to true
           iHaveJwt = true;
         }else {
           errorMessage.value = "An error occurred ";

         }
         return response.json();

       })
       .then((dataJSON) => {
         console.log(dataJSON);
         //console.log(iHaveJwt) //debug
         if(iHaveJwt){ // if the response is 200, we store the jwt in the local storage
           localStorage.setItem('jwt', dataJSON.access_token);
           console.log(localStorage.getItem('jwt'));

         }else{ // if the response is not 200, we display the error message
           errorMessage.value = "An error occurred: " + dataJSON.error;
         }
         if(localStorage.getItem('jwt')){ // if the jwt is stored in the local storage, we redirect to the home page
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
  <!--
  Form to ask the cliend id and secre id of the user in order to use function askForJWT passing the client id and secret id
  -->
  <div class="container">
    <h2>Authentification</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="id">Client ID:</label>
        <input type="text" id="id" v-model="id" required>
      </div>
      <div class="form-group">
        <label for="secretId">Secret ID:</label>
        <input type="text" id="birthdate" v-model="birthdate" required>
      </div>
      <button type="submit">Se connecter</button>
    </form>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>


  </div>
</template>

<style scoped>
form{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container {

  border-radius: 20px;
  background-color: white;
  box-shadow: 0px 0px 10px black;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: black;
  padding: 25px;

}
.form-group {
  margin-bottom: 10px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input[type="text"],
input[type="password"] {

  width: 100%;
  padding: 10px 15px;
  width: 450px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
.error {
  background-color: #c71b1b;
  border-radius: 5px;
  border: red 1px solid;
  color: white;
  padding: 10px;
  margin: 10px 0;
}
</style>