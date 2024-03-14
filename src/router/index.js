import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from "@/views/Home.vue";
import Test from "@/views/Test.vue";
import Fitts from "@/views/Fitts.vue";
import Finish from "@/views/Finish.vue";
import CognitiveLoadStudy from "@/views/CognitiveLoadStudy.vue";

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes : [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
        path: '/test',
        name: 'Test',
        component: Test
    },
    {
        path: '/fitts',
        name: 'Fitts',
        component: Fitts
    },
    {
        path: '/cl',
        name: 'CognitiveLoadStudy',
        component: CognitiveLoadStudy
    },
    {
        path: '/finish',
        name: 'Finish',
        component: Finish
    },
    {
      path : '*',
      redirect : '/'
    }
  ]
});


export default router