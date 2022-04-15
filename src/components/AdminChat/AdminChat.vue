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
                                                 class="chat_img">
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
                                        <img
                                                v-if="message.file.length!==0"
                                                v-for="(file, index) in message.file"
                                                :key="file.id"
                                                :src="getFiles(message.file[index].name)"
                                                style="height: 150px"/>

                                        <span class="time_date"> {{message.date}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="type_msg">

                            <div class="input_msg_write">
                                <textarea
                                        @keypress.enter="sendMessage"
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
                                <label  class="file_uploader" for="file"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" class="bi bi-file-earmark-arrow-down" viewBox="0 -4 10 20">
                                    <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z"/>
                                    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                                </svg></label>
                                    <input style="display: none" type="file" id="file" v-on:change="handleFileUpload" ref="file" />
                                <div style="display: flex;flex-wrap: wrap"
                                        >
                                    <div style="display: flex;flex-direction: column"
                                            v-if="files.length>0"
                                            v-for="file in files">

                                        <img :src="file.fileURL" alt="1" style="height: 100px;width: 100px;object-fit: cover;margin-right: 5px ">



                                        <p style="font-size: 12px">{{file.file.name}}</p>
                                    </div>
                                </div>






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
                dialogMsgs: [],
                files:[],
                objectURL:''
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
                            date: this.dateFocuses(),
                        }
                        this.dialogMsgs.push(message);
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

                    response.data.users[i].last_message.date=response.data.users[i].last_message.date.slice(0, -3);
                    this.clientDataList.push(response.data.users[i]);
                }
                this.paginationOut(response.data.length);
            },
            sendMessage() {
if (this.files !== [])
{
    let fileArr=[];
    this.files.forEach((file)=>{
        fileArr.push(file.name);
    })
    this.adminMsg = this.adminMsg.trim();

        let message = {
            name: "Admin",
            user_id: this.chsAct,
            message: this.adminMsg,
            status: "Admin",
            date: this.dateFocuses(),
            file:fileArr
        }
        console.log(message);
        for (let i = 0; i < this.clientDataList.length; i++) {
            if (this.clientDataList[i].id === message.user_id) {
                this.clientDataList[i].last_message = message;
            }
        }
        this.$socket.emit('admin_send_message', message);

            message = {
                name: "Admin",
                user_id: this.chsAct,
                message: this.adminMsg,
                status: "Admin",
                date: this.dateFocuses(),
                file:this.files
            }

        console.log(message);
        this.dialogMsgs.push(message);
        this.adminMsg = '';
        this.files=[];
        console.log('Сообщение отправлено');

}
else{
    this.adminMsg = this.adminMsg.trim();
    if (this.adminMsg != null && this.adminMsg != '') {
        let message = {
            name: "Admin",
            user_id: this.chsAct,
            message: this.adminMsg,
            status: "Admin",
            date: this.dateFocuses(),
            file:null
        }
        console.log(message);
        for (let i = 0; i < this.clientDataList.length; i++) {
            if (this.clientDataList[i].id === message.user_id) {
                this.clientDataList[i].last_message = message;
            }
        }
        this.$socket.emit('admin_send_message', message);
        console.log(message);
        this.dialogMsgs.push(message);
        this.adminMsg = '';
        this.files=[];
        console.log('Сообщение отправлено');

    } else {
        alert("Введите сообщение");
    }

}


            },


            async handleFileUpload(){
                let formData = new FormData();
                formData.append('file', this.$refs.file.files[0]);
                console.log(this.$refs.file.files[0]);


                await axios.post(`${this.myProxy}/api/file/upload`,formData,{
                    headers:{
                        'Content-type':'multipart/form-data'
                    }
                }).then((ans)=>{
                    console.log(ans);
                    console.log("Успешно отправлен файл");
                    let pushFile={
                        name:ans.data,
                        file:formData,
                        fileURL:window.URL.createObjectURL(this.$refs.file.files[0])
                    }
                    this.files.push(pushFile);
                }).catch((e)=>{
                    console.log(e);
                })
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
                    response.data[i].date=response.data[i].date.slice(0,-3);
                    this.dialogMsgs.push(response.data[i]);
                }

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
            },
             getFiles(name){
                const res = this.myProxy + '/api/file/' + name;
                return res;
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
            },
            chsAct(){
                this.files=[];
            },

            dialogMsgs: {
                handler(val, oldVal) {
                    setTimeout(this.scrollToEnd,200);
                },
                deep: true
            }

        }
    }
</script>

<style scoped>
@import "AdminChat.css";
</style>