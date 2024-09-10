<template>
  <div>
    <h2>{{ item.text }}</h2>

    <!-- Si l'item contient des sous-items, les afficher de manière récursive -->
    <div v-if="item.item.length">
      <div v-for="subItem in item.item" :key="subItem.linkId">
        <QuestionnaireItem :item="subItem" />
      </div>
    </div>

    <!-- Gérer différents types de champs de formulaire -->
    <div v-else>
      <template v-if="item.type === 'string'">
        <label :for="item.linkId">{{ item.text }}</label>
        <input type="text" v-model="answers[item.linkId]" :required="item.required" />
      </template>

      <template v-if="item.type === 'date'">
        <label :for="item.linkId">{{ item.text }}</label>
        <input type="date" v-model="answers[item.linkId]" :required="item.required" />
      </template>

      <template v-if="item.type === 'integer'">
        <label :for="item.linkId">{{ item.text }}</label>
        <input type="number" v-model="answers[item.linkId]" :required="item.required" />
      </template>

      <!-- Ajoute d'autres types de champs si nécessaire -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionnaireItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      answers: {}
    };
  }
};
</script>

<style scoped>
/* Ajoute du style si nécessaire */
</style>
