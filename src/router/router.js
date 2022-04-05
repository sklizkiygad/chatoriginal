import Chat from "@/components/Chat";
import registrationAdmin from "@/components/registrationAdmin";
import {createRouter, createWebHashHistory} from "vue-router";
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
    history:createWebHashHistory(process.env.BASE_URL)
})

export default router;