<template>
<div class="chat" :style="{backgroundColor:mainColor}">

<user-chat-header
        @collapse="chiba"
        @logOutUserChat="logOutUC"/>

    <user-chat-messages
            :newMessage="myNewMessage"/>

    <user-chat-type-message
            @sendMessage="sendingMessage"/>
</div>
</template>
<script>
    import hostMixins from "@/mixins/hostMixins";
    import UserChatHeader from "@/components/User/UserChatHeader/UserChatHeader";
    import UserChatMessages from "@/components/User/UserChatMessages/UserChatMessages";
    import UserChatTypeMessage from "@/components/User/UserChatTypeMessage/UserChatTypeMessage";
    import {mapState} from "vuex";
    export default {
        components:{
            UserChatHeader,
            UserChatMessages,
            UserChatTypeMessage
        },
        data() {
            return {
                username: null,
                myNewMessage:null,


            }
        },
        mixins: [hostMixins],
        methods:{
            soundNotification() {
                let audio = new Audio();
                audio.src = 'https://ringon.site/?do=get-file&id=34361';
                audio.volume=0.3;
                audio.play();
            },
            userResponce() {
                this.$socket.emit('connected', {id: sessionStorage.getItem('user_id')});
                this.sockets.subscribe('user_response', (data) => {
                    if(data.error){
                        if(data.error==="User banned")
                        {
                                sessionStorage.setItem('user_status',"Banned");
                                this.chiba();

                        }
                        console.log(data.error);

                    }
                    else{
                        console.log('Сообщение получено');
                        let fileArray=[];
                        for(let i=0;i<data.file.length;i++){
                            fileArray.push({
                                "name": data.file[i]
                            })
                        }
                        const newMessage = {
                            name: 'Admin',
                            message: data.message,
                            role: 'Admin',
                            file:fileArray
                        }


                        console.log(newMessage);


                        this.myNewMessage=newMessage;
                        this.soundNotification();

                    }
                });
            },
            chiba() {
                this.$emit('collapse')
            },
            logOutUC() {
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
        computed:{
            ...mapState({
                mainColor:state=>state.styleForUser.mainColor,
            })
        }
    }
</script>
<style  scoped>
    @import "UserChat.css";
</style>