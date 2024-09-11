<script setup>
import { useRouter } from 'vue-router';
import cardioImg from '@/assets/img/cardiologie.png';
import neuroImg from '@/assets/img/cerveau.png';
import ophthalmoImg from '@/assets/img/oeil.png';
import dermatoImg from '@/assets/img/dermatologie.png';
import pneumoImg from '@/assets/img/pneumologie.png';
import gastroImg from '@/assets/img/gastro-enterologie.png';
import hematoImg from '@/assets/img/hematologie.png';
import rhumatoImg from '@/assets/img/rhumatologie.png';
import orlImg from '@/assets/img/oreille.png';
import annulerImg from '@/assets/img/annuler.png';

const props = defineProps(["name", "date"]);
const router = useRouter();

const imageMap = {
  cardio: cardioImg,
  neuro: neuroImg,
  ophthalmo: ophthalmoImg,
  dermato: dermatoImg,
  pneumo: pneumoImg,
  gastro: gastroImg,
  hemato: hematoImg,
  rhumato: rhumatoImg,
  orl: orlImg,
};

const getServiceImage = (name) => {
  const lowerTitle = name.toLowerCase();
  for (const key in imageMap) {
    if (lowerTitle.includes(key)) {
      return imageMap[key];
    }
  }
  return annulerImg;
};


</script>

<template>
  <div class="card">
    <img :src="getServiceImage(props.name)" alt="Service image" class="service-image" />
    <p class="card-title">{{ props.name }}</p>
    <p class="response-date">Répondu le : {{ props.date }}</p>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #3A5199;
  border: 1px solid #ddd;
  border-radius: 30px;
  padding: 20px;
  width: 250px;
  height: 250px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  position: relative;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.3);
}

.card-title {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  color: #ffffff;
  font-size: 16px;
  font-weight: 300;
  text-align: center;
  margin: 0;
  max-width: 90%;
  overflow-wrap: break-word;
}

.service-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  margin-top: 30px;
}

.response-date {
  color: white;
  margin-top: 25px;
}
</style>