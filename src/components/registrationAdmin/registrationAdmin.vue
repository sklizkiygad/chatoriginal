<template>
    <div class="base">
        <h1 id="zaga">Admin registration</h1>
        <div id="wrapper">
            <form id="signin" @submit.prevent="logIn" autocomplete="off">
                <input v-model="adminname" type="text" id="user" name="user" placeholder="username"/>
                <input v-model="password" type="password" id="pass" name="pass" placeholder="password"/>
                <button type="submit">&#xf0da;</button>
            </form>
            <p style="color: #FFFFFF">{{errorAuth}}</p>
        </div>
    </div>

</template>

<script>
    import AdminChat from "@/components/AdminChat/AdminChat";
    import axios from "axios";
    import hostMixins from "@/mixins/hostMixins";

    export default {
        mixins: [hostMixins],
        components: {
            AdminChat
        },
        data() {
            return {
                adminname: null,
                password: null,
                adminId: null,
                isIn: null,
                connection: null,
                errorAuth: null
            }
        },
        methods: {
            async logIn() {
                if (this.adminname != null && this.password != null && this.adminname != "" && this.password != "") {
                    this.adminname = this.adminname.trim();
                    console.log("Starting");
                    const adminLog = {
                        name: this.adminname,
                        password: this.password
                    };
                    // const adminLog = {
                    //   name: 'admin'
                    //     password: 'sHq1U4oua8yZYAFqCFi4mRfmxB3vjp1sjvfAuxVM8hPywkHXG1QD77oguhwXMMPojF1mzy'
                    // };
                    await axios.put(`${this.myProxy}/admin/login`, {}, {params: adminLog})
                        .then((res) => {
                            console.log(res);
                            if (res.data.error) {
                                this.errorAuth = 'Неверный логин или пароль!';
                            } else {
                                sessionStorage.setItem('is_auth', res.data.auth.toString());
                                sessionStorage.setItem('user', JSON.stringify(res.data.user));
                                this.checkAuth();
                            }
                        })
                } else {
                    alert('Введите имя и пароль!');
                }
            },

            checkAuth() {
                    this.$emit('auth')
                }


        },
        mounted() {
            this.checkAuth();
        }
    }


</script>

<style scoped>
@import "registrationAdmin.css";
</style>