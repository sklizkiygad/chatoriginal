import Chat from "@/components/Chat";
import registrationAdmin from "@/components/registrationAdmin";
import {createRouter, createWebHistory} from "vue-router";



const routes=[
    {
        path:'/',
        component:Chat
    },

    {
        path:'/admin',
        component:registrationAdmin
    },
]

const router= createRouter({
    routes,
   // history:createWebHashHistory(process.env.BASE_URL)
    history:createWebHistory(process.env.BASE_URL)
})

export default router;