<template>
    <div class="base">
        <transition name="fade">
            <div class="lowbe"
                 :style="{backgroundColor:bcol}"
                 @click="chiba"
                 v-if="!isHigh">
                <p>
                    <svg xmlns="http://www.w3.org/2000/svg"
                         width="16"
                         height="16"
                         fill="currentColor"
                         class="bi bi-arrow-down-right-circle-fill"
                         viewBox="0 0 16 16">
                        <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm5.904-2.803a.5.5 0 1 0-.707.707L9.293 10H6.525a.5.5 0 0 0 0 1H10.5a.5.5 0 0 0 .5-.5V6.525a.5.5 0 0 0-1 0v2.768L5.904 5.197z"/>
                    </svg>
                    Жмакни
                </p>
            </div>
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
    import axios from 'axios';
    import LogChat from "@/components/LogChat/LogChat";
    import UserChat from "@/components/UserChat/UserChat";

    export default {
        components: {LogChat,UserChat},
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
                this.sockets.unsubscribe('message_response');
                this.$socket.disconnect();
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

<style lang="scss" scoped>
    @import "./Chat.scss";
</style>