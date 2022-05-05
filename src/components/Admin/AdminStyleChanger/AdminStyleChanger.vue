<template>
    <div class="style-changer">
        <form  @submit.prevent="sendStyle">

            <div class="style-changer__twin-blocks">

                <div>
                    <label for="mainColor">Основной цвет чата:</label>
                    <input id="mainColor"  v-model="mainColor" type="color">
                </div>

                <div>
                    <label for="mainColor">Основной текст чата:</label>
                    <input id="mainTextColor"  v-model="mainTextColor" type="color">
                </div>


                <div>
                    <label for="adminMsgBackCol">Цвет сообщений админа:</label>
                    <input id="adminMsgBackCol"  v-model="adminMsgBackCol" type="color">
                </div>


                <div>
                    <label for="adminMsgFontCol">Цвет текста сообщений админа:</label>
                    <input id="adminMsgFontCol"  v-model="adminMsgFontCol" type="color">
                </div>

                <div>
                    <label for="usernameColor">Цвет имён:</label>
                    <input id="usernameColor"  v-model="usernameColor" type="color">
                </div>


                <div>
                     <label for="mainBackColor">Цвет фона сообщений:</label>
                     <input id="mainBackColor"  v-model="mainBackColor" type="color">
                </div>
            </div>





            <h4>Расположение на странице:</h4>
            <div class="style-changer__position-choose">
                <div>
                <label for="positionChatLeft">Слева</label>
                <input id="positionChatLeft"  value="left" type="radio"  v-model="chatPosition">
                </div>

                <div>
                 <label for="positionChatRight">Справа</label>
                <input id="positionChatRight"  value="right" type="radio" v-model="chatPosition">
                </div>
            </div>
            <button type="submit">Применить изменения</button>
        </form>

        <admin-user-chat-style
                :chatColor="mainColor"
                :adminMsgBackground="adminMsgBackCol"
                :adminMsgFont="adminMsgFontCol"
                :usernameColor="usernameColor"
                :chatPosition="chatPosition"
                :chatBackgroundColor="mainBackColor"
                :mainTextColor="mainTextColor"
        />


    </div>
</template>

<script>
    import AdminUserChatStyle from "@/components/Admin/AdminUserChatStyle/AdminUserChatStyle";

    export default {
        data(){
          return{
              mainColor:'#7B68EE',
              mainBackColor:'#ffffff',
              chatPosition:'right',
              adminMsgBackCol:'#F3F3F3',
              adminMsgFontCol:'#000000',
              mainTextColor:'#ffffff',
              usernameColor: '#888888'
          }
        },
        components:{
            AdminUserChatStyle
        },
     

        methods:{
            sendStyle(){
                console.log("отправка на сервер");
            },

        },




    }
</script>

<style scoped>
@import "AdminStyleChanger.css";
</style>