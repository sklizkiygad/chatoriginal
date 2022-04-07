<template>
    <div class="base" v-if="!isIn">
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
    <AdminChat v-else
               @close="adminClose"


    ></AdminChat>
</template>

<script>
    import AdminChat from "@/components/AdminChat";
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
                // if (this.adminname != null  && this.password != null && this.adminname!=""  &&this.password!="") {
                //     this.adminname = this.adminname.trim();
                //
                //
                //     console.log("Starting");
                //
                //
                //          const adminLog={
                //          name:this.adminname,
                //          password:this.password};
                //      // const adminLog={
                //      //     name:'admin',
                //      //     password:'sHq1U4oua8yZYAFqCFi4mRfmxB3vjp1sjvfAuxVM8hPywkHXG1QD77oguhwXMMPojF1mzy'};
                //
                //     try{
                //         const response=await axios.put(`${this.myProxy}/admin/login`,{},{params:adminLog});
                //         console.log(response.data);
                //         sessionStorage.setItem('is_auth', response.data.auth.toString());
                //         if(!response.data.auth){
                //             this.errorAuth='Неверный логин или пароль!';
                //         }
                //         sessionStorage.setItem('user',JSON.stringify(response.data.user));
                //         this.checkAuth();
                //
                //     }
                //        catch(e){
                //            this.errorAuth='Неверный логин или пароль!';
                //        }
                //
                // } else {
                //     alert('Введите имя и пароль!');
                // }
                if (this.adminname != null && this.password != null && this.adminname != "" && this.password != "") {
                    this.adminname = this.adminname.trim();
                    console.log("Starting");
                    const adminLog = {
                        name: this.adminname,
                        password: this.password
                    };
                    // const adminLog={
                    //     name:'admin',
                    //     password:'sHq1U4oua8yZYAFqCFi4mRfmxB3vjp1sjvfAuxVM8hPywkHXG1QD77oguhwXMMPojF1mzy'};

                    try {
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

                        // sessionStorage.setItem('is_auth', response.data.auth.toString());
                        // if(!response.data.auth){
                        //     this.errorAuth='Неверный логин или пароль!';
                        // }
                        // sessionStorage.setItem('user',JSON.stringify(response.data.user));
                        // this.checkAuth();

                    } catch (e) {
                        this.errorAuth = 'Неверный логин или пароль!';
                    }

                } else {
                    alert('Введите имя и пароль!');
                }
            },
            adminClose() {

                this.$socket.disconnect();
                sessionStorage.clear();
                this.checkAuth();
                this.adminname = null;
                this.password = null;
            },
            checkAuth() {

                if (sessionStorage.getItem('is_auth') === 'true') {
                    this.isIn = true;
                } else {
                    this.isIn = false;
                }
            }

        },
        mounted() {
            this.checkAuth();
        }
    }


</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700');
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/css/font-awesome.min.css');

    .base {
        height: 100vh;
        background: rgb(52, 56, 61);

    }

    * {
        font-family: 'Open Sans', 'sans-serif', 'FontAwesome';
    }

    body {
        background: rgb(52, 56, 61);
    }

    #zaga {
        color: rgb(255, 255, 255);
        margin: 0px auto 0;
        width: 200px;
        text-align: center;
    }

    p {
        margin-bottom: 0;
    }

    #wrapper {
        position: absolute;
        width: 320px;
        left: 50%;
        margin-left: -160px;
        top: 50%;
        margin-top: -75px;
    }

    /* === Sign in Form === */
    #signin {
        height: 90px;
        width: 300px;
        border-radius: 8px;
        position: relative;
    }

    #signin::before {
        display: block;
        position: relative;
        height: 2px;
        background: rgb(52, 56, 61);
        content: '';
        top: 44px;
        margin-left: 20px;
        z-index: 1;
    }

    #signin input:first-of-type {
        border-top-right-radius: 8px;
        border-top-left-radius: 8px;
    }

    #signin input:last-of-type {
        border-bottom-right-radius: 8px;
        border-bottom-left-radius: 8px;
    }

    #signin input[type="text"], #signin input[type="password"], #signin button[type="submit"] {
        background: rgb(28, 30, 33);
        box-shadow: inset -100px -100px 0 rgb(28, 30, 33); /*Prevent yellow autofill color*/
        color: rgb(52, 56, 61);
    }

    #signin input[type="text"], #signin input[type="password"] {
        position: relative;
        display: block;
        width: 280px;
        height: 45px;
        border: 0;
        outline: 0;
        top: -2px;
        padding: 0 0 0 20px;
        font-weight: 700;
    }

    #signin input[type="text"]:focus, #signin input[type="password"]:focus {
        color: rgb(255, 255, 255);
    }

    #signin button[type="submit"] {
        display: block;
        position: absolute;
        width: 52px;
        height: 52px;
        color: rgb(52, 56, 61);
        border-radius: 50px;
        outline: 0;
        z-index: 2;
        top: 19px;
        right: -24px;
        border: 6px solid rgb(52, 56, 61);
        font-size: 25px;
        text-indent: 0px;
        padding-left: 9px;
        padding-bottom: 3px;
        text-align: center;
    }

    #signin button[type="submit"]:hover {
        color: rgb(0, 126, 165);
        text-shadow: 0 0 10px rgb(0, 126, 165);
        cursor: pointer;
    }

    #signin p {
        color: rgb(79, 85, 97);
        padding: 0 20px;
        font-weight: 700;
        font-size: 12px;
        margin: 5px 0 0 0;
    }

    #signin p > a {
        color: rgb(111, 119, 135);
        text-decoration: none;
    }

    #signin p > a:hover {
        border-bottom: 1px solid;
    }
</style>