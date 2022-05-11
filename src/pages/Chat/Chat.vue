<template>


        <transition name="fade">


            <user-chat-low
                    v-if="!isHigh"
                    @setLow="chiba"
            />

            <div v-else>
                <LogChat
                        v-if="!isIn"
                         @isLogOk="userLogging"
                         @collapse="chiba"
                />
                <UserChat
                        v-else

                        :isHigh="isHigh"
                        @logOut="logOut"
                        @collapse="chiba"
                />
            </div>
            
        </transition>


</template>


<script>

    import hostMixins from "@/mixins/hostMixins";
    import LogChat from "@/components/User/LogChat/LogChat";
    import UserChat from "@/components/User/UserChat/UserChat";
    import UserChatLow from "@/components/User/UserChatLow/UserChatLow";
    import $store from "@/store";
    import {mapState,mapActions} from "vuex";

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
                email: null,
            }
        },
        sockets: {
            connect: function () {
                console.log('socket connected');
            },
        },
        methods: {
            ...mapActions({
                getSiteId:'styleForUser/getSiteId'
            }),
            chiba() {
                this.isHigh = !this.isHigh;
                localStorage.setItem('chatIsFulled',this.isHigh);

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
        created() {
            console.log(window.location.host);
            this.getSiteId(window.location.host);

        },
        computed:{
            ...mapState({
                mainColor:state=>state.styleForUser.mainColor,
            })
        }



    }
</script>

<style  scoped>
    @import "Chat.css";
</style>