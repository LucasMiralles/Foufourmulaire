import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
const app = createApp(App)

app.use(router)
    //.use(store)


app.mount('#app')
//createApp(App).mount('#app')