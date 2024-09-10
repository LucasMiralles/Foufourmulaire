<template>
  <div>
    <h1>Questionnaire: {{ questionnaire.title }}</h1>
    <p>{{ questionnaire.description }}</p>

    <!-- Formulaire dynamique basé sur les items du questionnaire -->
    <form @submit.prevent="submitForm">
      <div v-for="item in questionnaire.item" :key="item.linkId">
        <QuestionnaireItem :item="item" />
      </div>
      <button type="submit">Envoyer</button>
    </form>
  </div>
</template>

<script>
import QuestionnaireItem from './QuestionnaireItem.vue';

export default {
  name: 'FormView',
  components: {
    QuestionnaireItem
  },
  props: {
    questionnaireDTO: {
      type: Object,
      required: true
    }
  },
  computed: {
    // Convertit le questionnaireDTO en une instance de QuestionnaireDTO
    questionnaire() {
      return new QuestionnaireDTO(
          this.questionnaireDTO.id,
          this.questionnaireDTO.url,
          this.questionnaireDTO.identifier,
          this.questionnaireDTO.version,
          this.questionnaireDTO.name,
          this.questionnaireDTO.title,
          this.questionnaireDTO.status,
          this.questionnaireDTO.date,
          this.questionnaireDTO.publisher,
          this.questionnaireDTO.description,
          this.questionnaireDTO.purpose,
          this.questionnaireDTO.subjectType,
          this.questionnaireDTO.item
      );
    }
  },
  methods: {
    submitForm() {
      // Logique de soumission du formulaire
      console.log("Réponses du questionnaire :", this.answers);
    }
  }
};
</script>

<style scoped>
/* Ajoute du style si nécessaire */
</style>
