<template>
  <div v-for="item in items" :key="item.linkId">
    <!-- Affichage du linkId et du text -->
    <p>{{ item.linkId }}: {{ item.text }}</p>

    <!-- Si l'item contient des sous-items, on les affiche aussi -->
    <QuestionnaireItem v-if="item.item && item.item.length > 0" :items="item.item" />
  </div>
</template>

<script>
export default {
  name: "QuestionnaireItem",
  props: {
    items: {
      type: Array,
      required: true
    }
  }
};
</script>
