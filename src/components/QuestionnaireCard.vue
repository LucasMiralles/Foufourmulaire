<script setup>
import {ref} from "vue";

defineProps(["permission"]);
const emit = defineEmits(["change"]);
//const checked = ref(permission.value);
</script>

<template>
  <div class="permission">
    <p>{{ permission.element }}</p>
    <input type="checkbox" id="permission.id" v-model="permission.value" @click="$emit('change', permission)">
  </div>
</template>

<style scoped>
.permission {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 5px;
  width: 100%;
  height: 100%;
  color: black;
}
</style>