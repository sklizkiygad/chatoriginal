<template>
    <div class="base">
        <transition name="fade">


            <user-chat-low
                    v-if="!isHigh"
                    :chatColor="bcol"
                    @setLow="chiba"
            />

            <div v-else>
                <LogChat
                        v-if="!isIn"
                        :bcol="bcol"
                         @isLogOk="userLogging"
                         @collapse="chiba"
                />
                <UserChat
                        v-else
                        :bcol="bcol"
                        :isHigh="isHigh"
                        @logOut="logOut"
                        @collapse="chiba"
                />
            </div>
            
        </transition>

    </div>
</template>


<script>

    import hostMixins from "@/mixins/hostMixins";
    import LogChat from "@/components/User/LogChat/LogChat";
    import UserChat from "@/components/User/UserChat/UserChat";
    import UserChatLow from "@/components/User/UserChatLow/UserChatLow";

    export default {
        components: {LogChat,UserChat,UserChatLow},
        mixins: [hostMixins],
        data() {
            return {
                connection: null,
                username: null,
                messages: [],
                userMessage: null,
                isHigh: false,
                logError: null,
                isIn: false,
                userId: null,
                bcol: "#7B68EE",
                email: null,
            }
        },
        sockets: {
            connect: function () {
                console.log('socket connected');
            },
        },
        methods: {
            chiba() {
                this.isHigh = !this.isHigh;
            },
            logOut() {
                console.log('дисконнектюсь');
                this.sockets.unsubscribe('message_response');
                sessionStorage.clear();
                this.isIn=false;
            },

            userLogging(booba){
                this.isIn=booba;
            },
            checkAuth() {
                if (sessionStorage.getItem('user_id') !== 'undefined' && sessionStorage.getItem('user_id') !== null) {
                    this.username = sessionStorage.getItem('user_name');
                    this.isIn = true;
                } else {
                    this.isIn = false;
                }

            },
        },
        mounted() {
            this.checkAuth();
        },



    }
</script>

<style  scoped>
    @import "Chat.css";
</style>