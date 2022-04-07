import Chat from "@/components/Chat";
import registrationAdmin from "@/components/registrationAdmin";
import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import checking from "@/compshit/checking";


const routes=[
    {
        path:'/',
        component:Chat
    },

    {
        path:'/admin',
        component:registrationAdmin
    },
    {
        path:'/checking',
        component:checking
    },
]

const router= createRouter({
    routes,
    //history:createWebHistory(process.env.BASE_URL)
   // history:createWebHashHistory(process.env.BASE_URL)
    history:createWebHistory(process.env.BASE_URL)
})

export default router;