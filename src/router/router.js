import Chat from "@/pages/Chat/Chat";

import {createRouter, createWebHistory} from "vue-router";
import AdminPanel from "@/pages/AdminPanel/AdminPanel";



const routes=[
    {
        path:'/',
        component:Chat
    },

    {
        path:'/admin',
        component:AdminPanel
    },
]

const router= createRouter({
    routes,
   // history:createWebHashHistory(process.env.BASE_URL)
    history:createWebHistory(process.env.BASE_URL)
})

export default router;