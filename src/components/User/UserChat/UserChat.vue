<template>
<div class="view chat" :style="{backgroundColor:bcol}">

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
    }
</script>
<style  scoped>
    @import "UserChat.css";
</style>