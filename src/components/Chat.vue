<template>


    <div class="base">




    <transition name="fade" >
    <div  class="lowbe" :style="{backgroundColor:bcol}" @click="chiba" v-if="!isHigh">
        <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-right-circle-fill" viewBox="0 0 16 16">
            <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm5.904-2.803a.5.5 0 1 0-.707.707L9.293 10H6.525a.5.5 0 0 0 0 1H10.5a.5.5 0 0 0 .5-.5V6.525a.5.5 0 0 0-1 0v2.768L5.904 5.197z"/>
        </svg>Click me</p>
    </div>
    <div v-else>
    <div class="view login" v-if="!isIn" :style="{backgroundColor:bcol}">
        <header>
        <button class="cloi" @click="isHigh=false">Close <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-octagon-fill" viewBox="0 0 16 16">
            <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
        </svg></button>
        </header>
        <form class="login-form" @submit.prevent="logIn">
            <div class="form-inner">
                <h1>Login to Chat</h1>
                <label for="username">Username (max 9 symbols)</label>
                <input
                        id="username"
                        type="text"
                        v-model="username"
                        placeholder="Please enter your username..." />

                <input
                        id="email"
                        type="text"
                        v-model="email"
                        placeholder="Please enter your email" />
                <input
                        :style="{backgroundColor:bcol}"
                        type="submit"
                        value="Login" />
                <p>{{logError}}</p>
            </div>
        </form>
    </div>

    <div class="view chat" :style="{backgroundColor:bcol}" v-else>
        <header>
            <button class="cloi" @click="isHigh=false">Close</button>
            <button class="logout" @click="logOut">Logout</button>
            <h1 style="max-width: 200px;text-overflow: ellipsis;font-size: 150%">Welcome, {{username}}</h1>
        </header>
        <section class="chat-box" ref="chatter">
            <div
                 v-for="content in messages"

                 :class="(content.role === 'User' ? 'message current-user' : 'message')"
            >
<!--                    >-->

<!--                <div class="message-inner ">-->
<!--                    <div class="username">biba</div>-->
<!--                    <div class="content">i am biba</div>-->
<!--                </div>-->

                <div class="message-inner ">
                    <div class="username">{{content.name}}</div>
                    <div
                            :style="(content.role === 'User' ? {backgroundColor:bcol}:'background-color: #F3F3F3;')"
                            class="content">{{content.message}}</div>
                </div>

            </div>


        </section>

        <footer>
            <form @submit.prevent="sendMessage">
                <input
                        v-model="userMessage"
                        type="text"
                        placeholder="Write a message..." />
                <input
                        :style="{backgroundColor:bcol}"
                        type="submit"
                        value="Send"
                />
            </form>
        </footer>
    </div>

    </div>
    </transition>

    </div>
</template>



<script>

import hostMixins from "@/mixins/hostMixins";
import axios from 'axios';
export default {

    mixins:[hostMixins],
    data(){
        return{
            connection:null,
            username:null,
            messages:[],
            userMessage:null,
            isHigh:false,
            logError:null,
           // isLogIn:false,
            isIn:false,
            userId:null,
           /* userId:Date.now(),*/
            //bcol:"#ea526f",
            bcol:"#7B68EE",
            email:null
        }
    },
    sockets: {
        connect: function () {

            console.log('socket connected');


            /*this.$socket.emit('connected',JSON.stringify(80));*/
            //this.$socket.emit(JSON.stringify(this.userId));


        },

    },
    methods:{

        // sendLog(){
        //
        //     const logData={
        //         event:'login',
        //         username:this.username,
        //     }
        //     this.connection.send(JSON.stringify(logData));
        //     const response= axios.post(`${this.myProxy}/users/add?name=${this.username}`);
        //     this.isIn=true;
        // },
        chiba(){
            this.isHigh=!this.isHigh;
        },

         async logIn(){


            if(this.email !=null || this.username !=null)
            {
                this.username=this.username.trim();

             if(!this.username){
                this.logError='Введите имя';
            }
                else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.email))
                {
                    this.logError='Wrong email!';
                }



                else{
                this.logError=null;
                this.isIn=true;
                const userLog={
                    name:this.username,
                    email:this.email
                };

                    console.log("Starting");

                   const response = await axios.post(`${this.myProxy}/api/users/add`,{},{params:userLog});

                 sessionStorage.setItem('user_id',response.data.id);
                 this.userId=sessionStorage.getItem('user_id');
                   // const conn={
                   //     'id': this.userId
                   // }


                 this.$socket.emit('connected',{id: this.userId});




                   this.sockets.subscribe('user_response', (data) => {
                        console.log('Сообщение получено');


                       const newMessage={
                           name:'Admin',
                           message:data.message,
                           role:'Admin',
                       }

                       this.messages.push(newMessage);
                    });
                 }
            }
            else{
                this.logError='Введите имя!';
            }

         },

       sendMessage(){
           if(this.userMessage != null && this.userMessage !='')
            {
                let now = new Date(),
                    year=now.getFullYear().toString(),
                    month=now.getMonth().toString(),
                    day=now.getDate().toString(),
                    hour=now.getHours().toString(),
                    minute=now.getMinutes().toString();
                const msgdate=hour+':'+minute+'    |    '+day+'-'+month+'-'+year;

                this.userMessage=this.userMessage.trim();
                const message={
                    user_id:this.userId,
                    name:this.username,
                    message:this.userMessage,
                    date:msgdate,
                    role:'User',
                }
                this.messages.push(message);
                //this.connection.send(JSON.stringify(message));
                this.$socket.emit('user_message', message);
                this.userMessage='';
                console.log('Сообщение отправлено');


            }
            else{
                alert("Введите сообщение");
            }
       },
        logOut(){
            this.isIn=false;
            this.sockets.unsubscribe('message_response');
        },
        // checkAuth(){
        //     //console.log(sessionStorage.getItem('is_auth'));
        //     if(sessionStorage.getItem('is_auth')==='true' ){
        //         this.isIn=true;
        //
        //     }
        //     else{
        //         this.isIn=false;
        //
        //     }
        // }


    },

    // mounted(){
    //     this.checkAuth();
    // }




}
</script>

<style lang="scss">


    * {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

     .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter,.fade-leave-to {
        opacity: 0;
    }

    .lowbe{

        background-color: #ea526f;
        position: fixed;
        bottom:0;
        right: 0;
        min-width: 200px;
        width:15%;
        text-align: center;
        cursor:pointer;
        border-radius: 5px;


    }
    .lowbe p{
        color: #FFFFFF;
        font-size: 100%;
    }
    .view {
        display: flex;
        flex-direction: column;
        justify-content: center;

        background-color: #ea526f;
        position: fixed;
        height: 60%;
        right: 0;
        bottom: 0;
        min-height: 380px;


        &.login {
            header {
                /*position: relative;*/
                display: block;
                width: 100%;
                padding: 50px 30px 10px;
                .logout {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    appearance: none;
                    border: none;
                    outline: none;
                    background: none;

                    color: #FFF;
                    font-size: 18px;
                    margin-bottom: 10px;
                    text-align: right;
                }

                h1 {
                    color: #FFF;
                }
            }
            align-items: center;
            .login-form {
                display: block;
                width: 100%;
                padding: 15px;

                .form-inner {
                    display: block;
                    background-color: #FFF;
                    padding: 50px 15px;
                    border-radius: 16px;
                    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
                    h1 {
                        color: #AAA;
                        font-size: 28px;
                        margin-bottom: 30px;
                    }
                    label {
                        display: block;
                        margin-bottom: 5px;
                        color: #AAA;
                        font-size: 16px;
                        transition: 0.4s;
                    }
                    input[type="text"] {
                        appearance: none;
                        border: none;
                        outline: none;
                        background: none;
                        display: block;
                        width: 100%;
                        padding: 10px 15px;
                        border-radius: 8px;
                        margin-bottom: 15px;

                        color: #333;
                        font-size: 18px;
                        box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
                        background-color: #F3F3F3;
                        transition: 0.4s;
                        &::placeholder {
                            color: #888;
                            transition: 0.4s;
                        }
                    }
                    input[type="submit"] {
                        appearance: none;
                        border: none;
                        outline: none;
                        background: none;
                        display: block;
                        width: 100%;
                        padding: 10px 15px;
                        background-color: #ea526f;
                        border-radius: 8px;
                        color: #FFF;
                        font-size: 18px;
                        font-weight: 700;
                    }
                    &:focus-within {
                        label {
                            color: #ea526f;
                        }
                        input[type="text"] {
                            background-color: #FFF;
                            box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
                            &::placeholder {
                                color: #666;
                            }
                        }
                    }
                }
            }
        }
        &.chat {
            flex-direction: column;

            header {
                /*position: relative;*/
                display: block;
                width: 100%;
                padding: 50px 30px 10px;
                .logout {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    appearance: none;
                    border: none;
                    outline: none;
                    background: none;

                    color: #FFF;
                    font-size: 18px;
                    margin-bottom: 10px;
                    text-align: right;
                }

                h1 {
                    color: #FFF;
                }
            }

            .chat-box {
                border-radius: 24px 24px 0px 0px;
                background-color: #FFF;
                box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
                flex: 1 1 100%;
                padding: 30px;
                overflow-y: scroll;




                .message {
                    display: flex;
                    margin-bottom: 15px;


                    .message-inner {
                        .username {
                            color: #888;
                            font-size: 16px;
                            margin-bottom: 5px;
                            padding-left: 15px;
                            padding-right: 15px;
                        }
                        .content {
                            display: inline-block;
                            padding: 10px 20px;
                            /*background-color: #F3F3F3;*/
                            border-radius: 999px;
                            color: #333;
                            font-size: 18px;
                            line-height: 1.2em;
                            text-align: left;
                        }
                    }
                    &.current-user {
                        margin-top: 30px;
                        justify-content: flex-end;
                        text-align: right;
                        .message-inner {
                            max-width: 75%;
                            .content {
                                color: #FFF;
                                font-weight: 600;
                                /*background-color: #ea526f;*/
                            }
                        }
                    }
                }
            }
            .chat-box::-webkit-scrollbar {
                width: 1em;

            }

            .chat-box::-webkit-scrollbar-track {
                -webkit-box-shadow: none;
            }

            .chat-box::-webkit-scrollbar-thumb {

               /* background-color: #ea526f;*/
                background-color: #C0C0C0;
                border-radius: 15px;

            }
            footer {
                position: sticky;
                bottom: 0px;
                background-color: #FFF;
                padding: 30px;
                box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
                form {
                    display: flex;
                    input[type="text"] {
                        flex: 1 1 100%;
                        appearance: none;
                        border: none;
                        outline: none;
                        background: none;
                        display: block;
                        width: 100%;
                        padding: 10px 15px;
                        border-radius: 8px 0px 0px 8px;

                        color: #333;
                        font-size: 18px;
                        box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
                        background-color: #F3F3F3;
                        transition: 0.4s;
                        &::placeholder {
                            color: #888;
                            transition: 0.4s;
                        }
                    }

                    input[type="submit"] {
                        appearance: none;
                        border: none;
                        outline: none;
                        background: none;
                        display: block;
                        padding: 10px 15px;
                        border-radius: 0px 8px 8px 0px;
                        background-color: #ea526f;
                        color: #FFF;
                        font-size: 18px;
                        font-weight: 700;
                    }
                }
            }
        }
    }
    .cloi {
        position: absolute;
        top: 15px;
        left: 15px;
        appearance: none;
        border: none;
        outline: none;
        background: none;
        color: #FFF;
        /*color: #AAA;*/
        font-size: 18px;
        margin-bottom: 10px;
        text-align: left;
    }
    button,
    button:active,
    button:focus {
        outline: none;
        cursor: pointer;
    }

</style>