<template>

    <div class="base_chat">


        <div class="greetings">
            <h2>Welcome,comrad</h2>
            <a href="#">logout</a>
        </div>



        <div class="mes_chat">

            <div class="mes_server">
                <div class="server_name">Rick:</div>
                <div class="server_message"> Goodbye</div>
            </div>
            <div class="mes_user">
                <div class="user_name">Shpak:</div>
                <div class="user_message"> <p>Hello</p> </div>

            </div>
        </div>



    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
    .base_chat{
        background-color: red;
        width:20%;
        min-width: 250px;
        height: 50%;
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        right: 0;
        bottom: 0;
        border-radius: 15px 15px 0px 0px;
        font-family: "Comic Sans MS";
        box-shadow: 0px 0px 10px black ;


    }
    .mes_chat{
        background-color: white;
        width:100%;

        height: 90%;

        border-radius: 15px 15px 0px 0px;
    }
    .greetings{
        width: 90%;
        display: flex;
        justify-content: space-between;

    }
    .greetings h2{
        font-size: 120%;
    }
    .greetings a{
        color: black;
    }
    .server_message{
        /*background-color: red;*/
        /*position: relative;*/
        /*display: inline-block;*/
        /*border-radius: 5px;*/
        /*padding: 5px;*/
        /*position: absolute;*/
        display: inline-block;
        padding: 10px 20px;
        background-color: #F3F3F3;
        border-radius: 999px;
        color: #333;
        font-size: 18px;
        line-height: 1.2em;
        text-align: left;


    }

    .user_message{
        /*right: 0;*/
        /*background-color: rebeccapurple;*/
        /*position: absolute;*/
        /*display: flex;*/

        /*max-width: 90%;*/
        display: inline-block;
        padding: 10px 20px;
        background-color: #F3F3F3;
        border-radius: 999px;
        color: #333;
        font-size: 18px;
        line-height: 1.2em;
        text-align: left;


    }
    .user_message p{
        word-wrap: break-word;
    }

</style>



