<template>
    <div class="login"
         :style="{backgroundColor:mainColor}">
        <header>
            <button
                    class="login__collapse-button"
                    @click="this.$emit('collapse')"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" :fill="mainTextColor" class="bi bi-arrows-angle-contract" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M.172 15.828a.5.5 0 0 0 .707 0l4.096-4.096V14.5a.5.5 0 1 0 1 0v-3.975a.5.5 0 0 0-.5-.5H1.5a.5.5 0 0 0 0 1h2.768L.172 15.121a.5.5 0 0 0 0 .707zM15.828.172a.5.5 0 0 0-.707 0l-4.096 4.096V1.5a.5.5 0 1 0-1 0v3.975a.5.5 0 0 0 .5.5H14.5a.5.5 0 0 0 0-1h-2.768L15.828.879a.5.5 0 0 0 0-.707z"/>
            </svg>
            </button>
        </header>
        <form class="login__form"
              @submit.prevent="logIn">
            <div class="login__form__inner">
                <h1>Регистрация</h1>
                <label for="username">Имя (2-15 символов)</label>
                <input
                        id="username"
                        type="text"
                        v-model="username"
                        placeholder="Введите имя..."/>

                <input
                        id="email"
                        type="text"
                        v-model="email"
                        placeholder="Введите адрес почты"/>
                <input
                        :style="{backgroundColor:mainColor,color: mainTextColor}"

                        type="submit"
                        value="Войти"/>
                <p>{{logError}}</p>
            </div>
        </form>
    </div>
</template>

<script>
    import axios from "axios";
    import hostMixins from "@/mixins/hostMixins";
    import {mapState} from "vuex";


    export default {
        data() {
            return {
                username: null,
                logError: null,
                isIn: false,
                userId: null,
                email: null,
                messages:[],

            }
        },
        mixins: [hostMixins],

methods:{
    checkAuth() {
        if (sessionStorage.getItem('user_id') !== 'undefined' && sessionStorage.getItem('user_id')) {
            this.username = sessionStorage.getItem('user_name');
                this.$emit('isLogOk', true);
        }
        else {
            this.$emit('isLogOk', false);
        }
    },
    async logIn() {
        if (this.email || this.username) {
            this.username = this.username.trim();
            if (!this.username || this.username.length > 15 || this.username.length < 2) {
                this.logError = 'Введите верное имя';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.email)) {
                this.logError = 'Неправильный email!';
            } else {
                this.logError = null;
                const userLog = {
                    params: {
                        name: this.username,
                        email: this.email
                    }
                };
                console.log("Starting");
                await axios.post(`${this.myProxy}/api/users/add`, null, userLog)
                    .then((res) => {
                        if (res.data.error) {
                            console.log(res.data.error);
                            if(res.data.error==="User banned"){
                                this.logError = "Вы заблокированы";
                            }else{
                                this.logError = "Введите верное имя";
                            }
                            this.$emit('isLogOk', false);
                        } else {
                            console.log('all is ok');
                            console.log(res.data);
                            sessionStorage.setItem('user_id', res.data.id);
                            sessionStorage.setItem('user_email', res.data.email);
                            sessionStorage.setItem('user_name', res.data.name);
                            sessionStorage.setItem('user_status',res.data.status);
                            this.checkAuth();
                        }
                    })
            }
        } else {
            this.logError = 'Введите имя!';
        }
    },

},
        computed:{
            ...mapState({
                mainColor:state=>state.styleForUser.mainColor,
                mainTextColor:state=>state.styleForUser.mainTextColor,
            })
        }
    }
</script>

<style  scoped>
    @import "LogChat.css";
</style>