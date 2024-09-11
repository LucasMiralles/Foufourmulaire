<script setup>
import {onMounted, reactive, ref} from "vue";
import {url, urlToken, audience} from "../api.js"
import QuestionnaireResponseCard from "@/components/QuestionnaireResponseCard.vue";

// const props = defineProps(["consumer", "useCase", "delete"]);


const waitingQuestionnaireResponse = reactive([]);
const completedQuestionnaireResponse = reactive([]);






function getAllQuestionnaire() {
  const headers = new Headers();
  headers.append('Content-Type', 'application/fhir+json');
  const fetchOptions = {
    method: "GET",
    headers: headers
  };
  
  fetch(url + "questionnaire-response/", fetchOptions)
    .then(response => {
        console.log(response)
        return response.json();
      })
    .then(dataJSON => {
      console.log(dataJSON);
      // get element name of questionnaire and status and subject.reference from dataJSON if status is completed add it to completedQuestionnaireResponse else add it to waitingQuestionnaireResponse and if subject is equal to equal localStorage.getItem('patientId')
      dataJSON.forEach(element => {
        const elementName = element.questionnaire;
        const status = element.status;
        const subject =  element.subject.reference;
        console.log(elementName, status, subject);

        if (subject === "Patient/"+localStorage.getItem('patientId')) {
          if (status === 'completed') {
          completedQuestionnaireResponse.push({element: elementName, status: status, subject: subject});
        } 
          if (status === 'in-progress') {
          waitingQuestionnaireResponse.push({element: elementName, status: status, subject: subject});
        }
        }
        
      });
      
      
          
       console.log("waitingQuestionnaireResponse"); 
      console.log(waitingQuestionnaireResponse);
      console.log("completedQuestionnaireResponse");
      console.log(completedQuestionnaireResponse);
    })
    .catch(error => console.log(error));
}

  
//on mounted
onMounted(() => {
  getAllQuestionnaire();
});
</script>

<template>
  <!-- button to request questionnaire to server -->
  <div class="allList">
    <p>Questionnaires en attente de validation</p>

    <div class="oneList">
      <div class="card">
        <QuestionnaireResponseCard
          v-for="questionnaire in waitingQuestionnaireResponse"
          :key="questionnaire.element"
          :name="questionnaire.element"
        />
      </div>
    </div>
      <p>Questionnaires validés</p>
      <div class="oneList">
        <QuestionnaireResponseCard
          v-for="questionnaire in completedQuestionnaireResponse"
          :key="questionnaire.element"
          :name="questionnaire.element"
        />
      </div>
    </div> 
 
</template>

<style scoped>
h2{
  color: #fff;
  text-align: center;
  font-family: Arial, sans-serif;
}
.allList{
  display: flex;
  flex-direction: column;
  justify-content: space-around;

}
.oneList{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  
}

.deleteButton{
  background-color: #ad2323;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px;
  margin-top: 10px;
  cursor: pointer;
}
.deleteButton:hover{
  background-color: #ff0000;
}

.sendButton{
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px;
  margin-top: 10px;
  cursor: pointer;
}
.sendButton:hover{
  background-color: #0056b3;
}
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(111, 191, 77, 0.8);
  border: 1px solid #5fa641;
  padding: 20px;
  z-index: 9999;
}

.popup-content {
  position: relative;
}
</style>