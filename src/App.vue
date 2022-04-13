<template>
    <router-view></router-view>
</template>

<script>
    import Chat from "@/pages/Chat/Chat";
    import AdminChat from "@/components/AdminChat/AdminChat";

    export default {

        components:{
            Chat,
            AdminChat

        },


    }
</script>

<style >
    /*html,body{*/
    /*    margin: 0;*/
    /*    overflow: hidden;*/
    /*}*/
    /*p{*/
    /*   margin-bottom: 0;*/
    /*}*/


</style>