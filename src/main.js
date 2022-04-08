import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/router";
import babySocket from '@/plugins/socket';






createApp(App)
    .use(router)
    .use(babySocket)
    .mount('#app');












