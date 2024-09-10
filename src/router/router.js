import { createRouter, createWebHistory } from 'vue-router'


import LoginView from "../views/LoginView.vue";
import HomePageView from "@/views/HomePageView.vue";
import QuestionnairePageView from "@/views/QuestionnairePageView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Accueil',
            component: HomePageView
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginView
        },
        {
            path: '/questionnaire',
            name: 'QuestionnairePage',
            component: QuestionnairePageView
        }
    ]
})
export default router
router.beforeEach((to, from, next) => {
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('patientId');

    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});