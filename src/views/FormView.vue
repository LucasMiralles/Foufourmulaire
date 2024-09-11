<script setup>
    //defineProps(["questionnaire"]);
    import { useRoute } from 'vue-router';
    import { ref, onMounted } from 'vue';
    import {url, urlToken, audience} from "../api.js"

    const route = useRoute();

    const id = route.params.id;
    const thisQuestionnaire = ref(null);
    let allText = ref([])



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

  fetch(url + "Questionnaire/"+id, fetchOptions)
    .then(response => response.json())
    .then(dataJSON => {
      console.log(dataJSON);

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
          allText = getAllTexts(dataJSON)


      console.log('Questionnaire Data:', JSON.stringify(questionnaire, null, 2));
    })
    .catch(error => console.log(error));
}

onMounted(() => {
  getThisQuestionnaire();
});

    function getAllTexts(json) {
      let texts = [];

      function findTexts(items) {
        for (const item of items) {
          if (item.text) {
            texts.push(item.text);
          }
          if (item.item) {
            findTexts(item.item);
          }
        }
      }
      findTexts(json.item);
      return texts;
    }

</script>

<template>
  <div class="container">
    <h1 v-if="thisQuestionnaire">{{ thisQuestionnaire.title }}</h1>
    <p v-if="thisQuestionnaire" class="description">{{ thisQuestionnaire.description }}</p>
    <div v-if="allText.length > 0" class="text-list">
      <p v-for="(text, index) in allText" :key="index">{{ text }}</p>
    </div>
  </div>
</template>


<style scoped>

/* Conteneur principal */
.container {
  width: 100%; /* Largeur ajustable selon le besoin */
  max-width: 1000px; /* Largeur maximale pour le conteneur */
  margin: 0; /* Enlève la marge pour centrer le conteneur */
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
  margin-top: 80px; /* Garde la marge du haut si nécessaire */
}

/* Titre du questionnaire */
h1 {
  font-size: 24px;
  color: #333;
  border-bottom: 2px solid #007bff;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

/* Description du questionnaire */
.description {
  font-size: 18px;
  color: #555;
  margin-bottom: 20px;
}

/* Liste des textes */
.text-list {
  margin-top: 20px;
  padding: 10px;
  border-top: 1px dashed #ccc;
}

.text-list p {
  margin: 5px 0;
  font-size: 16px;
  color: #666;
}

/* Espacement des éléments */
.text-list p {
  margin-left: 20px;
  color: #444;
}

</style>

