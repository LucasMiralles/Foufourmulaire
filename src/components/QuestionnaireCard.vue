<script setup>
import { useRouter } from 'vue-router';

const props = defineProps(["questionnaire"]);

const router = useRouter();

/*const getServiceImage = (serviceName) => {
  const imageMap = {
    neurologie: '/img/cerveau.png',
    cardiologie: '/img/cardilogie.png',
    ophthalmologie: '/img/oeil.png',
    dermatologie: '/img/.dermatologie.png',
    pneumologie: '/img/pneumologie.png',
    gastrologie: '/img/gastro-enterologie.png',
    hematologie: '/img/hematologie.png',
    rhumatologie: '/img/rhumatologie.png',
    orl: '/img/oreille.png',
  };

  return imageMap[serviceName.toLowerCase()] || '/img/annuler.png';
};*/

const handleCardClick = () => {
  router.push({ name: 'FormView', params: { id: props.questionnaire.id } });
};
</script>

<template>
      <div class="card" @click="handleCardClick">
        <!-- <img :src="getServiceImage(permission.element)" alt="Service image" class="service-image" /> -->
        <p>{{ questionnaire.name }}</p>
  </div>
  
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  width: 150px;
  height: 200px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  cursor: pointer;
}

.card:hover {
  transform: scale(1.05);
}

.service-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
}

p {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  text-align: center;
}
</style>