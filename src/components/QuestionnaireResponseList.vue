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
      dataJSON.forEach(element => {
        const elementName = element.questionnaire;
        const status = element.status;
        const subject =  element.subject.reference;
        const date = element.authored
        console.log(elementName, status, subject);

        if (subject === "Patient/"+localStorage.getItem('patientId')) {
          if (status === 'completed') {
          completedQuestionnaireResponse.push({element: elementName, status: status, subject: subject, date: date});
        } 
          if (status === 'in-progress') {
          waitingQuestionnaireResponse.push({element: elementName, status: status, subject: subject, date: date});
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
  <div class="fixed-container">
    <h2 class="container-title">Questionnaires en attente de validation</h2>
    <div class="card-container">
      <QuestionnaireResponseCard
        v-for="questionnaire in waitingQuestionnaireResponse"
        :key="questionnaire.element"
        :name="questionnaire.element"
        :date="questionnaire.date"
      />
    </div>

    <h2 class="container-title">Questionnaires validés</h2>
    <div class="card-container">
      <QuestionnaireResponseCard
        v-for="questionnaire in completedQuestionnaireResponse"
        :key="questionnaire.element"
        :name="questionnaire.element"
        :date="questionnaire.date"
      />
    </div>
  </div>
</template>

<style scoped>
.fixed-container {
  position: relative; 
  margin-top: 20px;
  left: 10px;
  right: 10px;
  background-color: rgba(255, 255, 255, 0.8); 
  border: 2px solid #ccc; 
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto; 
  max-height: 80vh; 
}

.container-title {
  text-align: center;
  font-size: 1.5rem; 
  color: #333; 
  margin: 0 0 20px 0; 
  font-weight: bold; 
  padding-bottom: 10px; 
  border-bottom: 2px solid #ddd; 
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
