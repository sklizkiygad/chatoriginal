<template>
    <div class="view login"
         :style="{backgroundColor:bcol}">
        <header>
            <button
                    class="cloi"
                    @click="this.$emit('collapse')">Скрыть
                <svg xmlns="http://www.w3.org/2000/svg"
                     width="16"
                     height="16"
                     fill="currentColor"
                     class="bi bi-x-octagon-fill"
                     viewBox="0 0 16 16">
                    <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                </svg>
            </button>
        </header>
        <form class="login-form"
              @submit.prevent="logIn">
            <div class="form-inner">
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
                        :style="{backgroundColor:bcol}"
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


    export default {
        data() {
            return {
                username: null,
                logError: null,
                isIn: false,
                userId: null,
                email: null
            }
        },
        mixins: [hostMixins],
        props:{
            bcol:{
                type:String,
                default:"#7B68EE"
            }

        },

methods:{
    checkAuth() {
        if (sessionStorage.getItem('user_id') !== 'undefined' && sessionStorage.getItem('user_id') !== null) {
            this.username = sessionStorage.getItem('user_name');
            this.$emit('isLogOk', true);
        } else {
            this.$emit('isLogOk', false);
        }
    },
    async logIn() {
        if (this.email != null || this.username != null) {
            this.username = this.username.trim();
            if (!this.username || this.username.length > 15 || this.username.length < 2) {
                this.logError = 'Введите верное имя';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.email)) {
                this.logError = 'Wrong email!';
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
                            this.logError = "Введите верное имя";
                            this.$emit('isLogOk', false);
                        } else {
                            console.log('all is ok');
                            console.log(res.data);
                            sessionStorage.setItem('user_id', res.data.id);
                            sessionStorage.setItem('user_email', res.data.email);
                            sessionStorage.setItem('user_name', res.data.name);
                            this.checkAuth();
                        }
                    })
            }
        } else {
            this.logError = 'Введите имя!';
        }
    },

}
    }
</script>

<style lang="scss" scoped>
    @import "./LogChat.scss";
</style>