import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/router';
import babySocket from '@/plugins/socket';
import store from '@/store';

createApp(App)
    .use(router)
    .use(babySocket)
    .use(store)
    .mount('#app');












