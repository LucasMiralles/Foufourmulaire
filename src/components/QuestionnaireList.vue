<script setup>
import { onMounted, reactive } from "vue";
import { url } from "../api.js";
import QuestionnaireCard from "@/components/QuestionnaireCard.vue";

const newQuestionnaire = reactive([]);

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

function getAllQuestionnaire() {
  const headers = new Headers();
  headers.append('Content-Type', 'application/fhir+json');
  const fetchOptions = {
    method: "GET",
    headers: headers
  };
  
  fetch(url + "Questionnaire/", fetchOptions)
    .then(response => response.json())
    .then(dataJSON => {
      console.log(dataJSON);
      if (Array.isArray(dataJSON)) {
        newQuestionnaire.splice(0, newQuestionnaire.length);
        dataJSON.forEach(questionnaireData => {
          const questionnaire = new QuestionnaireDTO(
            questionnaireData.id,
            questionnaireData.url,
            questionnaireData.identifier,
            questionnaireData.version,
            questionnaireData.name,
            questionnaireData.title,
            questionnaireData.status,
            questionnaireData.date,
            questionnaireData.publisher,
            questionnaireData.description,
            questionnaireData.purpose,
            questionnaireData.subjectType,
            questionnaireData.item
          );
          newQuestionnaire.push(questionnaire);
        });
      } else {
        console.error("Expected an array but got:", dataJSON);
      }
    })
    .catch(error => console.log(error));
}

onMounted(() => {
  getAllQuestionnaire();
});
</script>

<template>
  <div class="fixed-container">
    <h2 class="container-title">Foufourmulaire(s) disponible(s)</h2>
    <div class="card-container">
      <QuestionnaireCard
        v-for="questionnaire in newQuestionnaire"
        :key="questionnaire.id"
        :questionnaire="questionnaire"
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
