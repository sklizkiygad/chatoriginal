<template>
<div class="view chat" :style="{backgroundColor:bcol}">

<user-chat-header
        @collapse="chiba"
        @logOut="logOut"/>

    <user-chat-messages
            :newMessage="myNewMessage"/>

    <user-chat-type-message
            @sendMessage="sendingMessage"/>
</div>
</template>
<script>
    import hostMixins from "@/mixins/hostMixins";
    import UserChatHeader from "@/components/UserChatHeader/UserChatHeader";
    import UserChatMessages from "@/components/UserChatMessages/UserChatMessages";
    import UserChatTypeMessage from "@/components/UserChatTypeMessage/UserChatTypeMessage";
    export default {
        components:{
            UserChatHeader,
            UserChatMessages,
            UserChatTypeMessage
        },
        data() {
            return {
                username: null,
                myNewMessage:null
            }
        },
        mixins: [hostMixins],
        props:{
            bcol:{
                type:String,
                default:"#7B68EE"
            },
        },
        methods:{
            chiba() {
                this.$emit('collapse')
            },
            logOut() {
                this.$emit('logOut');
            },
            sendingMessage(mess){
                this.myNewMessage=mess;
            },
            checkAuth() {
                if (sessionStorage.getItem('user_id') !== 'undefined' && sessionStorage.getItem('user_id') !== null) {
                    this.username = sessionStorage.getItem('user_name');
                    this.$emit('isLogOk', true);
                    this.userResponce();

                } else {
                    this.$emit('isLogOk', false);
                }
            },

        },
        mounted() {
            this.checkAuth();
        },
    }
</script>
<style  scoped>
    @import "./UserChat.css";
</style>