<template>
                    <div class="view chat"
                         :style="{backgroundColor:bcol}">
                        <header>
                            <button
                                    class="cloi"
                                    @click="chiba">Скрыть
                            </button>
                            <button
                                    class="logout"
                                    @click="logOut">Выйти
                            </button>
                            <h1 style="max-width: 250px;overflow: hidden;font-size: 110%">
                                Здравствуйте, {{username}}
                            </h1>
                        </header>
                        <section class="chat-box" ref="chatter">
                            <div
                                    v-for="content in messages"
                                    :class="(content.role === 'User' ? 'message current-user' : 'message')"
                            >
                                <div class="message-inner">
                                    <div class="username">{{content.name}}</div>
                                    <div
                                            :style="(content.role === 'User' ? {backgroundColor:bcol}:'background-color: #F3F3F3;')"
                                            class="content">{{content.message}}
                                    </div>
                                </div>
                            </div>
                        </section>


                        <footer>
                            <form @submit.prevent="sendMessage">
                                <textarea
                                        ref="inpMes"
                                        @keypress.enter="sendMessage"
                                        v-model="userMessage"
                                        rows="2"
                                        cols="4"
                                        placeholder="Написать сообщение..."/>
                                <input
                                        :style="{backgroundColor:bcol}"
                                        type="submit"
                                        value='Отпр.'
                                />
                            </form>
                        </footer>
                    </div>
</template>

<script>
    import hostMixins from "@/mixins/hostMixins";
    import axios from 'axios';
    export default {
        data() {

            return {
                username: null,
                messages: [],
                userMessage: null,
                logError: null,
                userId: null,
                email: null
            }
        },
        mixins: [hostMixins],
        props:{
            bcol:{
                type:String,
                default:"#7B68EE"
            },
            isHigh:{
                type:Boolean,
                default: false,
            },
            isIn:{
                type:Boolean,
                default: false,
            }
        },
        methods:{
            chiba() {
                this.$emit('collapse')
            },
            sendMessage() {
                console.log(this.$refs.inpMes.target);
                if (this.userMessage != null && this.userMessage != '') {
                    this.userMessage = this.userMessage.trim();
                    if (this.userMessage != null && this.userMessage != ''){
                        const message = {
                            user_id: sessionStorage.getItem('user_id'),
                            name: sessionStorage.getItem('user_name'),
                            message: this.userMessage,
                            date: this.dateFocuses(),
                            role: 'User'
                        }
                        console.log(message);
                        this.$socket.emit('user_message', message);
                        this.messages.push(message);
                        this.userMessage = '';
                        console.log('Сообщение отправлено');
                    }
                    else {
                        alert("Введите сообщение");
                    }
                } else {
                    alert("Введите сообщение");
                }
            },
            logOut() {
                this.$emit('logOut');
            },
            async getMessages() {
                const sup = {
                    headers: {
                        Authorization: process.env.VUE_APP_TOKEN
                    },
                    params: {
                        user_id: sessionStorage.getItem('user_id')
                    }
                }
                console.log(sup);
                await axios.get(`${this.myProxy}/api/users/messages`, sup)
                    .then((res) => {
                        console.log(res);
                        if (res.data.error) {
                            alert('ошибка соединения');
                        } else {

                            this.messages = [];
                            let message = {};
                            for (let i = 0; i < res.data.length; i++) {
                                message = {
                                    user_id: res.data[i].user_id,
                                    name: ((res.data[i].status) === 'Admin' ? 'Admin' : sessionStorage.getItem('user_name')),
                                    message: res.data[i].message,
                                    role: ((res.data[i].status) === 'Admin' ? 'Admin' : 'User')
                                }
                                this.messages.push(message);
                            }

                        }

                    })
            },

            checkAuth() {
                if (sessionStorage.getItem('user_id') !== 'undefined' && sessionStorage.getItem('user_id') !== null) {
                    this.username = sessionStorage.getItem('user_name');
                    this.$emit('isLogOk', true);
                    this.getMessages();
                    this.userResponce();
                } else {
                    this.$emit('isLogOk', false);
                }

            },

        },
        mounted() {
            this.checkAuth();
        },
        watch: {
            messages: {
                handler(val, oldVal) {
                    setTimeout(this.scrollToEnd,200);
                },
                deep: true
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "./UserChat.scss";
</style>