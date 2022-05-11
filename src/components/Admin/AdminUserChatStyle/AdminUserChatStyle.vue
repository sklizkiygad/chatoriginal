<template>




    <div  v-if="!isHigh"
         class="lowbeAdmin"
         :style="{backgroundColor:chatColor}"
         @click="this.$emit('setLow')"
    >
        <p :style="{color:mainTextColor}">
            <svg xmlns="http://www.w3.org/2000/svg"
                 width="16"
                 height="16"
                 :fill="mainTextColor"
                 class="bi bi-arrow-down-right-circle-fill"
                 viewBox="0 0 16 16">
                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm5.904-2.803a.5.5 0 1 0-.707.707L9.293 10H6.525a.5.5 0 0 0 0 1H10.5a.5.5 0 0 0 .5-.5V6.525a.5.5 0 0 0-1 0v2.768L5.904 5.197z"/>
            </svg>
            Жмакни
        </p>
    </div>

    <div v-else class="admin-style-chat" :style='{backgroundColor:chatColor}' :class="chatPosition==='left' ? 'positionLeft':'positionRight'">
        <header>
            <button class="header__buttons">
                <svg  @click="changeSize" xmlns="http://www.w3.org/2000/svg" width="20" height="20" :fill="mainTextColor" class="bi bi-arrows-angle-contract" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M.172 15.828a.5.5 0 0 0 .707 0l4.096-4.096V14.5a.5.5 0 1 0 1 0v-3.975a.5.5 0 0 0-.5-.5H1.5a.5.5 0 0 0 0 1h2.768L.172 15.121a.5.5 0 0 0 0 .707zM15.828.172a.5.5 0 0 0-.707 0l-4.096 4.096V1.5a.5.5 0 1 0-1 0v3.975a.5.5 0 0 0 .5.5H14.5a.5.5 0 0 0 0-1h-2.768L15.828.879a.5.5 0 0 0 0-.707z"/>
            </svg>
            </button>
            <button
                    class="logout"
                    ><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" :fill="mainTextColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
            </svg>
            </button>
            <h1 class="header__greeting" :style="{color:mainTextColor}">
                Здравствуйте, Дмитрий
            </h1>
        </header>

        <section class="user-message-history"
                 :style="{backgroundColor:chatBackgroundColor}"
                 ref="chatter">

            <div class="user-message-history__messages-list current-user">
                <div class="user-message-history__messages-list__message-inner">
                    <div class="user-message-history__messages-list__message-inner__username" :style="{color:usernameColor}">Дмитрий</div>
                    <div class="user-message-history__messages-list__message-inner__content" :style='{backgroundColor: chatColor}'>
                        <p :style="{color:mainTextColor}">Привет</p>
                    </div>
                </div>
            </div>
            <div class="user-message-history__messages-list">
                <div class="user-message-history__messages-list__message-inner">
                    <div class="user-message-history__messages-list__message-inner__username" :style="{color:usernameColor}">Админ</div>
                    <div class="user-message-history__messages-list__message-inner__content" :style='{backgroundColor: adminMsgBackground}'>
                        <p :style="{color:adminMsgFont}">Добрый вечер</p>
                    </div>
                </div>
            </div>

        </section>

        <footer>
            <form class="input-msg-form" @submit.prevent="">
                                <textarea
                                        ref="inpMes"
                                        rows="2"
                                        cols="4"
                                        placeholder="Написать сообщение..."/>
                <div class="input-msg-form__butt">
                    <label :style="{backgroundColor:chatColor, color:mainTextColor}" for="subBut">
                        <svg  xmlns="http://www.w3.org/2000/svg" width="100%" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                        </svg>
                    </label>
                    <input
                            type="submit"
                            id="subBut"
                            value='Отпр.'
                    />
                    <label :style="{backgroundColor:chatColor, color:mainTextColor}" for="fileUp">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="16" fill="currentColor" class="bi bi-folder-symlink" viewBox="0 0 16 16">
                            <path d="m11.798 8.271-3.182 1.97c-.27.166-.616-.036-.616-.372V9.1s-2.571-.3-4 2.4c.571-4.8 3.143-4.8 4-4.8v-.769c0-.336.346-.538.616-.371l3.182 1.969c.27.166.27.576 0 .742z"/>
                            <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm.694 2.09A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09l-.636 7a1 1 0 0 1-.996.91H2.826a1 1 0 0 1-.995-.91l-.637-7zM6.172 2a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z"/>
                        </svg>
                    </label>
                    <input
                            ref="file"
                            id="fileUp"
                            type="file"
                            @click.prevent=""
                    />
                </div>
            </form>
        </footer>
    </div>
</template>

<script>

import UserChatLow from "@/components/User/UserChatLow/UserChatLow";

    export default {
        data(){
            return{
                isHigh:true,
            }
        },
        components:{
            UserChatLow

        },

        props:{
            chatColor: {
                type:String,
                default:'#7B68EE'
            },
            adminMsgBackground: {
                type:String,
                default:'#F3F3F3'
            },
            adminMsgFont: {
                type:String,
                default:'#000000'
            },
            usernameColor: {
                type:String,
                default:'#888888'
            },
            chatPosition: {
                type:String,
                default:'right'
            },
            chatBackgroundColor: {
                type:String,
                default:'#ffffff'
            },
            mainTextColor: {
                type:String,
                default:'#ffffff'
            },
        },

        methods:{
            changeSize(){
                this.isHigh=!this.isHigh
            }
        },

    }
</script>

<style scoped>
@import "../../User/UserChat/UserChat.css";
@import "../../User/UserChatHeader/UserChatHeader.css";
@import "../../User/UserChatMessages/UserChatMessages.css";
@import "../../User/UserChatTypeMessage/UserChatTypeMessage.css";
@import "../../../pages/Chat/Chat.css";
@import "AdminUserChatStyle.css";


</style>