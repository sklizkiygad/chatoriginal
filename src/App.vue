<template>

    <div class="base">
      <Chat />
<!--      <AdminChat/>-->



    </div>
</template>

<script>
    import Chat from "@/components/Chat";
    import AdminChat from "@/components/AdminChat";

    export default {

        components:{
            Chat,
            AdminChat

        },


    }
</script>

<style >
    html,body{
        margin: 0;
    }
    p{
       margin-bottom: 0;
    }
    .base{
        height: 100vh;
        background-image: url("../public/img/nezuko.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }

</style>