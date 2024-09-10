<template>
    <div class="questionnaire-page">
      <h1>Questionnaire</h1>
      <form @submit.prevent="submitForm">
        <div v-for="(question, index) in questions" :key="index" class="question-block">
          <label :for="'question-' + index">{{ question.label }}</label>
          <input
            v-if="question.type === 'text'"
            :id="'question-' + index"
            v-model="question.answer"
            type="text"
          />
          <select
            v-if="question.type === 'select'"
            :id="'question-' + index"
            v-model="question.answer"
          >
            <option v-for="option in question.options" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const questions = ref([
    { label: 'Quel est votre nom ?', type: 'text', answer: '' },
    { label: 'Quel est votre âge ?', type: 'text', answer: '' },
    {
      label: 'Quel est votre genre ?',
      type: 'select',
      options: ['Homme', 'Femme', 'Autre'],
      answer: ''
    }
  ]);
  
  const submitForm = () => {
    console.log('Réponses du questionnaire:', questions.value);
    alert('Questionnaire envoyé avec succès !');
  };
  </script>
  
  <style scoped>
  .questionnaire-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .question-block {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input, select {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #007BFF;
    color: white;
    font-size: 18px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>  