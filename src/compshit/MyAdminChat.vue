<template>

    <transition name="fade">
        <div class="lowbe" @click="chiba" v-if="!isHigh">
            <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-right-circle-fill" viewBox="0 0 16 16">
                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm5.904-2.803a.5.5 0 1 0-.707.707L9.293 10H6.525a.5.5 0 0 0 0 1H10.5a.5.5 0 0 0 .5-.5V6.525a.5.5 0 0 0-1 0v2.768L5.904 5.197z"/>
            </svg>Click me</p>
        </div>
        <div v-else>
            <div class="view login" v-if="!(isIn && isLogIn)">
                <button class="cloi" @click="isHigh=false">Close</button>
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
                                type="submit"
                                value="Login" />
                        <p>{{logError}}</p>
                    </div>
                </form>
            </div>
            <div class="view chat" v-else>
                <aside>
                    <transition name="fade">
                    <div class="list_menu" v-if="clientList">

                        <div class="head_clients" @click="clientList=false">
                            <h1 ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-box-arrow-in-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"/>
                                <path fill-rule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                            </svg></h1>
                            <h1>Clients list:</h1>
                        </div>
                        <div class="list_clients" >
                            <ul >
                                <li v-for="n in 50"><a >"Heat" id:{{n}}</a></li>
                            </ul>
                        </div>
                    </div>
                    </transition>
                </aside>
                <header>

                    <button class="cloi full" @click="clientList=true"> <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                        <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                    </svg></button>

                    <button class="cloi" @click="isHigh=false">Close</button>
                    <button class="logout" @click="logOut">Logout</button>
                    <h1>Welcome, {{this.username}}</h1>
                </header>

                <section class="chat-box">
                    <div
                            v-for="content in messages"
                            :class="(userId == content.userid ? 'message current-user' : 'message')"
                    >
                        <!--                    >-->

                        <!--                <div class="message-inner ">-->
                        <!--                    <div class="username">biba</div>-->
                        <!--                    <div class="content">i am biba</div>-->
                        <!--                </div>-->

                        <div class="message-inner ">
                            <div class="username">{{content.username}}</div>
                            <div class="content">{{content.content}}</div>
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
                                type="submit"
                                value="Send"
                        />
                    </form>
                </footer>
            </div>

        </div>
    </transition>


</template>



<script>
    export default {

        data(){
            return{
                connection:null,
                username:null,
                messages:[],
                userMessage:null,
                isHigh:false,
                logError:null,
                isLogIn:false,
                isIn:false,
                userId:null,
                clientList:false
            }
        },
        methods:{

            chiba(){
                this.isHigh=!this.isHigh;
            },
            async logIn(){
                if(this.username !=null && this.username !=' ')
                {
                    if(this.username.length>10)
                    {
                        this.logError='Слишком длинное имя';
                    }
                    else{
                        this.logError=null;
                        this.isLogIn=true;
                        console.log("Starting");

                        // this.connection = new WebSocket("ws://localhost:5000");
                        this.connection = new WebSocket("ws://31.28.9.200:23765");

                        this.userId=Date.now();
                        this.connection.onopen =  () => {
                            console.log("Подключение установлено");
                            this.isIn=true;
                            /* console.log(this.connection);*/
                        }
                        this.connection.onmessage = (event)=> {
                            console.log('Сообщение получено');
                            const message =JSON.parse(event.data);
                            const newMessage={
                                id:message.id,
                                username:message.username,
                                content:message.content,
                                userid:message.userid

                            }
                            this.messages.push(newMessage);
                            /* console.log(message);*/
                        }
                        this.connection.onclose = function (event) {
                            console.log(event);
                            console.log('Подключение закрылось');
                            this.isIn=false;
                            this.userId=null;
                        }
                        this.connection.onerror = function (event) {
                            console.log(event);
                            console.log('Произошла ошибОЧКА');
                            this.isIn=false;
                        }
                    }
                }
                else{
                    this.logError='Введите имя!';
                }

            },

            sendMessage(){

                if(this.userMessage !=null )
                {
                    const message={
                        event:'message',
                        username:this.username,
                        id:Date.now(),
                        content:this.userMessage,
                        userid:this.userId
                    }
                    this.connection.send(JSON.stringify(message));
                    /*console.log(message);*/
                    this.userMessage='';
                    console.log('Сообщение отправлено');

                }
                else{
                    alert("Введите сообщение");
                }

            },
            logOut(){
                this.isLogIn=false;
                this.connection.close();




            }

        },

    }
</script>

<style lang="scss" scoped>
    * {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
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
        justify-content: center;
        background-color: #ea526f;
        position: fixed;
        height: 60%;
        right: 0;
        bottom: 0;
        min-height: 380px;


        &.login {
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


            position: static;
            height: 100vh;
            width: 100vw;
            right: 0;
            bottom: 0;
            min-height: 380px;

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
                            background-color: #F3F3F3;
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
                                background-color: #ea526f;
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
                background-color: #ea526f;
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
        left: 60px;
        appearance: none;
        border: none;
        outline: none;
        background: none;
        color: #FFF;
        font-size: 18px;
        margin-bottom: 10px;
        text-align: left;
        cursor: pointer;
    }
    .full{

        top: 10px ;
        left: 15px;

    }

    .list_menu{
        display: none;
        background-color: whitesmoke;
        position: absolute;
        display: flex;
        flex-direction: column;
        width: 25%;
        min-width: 200px;
        height: 100vh;
        z-index: 2;
        border-radius: 20px;
        border: 1px solid darkslategrey;


    }

    .head_clients{
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 2%;
        cursor: pointer;
        background-color: #ea526f;
        border-radius: 20px;

    }
.list_clients{
    text-align: center;
    overflow-y: scroll;
    overflow-x: auto;

}
    .list_clients::-webkit-scrollbar {
        width: 1em;

    }
    .list_clients::-webkit-scrollbar-track {
        -webkit-box-shadow: none;
    }

    .list_clients::-webkit-scrollbar-thumb {
        background-color: dimgrey;
        border-radius: 15px;

    }
    .list_clients>ul li>a{
        font-size: 25px;
        cursor: pointer;
    }
    .list_clients>ul li:hover{
       background-color: #888888;
    }

</style>