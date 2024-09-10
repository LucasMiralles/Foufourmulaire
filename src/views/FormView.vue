
<script setup>
    //defineProps(["questionnaire"]);
    import { useRoute } from 'vue-router';
    import { ref, onMounted } from 'vue';
    import {url, urlToken, audience} from "../api.js"

    const route = useRoute();

    const id = route.params.id;
    const thisQuestionnaire = ref(null);



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
        
      
      console.log(thisQuestionnaire);
    })
    .catch(error => console.log(error));
}

onMounted(() => {
  getThisQuestionnaire();
});
</script>

<template>
    {{ id }}
</template>



