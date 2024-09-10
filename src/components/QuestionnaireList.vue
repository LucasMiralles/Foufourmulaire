<script setup>
import {onMounted, reactive, ref} from "vue";
import {url, urlToken, audience} from "../api.js"
import QuestionnaireCard from "@/components/QuestionnaireCard.vue";

// const props = defineProps(["consumer", "useCase", "delete"]);


const newQuestionnaire = reactive([]);

newQuestionnaire.sort((a, b) => a.element.localeCompare(b.element));



/*
*  Function to get all the permissions for a consumer
* @param {string} nom - Le nom du consommateur qui doit être strictement égal à l'id du consommateur dans le serveur FHIR
* NB logiquement, le nom est l'id de la ressource permission récup dans usecase donc pas de pb
*
* fonction me pemettant de récupérer toutes les ressources permissions de mon serveur FHIR,  si l'élément de la resource patient pour le premer cas d'usage est dans la ressource permission je lui donne la valeur true sinon je lui donne la valeur false. Cela me permet d'afficher des coché ou non en fonction de si l'élément est lentionné dans la ressource permission.
* */
/*
function getPermissionFor() {
  // Créer un objet Headers pour spécifier les en-têtes de la requête HTTP (type de contenu, acceptation, autorisation)
  const headers = new Headers();
  headers.append('Content-Type', 'application/fhir+json');
  headers.append('Accept', 'application/fhir+json');
  headers.append('Authorization', `Bearer ${localStorage.getItem('jwt')}`); // Récupérer le jeton JWT du stockage local
  const fetchOptions = {
    method: "GET",
    headers: headers
  };
  //const url = "https://localhost:4443/fhir/Permission/"+ props.consumer.nom;
  fetch(url +"Permission/"+ props.consumer.nom, fetchOptions)
      .then((response) => {
        console.log(response)
        return response.json();
      })
      .then((dataJSON) => {
        console.log(dataJSON);
        newQuestionnaire.splice(0, newQuestionnaire.length);
        dataJSON.rule.forEach(rule => {
          // Parcourir chaque élément de données de la règle
            rule.data.forEach(data => {
            // Vérifier si l'élément de données contient une expression JSONPath
              if (data.expression) {
                // Ajouter l'expression JSONPath à la liste ExistPermissions
                newQuestionnaire.push(new Permission( data.expression.expression, false));
              }
            });
          })
        // go through all the permissions in the allPermissions list to check if they exist in the existPermissions list
        allPermissions.forEach((p) => {
          let iExist = false //variable to check if the permission exist

         newQuestionnaire.forEach((exP) => { // check if the permission exist in the existPermissions
           if(p.element === exP.element) { //if the permission exist
             iExist = true // set iExist to true
           }
           //console.log(p.element, exP.element, iExist) //debug
         })
            if(!iExist) newQuestionnaire.push(p); // if the permission doesn't exist in the existPermissions we add it with the value false

        });
      })

      .catch((error) => console.log(error));
}


*/

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
      
      // Assurez-vous que dataJSON est un tableau
      if (Array.isArray(dataJSON)) {
        newQuestionnaire.splice(0, newQuestionnaire.length);
        dataJSON.forEach(questionnaireData => {
          // Créez une instance de QuestionnaireDTO et ajoutez-la à la liste
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
      console.log(newQuestionnaire);
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
  <div class="card">

    <QuestionnaireCard
      v-for="questionnaire in newQuestionnaire"
      :key="questionnaire.id"
      :questionnaire="questionnaire"
      
    />
 </div> 
 
</template>

<style scoped>
h2{
  color: #fff;
  text-align: center;
  font-family: Arial, sans-serif;
}

.card {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
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