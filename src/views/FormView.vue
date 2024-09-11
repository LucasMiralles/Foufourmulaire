<template>
  <div class="page-container">
    <div class="container">
      <h1 v-if="thisQuestionnaire">{{ thisQuestionnaire.title }}</h1>
      <p v-if="thisQuestionnaire" class="description">{{ thisQuestionnaire.description }}</p>
      <form @submit.prevent="submitAnswers">
        <div v-if="allTexts.length > 0" class="text-list">
          <div v-for="item in allTexts" :key="item.linkId" :class="{'section-title': !item.linkId.includes('.'), 'question': item.linkId.includes('.')}">
            <p>{{ item.text }}</p>
            <input v-if="item.linkId.includes('.')" v-model="answers[item.linkId]" :type="getInputType(item.type)" />
          </div>
        </div>
        <button type="submit">Valider</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { url } from "../api.js";

const route = useRoute();
const id = route.params.id;
const thisQuestionnaire = ref(null);
const allTexts = ref([]);
const answers = ref({}); 

class QuestionnaireItemDTO {
  constructor(linkId, text, type, item, enableWhen, enableBehavior, disabledDisplay, required, repeats, readOnly, maxLength, answerConstraint, answerValueSet, answerOption, initial) {
    this.linkId = linkId;
    this.text = text;
    this.type = type;
    this.item = item ? item.map(subItem => new QuestionnaireItemDTO(
      subItem.linkId,
      subItem.text,
      subItem.type,
      subItem.item,
      subItem.enableWhen,
      subItem.enableBehavior,
      subItem.disabledDisplay,
      subItem.required,
      subItem.repeats,
      subItem.readOnly,
      subItem.maxLength,
      subItem.answerConstraint,
      subItem.answerValueSet,
      subItem.answerOption,
      subItem.initial
    )) : [];
    this.enableWhen = enableWhen;
    this.enableBehavior = enableBehavior;
    this.disabledDisplay = disabledDisplay;
    this.required = required;
    this.repeats = repeats;
    this.readOnly = readOnly;
    this.maxLength = maxLength;
    this.answerConstraint = answerConstraint;
    this.answerValueSet = answerValueSet;
    this.answerOption = answerOption;
    this.initial = initial;
  }
}

class QuestionnaireDTO {
  constructor(id, url, identifier, version, name, title, status, date, publisher, description, purpose, subjectType, item) {
    this.id = id;
    this.url = url;
    this.identifier = identifier;
    this.version = version;
    this.name = name;
    this.title = title;
    this.status = status;
    this.date = date;
    this.publisher = publisher;
    this.description = description;
    this.purpose = purpose;
    this.subjectType = subjectType;
    this.item = item ? item.map(itemData => new QuestionnaireItemDTO(
      itemData.linkId,
      itemData.text,
      itemData.type,
      itemData.item,
      itemData.enableWhen,
      itemData.enableBehavior,
      itemData.disabledDisplay,
      itemData.required,
      itemData.repeats,
      itemData.readOnly,
      itemData.maxLength,
      itemData.answerConstraint,
      itemData.answerValueSet,
      itemData.answerOption,
      itemData.initial
    )) : [];
  }
}

function getThisQuestionnaire() {
  const headers = new Headers();
  headers.append('Content-Type', 'application/fhir+json');
  const fetchOptions = {
    method: "GET",
    headers: headers
  };

  fetch(`${url}Questionnaire/${id}`, fetchOptions)
    .then(response => response.json())
    .then(dataJSON => {
      const questionnaire = new QuestionnaireDTO(
        dataJSON.id,
        dataJSON.url,
        dataJSON.identifier,
        dataJSON.version,
        dataJSON.name,
        dataJSON.title,
        dataJSON.status,
        dataJSON.date,
        dataJSON.publisher,
        dataJSON.description,
        dataJSON.purpose,
        dataJSON.subjectType,
        dataJSON.item
      );
      thisQuestionnaire.value = questionnaire;
      allTexts.value = getAllTexts(dataJSON);
      initializeAnswers(dataJSON.item);
    })
    .catch(error => console.log('Erreur lors de la récupération du questionnaire:', error));
}

function getAllTexts(json) {
  let texts = [];

  function findTexts(items) {
    for (const item of items) {
      if (item.text) {
        texts.push({ linkId: item.linkId, text: item.text, type: item.type });
      }
      if (item.item) {
        findTexts(item.item);
      }
    }
  }
  findTexts(json.item);
  return texts;
}

function initializeAnswers(items) {
  items.forEach(item => {
    if (item.item) {
      initializeAnswers(item.item);
    }
    answers.value[item.linkId] = '';
  });
}

function submitAnswers() {
  const questionnaireResponse = 
  {
    "resourceType": "QuestionnaireResponse",
    "id": `response-${id}-`+ localStorage.getItem('patientId'),
    "questionnaire": "Questionnaire/"+id,
    "status": "in-progress",
    "subject": {
      "reference": "Patient/"+ localStorage.getItem('patientId'),
      "display": localStorage.getItem('name')
    },
    "authored": new Date().toISOString().split('T')[0],
    "author": {
      "reference": localStorage.getItem('generalPractitioner'),
      "display": "Dr"
    },
    "item": mapAnswersToItems(thisQuestionnaire.value.item)
  };
  console.log('Réponse à envoyer:', questionnaireResponse);
  console.log(JSON.stringify(questionnaireResponse))

  fetch(url+"questionnaire-response/"+questionnaireResponse.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(questionnaireResponse)
  })
  .then(response => response.json())
  .then(data => console.log('Réponse soumise:', data))
  .catch(error => console.error('Erreur lors de l\'envoi de la réponse:', error));
}

function mapAnswersToItems(items) {
  return items.map(item => ({
    linkId: item.linkId,
    text: item.text,
    item: item.item ? mapAnswersToItems(item.item) : undefined,
    answer: answers.value[item.linkId] ? [{ valueString: answers.value[item.linkId] }] : []
  }));
}

function getInputType(type) {
  switch (type) {
    case 'date':
      return 'string';
    case 'integer':
      return 'string';
    case 'string':
    default:
      return 'text';
  }
}

function isQuestion(item) {
  return item.text && item.type; 
}

onMounted(() => {
  getThisQuestionnaire();
});
</script>

<style scoped>
body, html {
  height: 100%;
  margin: 0;
  padding: 0;
}

.page-container {
  display: flex;
  justify-content: center; 
  align-items: center;
  min-height: 100vh;
  background-color: #f0f4f8; 
}

.container {
  width: 100%;
  max-width: 1200px;
  background-color: #f7f9fc;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin-top: 50px;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #3A5199;
  margin-bottom: 10px;
  text-align: center;
}

.description {
  font-size: 1.2rem;
  color: #6b7280;
  margin-bottom: 30px;
  text-align: center;
}

.text-list {
  margin-bottom: 40px;
}

.question {
  margin-bottom: 20px;
}

.question p {
  font-size: 1.1rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 10px;
}

.section-title {
  font-size: 24px; 
  font-weight: bold;
  color: #3A5199;
  margin-bottom: 10px;
  border-bottom: 2px solid #3A5199; 
  padding-bottom: 5px;
}

input[type="text"],
input[type="date"],
input[type="string"],
input[type="integer"] {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  transition: border-color 0.3s ease;
  outline: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

input:focus {
  border-color: #3A5199;
  box-shadow: 0 4px 8px rgba(58, 81, 153, 0.2);
}

button[type="submit"] {
  width: auto; 
  max-width: 200px; 
  padding: 14px 20px;
  background-color: #3A5199;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  display: block; 
  margin: 0 auto;
}

button[type="submit"]:hover {
  background-color: #2b3b73;
  transform: translateY(-2px);
}

button[type="submit"]:active {
  background-color: #3A5199;
  transform: translateY(1px);
}

button[type="submit"]:focus {
  outline: 2px solid #3A5199;
  outline-offset: 2px;
}
</style>