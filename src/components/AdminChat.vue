<template>


    <div>
        <div class="main_block">
            <div class="messaging">
                <div class="inbox_msg">
                    <div class="inbox_people">
                        <div class="headind_srch">
                            <div class="recent_heading">
                                <h4
                                        style="cursor: pointer; display: inline-block"
                                        @click="openClient"
                                >Клиенты
                                    <svg v-if="!clientOpen" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                         fill="currentColor" class="bi bi-caret-down-square" viewBox="0 0 16 16">
                                        <path d="M3.626 6.832A.5.5 0 0 1 4 6h8a.5.5 0 0 1 .374.832l-4 4.5a.5.5 0 0 1-.748 0l-4-4.5z"/>
                                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2z"/>
                                    </svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                         fill="currentColor" class="bi bi-caret-up-square" viewBox="0 0 16 16">
                                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                        <path d="M3.544 10.705A.5.5 0 0 0 4 11h8a.5.5 0 0 0 .374-.832l-4-4.5a.5.5 0 0 0-.748 0l-4 4.5a.5.5 0 0 0-.082.537z"/>
                                    </svg>
                                </h4>

                            </div>

                            <div class="srch_bar">
                                <h4
                                        @click="toClose"
                                        style="cursor: pointer">Выход</h4>
                                <div class="stylish-input-group" v-if="clientOpen">
                                    <input
                                            v-model="searchQuery"
                                            type="text" class="search-bar"
                                            placeholder="Поиск">
                                    <span class="input-group-addon">
                                         <button type="button"><i class="fa fa-search" aria-hidden="true"></i></button>
                                    </span>
                                </div>
                            </div>


                        </div>

                        <div v-if="clientOpen" class="status_list">
                            <ul>
                                <li @click.prevent="chsStatus = 1" :class="{'activeStatus':chsStatus===1}">Активные</li>
                                <li @click.prevent="chsStatus = 2" :class="{'activeStatus':chsStatus===2}">Законченные</li>
                                <li @click.prevent="chsStatus = 3" :class="{'activeStatus':chsStatus===3}">Бан</li>
                            </ul>

                        </div>

                        <div class="inbox_chat" :style="{display: (clientOpen)?db:dn}">

                            <div class="client_list">
                                <transition-group name="fade">
                                    <div
                                            class="chat_list" v-for="client in searchedList" :key="client.id"
                                            :class="client.id === chsAct ? 'active_chat':null"
                                            @click="getMessages(client.id)">
                                        <div class="chat_people">
                                            <div @click="endDialog(client.id)"
                                                 class="chat_img"
                                                 data-title="Закончить диалог">
                                                <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil">
                                            </div>
                                            <div class="chat_ib">
                                                <h5>{{client.name}}
                                                    <span class="chat_date">{{client.last_message.date}}</span>
                                                </h5>
                                                <p>{{client.last_message.message}}</p>
                                            </div>
                                        </div>
                                    </div>
                                </transition-group>
                            </div>


                            <div class="pagination" v-if="searchQuery===''">
                                <a v-if="clientPages>1">&laquo;</a>
                                <a
                                        v-for="n in clientPages"
                                        :class="{'active':(currentClientPage)===n}"
                                        @click.prevent="currentClientPage = n">{{n}}</a>
                                <a v-if="clientPages>1">&raquo;</a>
                            </div>
                            <div style="height: 50px;background-color: #333333;width: 100%"></div>
                        </div>


                    </div>
                    <div class="mesgs" :style="{display: (messageOpen)?'flex':dn}">
                        <div class="butt" v-if="chsStatus===1">
                            <button @click="endDialog(chsAct)">Закрыть диалог</button>
                            <button>Забанить пользователя</button>
                        </div>

                        <div class="msg_history" ref="chatter">
                            <div
                                    v-for="message in dialogMsgs"
                                    :class="message.status === 'Admin'? 'outgoing_msg':'incoming_msg'">
                                <div v-if="message.status !== 'Admin'" class="incoming_msg_img">
                                    <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil">
                                </div>
                                <div :class="message.status === 'Admin'? 'sent_msg':'received_msg'">
                                    <div :class="message.status === 'Admin'? 'sent_msg':'received_withd_msg'">
                                        <p>{{message.message}}</p>
                                        <span class="time_date"> {{message.date}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="type_msg">
                            <div class="input_msg_write">
<!--                                <input v-on:keyup.enter="sendMessage"-->
<!--                                       v-model="adminMsg"-->
<!--                                       type="text"-->
<!--                                       class="write_msg"-->
<!--                                       placeholder="Type a message"/>-->
                                <textarea
                                        v-model="adminMsg"
                                        class="write_msg"
                                        cols="30"
                                        rows="4"
                                        placeholder="Введите сообщение"/>
                                <button
                                        @click="sendMessage"
                                        class="msg_send_btn"
                                        type="button">
                                    <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import axios from "axios";
    import hostMixins from "@/mixins/hostMixins";

    export default {
        sockets: {
            connect: function () {
                console.log('socket connected');
            }
        },
        mixins: [hostMixins],
        data() {
            return {
                dn: 'none',
                db: 'flex',
                clientOpen: true,
                messageOpen: false,
                isClose: false,
                chsAct: null,
                clientDataList: [],
                chsStatus: 1,
                searchQuery: '',
                clientPages: 1,
                currentClientPage: 1,
                maxClientsPerPage: 10,
                adminMsg: '',
                dialogMsgs: []

            }
        },

        methods: {
            toClose() {
                this.$emit('close')
            },
            openClient() {
                if (window.innerWidth <= 640) {
                    this.clientOpen = !this.clientOpen;
                    this.messageOpen = false;
                } else {
                    this.clientOpen = true;
                }
            },
            setClass(event) {
                if (window.innerWidth <= 640) {
                    this.clientOpen = false;
                }
                this.messageOpen = true;
                this.chsAct = event;
            },
            paginationOut(numCli) {
                this.clientPages = Math.ceil(numCli / this.maxClientsPerPage);
                if (this.clientPages === 1) {
                    this.clientPages = 0;
                }
            },

            getClients() {
                try {
                    this.sockets.subscribe('admin_response', (data) => {
                        console.log(data);
                        if (data.new_chat) {
                            const newUser = {
                                id: data.user_id,
                                name: data.name,
                                status: "Actived",
                                role: "User",
                                date: data.date,
                                last_message: data
                            }
                            this.clientDataList.unshift(newUser);
                        }
                        for (let i = 0; i < this.clientDataList.length; i++) {
                            if (this.clientDataList[i].id == data.user_id) {
                                this.clientDataList[i].last_message = data;
                            }
                        }
                        const message = {
                            name: "User",
                            user_id: data.user_id,
                            message: data.message,
                            status: "User",
                            date: this.dateFocuses()
                        }
                        this.dialogMsgs.push(message);
                        setTimeout(this.scrollToEnd, 100);

                    });
                    this.apiCallClients();
                    this.paginationOut();

                } catch (e) {
                    alert('Проблемы с подключением');
                    console.log(e);
                }
            },
            async apiCallClients() {
                let response = null;
                this.clientDataList = [];
                const config = {
                    headers: {
                        Authorization: process.env.VUE_APP_TOKEN
                    },
                    params: {
                        limit: this.maxClientsPerPage,
                        page: this.currentClientPage,
                    }
                }
                switch (this.chsStatus) {
                    case 1: {
                        response = await axios.get(`${this.myProxy}/api/users/all/status?status=Actived`, config);
                        break;
                    }
                    case 2: {
                        response = await axios.get(`${this.myProxy}/api/users/all/status?status=Disabled`, config);
                        break;
                    }
                    case 3: {
                        response = await axios.get(`${this.myProxy}/api/users/all/status?status=Null`, config);
                        break;
                    }
                }
                for (let i = 0; i < response.data.length; i++) {
                    this.clientDataList.push(response.data.users[i]);
                }
                this.paginationOut(response.data.length);
            },
            sendMessage() {
                this.adminMsg = this.adminMsg.trim();
                if (this.adminMsg != null && this.adminMsg != '') {
                    const message = {
                        name: "Admin",
                        user_id: this.chsAct,
                        message: this.adminMsg,
                        status: "Admin",
                        date: this.dateFocuses()
                    }
                    console.log(message);
                    for (let i = 0; i < this.clientDataList.length; i++) {
                        if (this.clientDataList[i].id === message.user_id) {
                            this.clientDataList[i].last_message = message;
                        }
                    }
                    this.dialogMsgs.push(message);
                    this.$socket.emit('admin_send_message', message);
                    this.adminMsg = '';
                    console.log('Сообщение отправлено');

                } else {
                    alert("Введите сообщение");
                }
                setTimeout(this.scrollToEnd, 100);
            },
            async getMessages(user_id) {
                this.setClass(user_id);
                const sup = {
                    headers: {'Authorization': process.env.VUE_APP_TOKEN},
                    params: {
                        user_id: user_id
                    }
                }
                const response = await axios.get(`${this.myProxy}/api/users/messages`, sup);
                console.log(response.data);
                this.dialogMsgs = [];
                for (let i = 0; i < response.data.length; i++) {
                    this.dialogMsgs.push(response.data[i]);
                }
                setTimeout(this.scrollToEnd, 100);
            },

            async endDialog(user_id) {
                if (confirm("Вы уверены что хотите закончить диалог с пользователем?")) {
                    let dat = {
                        headers: {
                            Authorization: process.env.VUE_APP_TOKEN
                        },
                        params: {
                            status: 'Disabled',
                            id: user_id
                        }
                    }
                    await axios.post(`${this.myProxy}/api/users/new/status`, null, dat)
                        .then((res) => {
                            console.log(res);
                        })

                    for (let i = 0; i < this.clientDataList.length; i++) {
                        if (this.clientDataList[i].id === user_id) {
                            console.log(i);
                            this.clientDataList.splice(i, 1);
                        }
                    }
                }

            },
            scrollToEnd() {
                this.$refs.chatter.scrollTop = this.$refs.chatter.scrollHeight;
            },
            dateFocuses() {
                let now = new Date(),
                    year = now.getFullYear().toString(),
                    month = now.getMonth(),
                    day = now.getDate().toString(),
                    hour = now.getHours().toString(),
                    minute = now.getMinutes().toString();
                if (day < 10) day = '0' + day;
                if (month < 10) month = '0' + month.toString();
                const msgdate = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
                return msgdate;
            }
        },
        created() {
            this.getClients();
        },

        computed: {
            searchedList() {
                return [...this.clientDataList]
                // if(this.searchQuery===''){
                //
                //     return [...this.clientDataList].slice((this.maxClientsPerPage*(this.currentClientPage-1)),(this.maxClientsPerPage*this.currentClientPage))
                // }
                // else{
                //     return [...this.clientDataList]
                //         .filter(client=>client.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
                // }
            },

        },
        watch: {
            currentClientPage() {
                this.apiCallClients();

            },
            chsStatus() {
                this.apiCallClients();
                this.messageOpen = false
            }
        }
    }
</script>

<style scoped>

    .main_block {
        height: 100vh;
        width: 100vw;
        padding: 0;
        margin: 0;
    }

    img {
        max-width: 100%;
    }

    .inbox_people {
        background: #f8f8f8 none repeat scroll 0 0;
        float: left;
        overflow: hidden;
        width: 40%;
        border-right: 1px solid #c4c4c4;
        height: 100%;
    }

    .inbox_msg {
        background-color: aliceblue;
        clear: both;
        height: 100vh;
    }

    .top_spac {
        margin: 20px 0 0;
    }


    .recent_heading {
        float: left;
        width: 40%;
    }

    .srch_bar {
        display: inline-block;
        text-align: right;
        width: 60%;
        /*margin-left: 40%*/;
    }

    .headind_srch {
        padding: 10px 29px 10px 20px;
        overflow: hidden;
        border-bottom: 1px solid #c4c4c4;
    }

    .recent_heading h4 {
        color: #05728f;
        font-size: 21px;
        margin: auto;
    }

    .srch_bar input {
        border: 1px solid #cdcdcd;
        border-width: 0 0 1px 0;
        width: 80%;
        padding: 2px 0 4px 6px;
        background: none;
    }

    .srch_bar .input-group-addon button {
        background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
        border: medium none;
        padding: 0;
        color: #707070;
        font-size: 18px;
    }

    .srch_bar .input-group-addon {
        margin: 0 0 0 -27px;
    }

    .chat_ib h5 {
        font-size: 15px;
        color: #464646;
        margin: 0 0 8px 0;
    }

    .chat_ib h5 span {
        font-size: 13px;
        float: right;
    }

    .chat_ib p {
        font-size: 14px;
        color: #989898;
        margin: auto
    }

    .chat_img {
        float: left;
        width: 11%;
    }

    .chat_img:hover {
        filter: grayscale(100%);
        cursor: pointer;
    }

    .chat_img:hover::after {
        content: attr(data-title); /* Выводим текст */
        position: absolute; /* Абсолютное позиционирование */
        left: 0;
        right: 0;
        bottom: 5px; /* Положение подсказки */
        z-index: 1; /* Отображаем подсказку поверх других элементов */
        background: rgba(0, 42, 167, 0.6); /* Полупрозрачный цвет фона */
        color: #fff; /* Цвет текста */
        text-align: center; /* Выравнивание текста по центру */
        font-family: Arial, sans-serif; /* Гарнитура шрифта */
        font-size: 11px; /* Размер текста подсказки */
        padding: 5px 10px; /* Поля */
        border: 1px solid #333; /* Параметры рамки */
    }

    .chat_ib {
        float: left;
        padding: 0 0 0 15px;
        width: 88%;
    }

    .chat_people {
        overflow: hidden;
        clear: both;
        flex: 1;
    }

    .chat_list {
        border-bottom: 1px solid #c4c4c4;
        margin: 0;
        padding: 18px 16px 10px;
        display: flex;
    }

    .chat_list:hover {
        background-color: #ebebeb;
    }

    .inbox_chat {
        /*max-height:94% ;*/
        height: calc(100vh - 125px);
        overflow-y: auto;
        display: flex;
        flex-direction: column;


        position: relative;
    }

    .client_list {
        flex: 1;
    }

    .active_chat {
        background: #ebebeb;
    }


    .active h5 {
        color: white !important;
    }

    .incoming_msg {
        margin-top: 2%;
    }

    .incoming_msg_img {
        display: inline-block;
        width: 6%;
    }

    .received_msg {
        display: inline-block;
        padding: 0 0 0 10px;
        vertical-align: top;
        width: 92%;
        word-break: break-all;
    }

    .received_withd_msg p {
        background: #ebebeb none repeat scroll 0 0;
        border-radius: 3px;
        color: #646464;
        font-size: 14px;
        margin: 0;
        padding: 5px 10px 5px 12px;
        width: 100%;
    }

    .time_date {
        color: #747474;
        display: block;
        font-size: 12px;
        margin: 8px 0 0;
    }

    .received_withd_msg {
        width: 57%;
    }

    .mesgs {
        float: left;
        padding: 30px 15px 0 25px;
        width: 60%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .sent_msg p {
        background: #05728f none repeat scroll 0 0;
        border-radius: 3px;
        font-size: 14px;
        margin: 0;
        color: #fff;
        padding: 5px 10px 5px 12px;
        width: 100%;
    }

    .outgoing_msg {
        overflow: hidden;
        margin: 26px 15px 26px;
    }

    .sent_msg {
        float: right;

        word-break: break-all;
    }

    .input_msg_write input {
        background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
        border: medium none;
        color: #4c4c4c;
        font-size: 15px;
        min-height: 48px;
        width: 100%;
        outline: none;
    }

    .type_msg {
        border-top: 1px solid #c4c4c4;
        position: relative;
    }

    .msg_send_btn {
        background: #05728f none repeat scroll 0 0;
        border: medium none;
        border-radius: 50%;
        color: #fff;
        cursor: pointer;
        font-size: 17px;
        height: 33px;
        position: absolute;
        right: 0;
        top: 11px;
        width: 33px;
    }

    .msg_history {

        overflow-y: auto;
    }

    .search-bar {
        outline: none;

    }

    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
        transform: translateX(10px);
    }

    .status_list {

    }

    .butt {
        display: flex;
        margin: -30px -15px 0 -25px;
    }

    .butt button {
        background-color: #696969;
        border: none;
        color: white;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 15px;
        width: 50%;
        border-left: 1px solid #AAAAAA;
        cursor: pointer;

    }

    .status_list ul {
        display: flex;
        list-style-type: none;
    }

    .status_list ul > li {
        width: 100%;
        text-align: center;
        border-bottom: 1px solid #c4c4c4;
        border-left: 1px solid #c4c4c4;
        cursor: pointer;
    }

    .status_list ul > li:hover:not(.activeStatus) {
        background-color: #AAAAAA;
        color: white;
    }

    .activeStatus {
        background-color: #696969;
        color: white;
    }


    .pagination {
        display: inline-block;
    }

    .pagination a {
        color: black;
        float: left;
        padding: 8px 16px;
        text-decoration: none;
    }

    .pagination a.active {
        background-color: #696969;
        color: white;
    }

    .pagination a:hover:not(.active) {
        background-color: #ddd;
    }
    .write_msg{
        background: none;
        outline: none;
        border: none;
        width: 94%;
        resize: none;

    }


    @media (max-width: 640px) {
        .inbox_msg {
            display: flex;
            flex-direction: column;
            height: auto;
        }

        .mesgs {
            width: 100%;
            background-color: aliceblue;
        }

        .inbox_people {
            overflow: visible;
            width: 100%;
        }

        .inbox_chat {
            height: 100%;
            margin-top: 80px;

        }

        .headind_srch {
            position: fixed;
            width: 100%;
            background-color: #f8f8f8;
        }
    }
</style>