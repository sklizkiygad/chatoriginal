<template>
                    <div class="view chat"
                         :style="{backgroundColor:bcol}">
                        <header>
                            <button
                                    class="cloi"
                                    @click="chiba"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrows-angle-contract" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M.172 15.828a.5.5 0 0 0 .707 0l4.096-4.096V14.5a.5.5 0 1 0 1 0v-3.975a.5.5 0 0 0-.5-.5H1.5a.5.5 0 0 0 0 1h2.768L.172 15.121a.5.5 0 0 0 0 .707zM15.828.172a.5.5 0 0 0-.707 0l-4.096 4.096V1.5a.5.5 0 1 0-1 0v3.975a.5.5 0 0 0 .5.5H14.5a.5.5 0 0 0 0-1h-2.768L15.828.879a.5.5 0 0 0 0-.707z"/>
                            </svg>
                            </button>
                            <button
                                    class="logout"
                                    @click="logOut"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                                <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                            </svg>
                            </button>
                            <h1 style="max-width: 250px;overflow: hidden;font-size: 110%;text-align: center">
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
                                            class="content">
                                        {{content.message}}

                                        <div
                                                v-if="content.file.length!==0"
                                                v-for="(file, index) in content.file"
                                                :key="file.id"
                                        >
                                            <a v-if="isImage(content.file[index].name)"  :href="getFiles(content.file[index].name)" target="_blank"> <img  style="margin-bottom: 5px" :src="getFiles(content.file[index].name)">
                                            </a>

                                                 <a v-else
                                                    :href="getFiles(content.file[index].name)"
                                                    style="display: block;color:black"
                                                    target="_blank"
                                                    >
                                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-arrow-down" viewBox="0 0 16 16">
                                                         <path fill-rule="evenodd" d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708l2 2z"/>
                                                         <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
                                                     </svg>
                                                     {{content.file[index].name}}
                                                 </a>



                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>


                        <footer>
                            <form @submit.prevent="sendMessage">
                                <textarea
                                        ref="inpMes"
                                        @keyup.enter="sendMessage"
                                        v-model="userMessage"
                                        rows="2"
                                        cols="4"
                                        placeholder="Написать сообщение..."/>
                                <div style="width: 50px">
                                    <label :style="{backgroundColor:bcol}" for="subBut"><svg style="width: 100%" xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                    </svg></label>
                                <input
                                        style="display: none"
                                        type="submit"
                                        id="subBut"
                                        value='Отпр.'
                                />
                                    <label :style="{backgroundColor:bcol}" for="fileUp"><svg style="width: 100%" xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="currentColor" class="bi bi-folder-symlink" viewBox="0 0 16 16">
                                        <path d="m11.798 8.271-3.182 1.97c-.27.166-.616-.036-.616-.372V9.1s-2.571-.3-4 2.4c.571-4.8 3.143-4.8 4-4.8v-.769c0-.336.346-.538.616-.371l3.182 1.969c.27.166.27.576 0 .742z"/>
                                        <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm.694 2.09A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09l-.636 7a1 1 0 0 1-.996.91H2.826a1 1 0 0 1-.995-.91l-.637-7zM6.172 2a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z"/>
                                    </svg></label>
                                <input
                                        ref="file"
                                        v-on:change="handleFileUpload"
                                        style="display: none"
                                        id="fileUp"
                                        type="file"
                                />
                                </div>

                            </form>
                            <div style="display: flex;flex-direction: column"
                                 v-if="files.length>0"
                                 v-for="file in files">

                                <!--                                        <img :src="file.fileURL" alt="1" style="height: 100px;width: 100px;object-fit: cover;margin-right: 5px ">-->
                                <p style="font-size: 12px">{{file.name}}&ensp;</p>
                            </div>
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
                email: null,
                files: []

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
            },

        },
        methods:{
            chiba() {
                this.$emit('collapse')
            },
            sendMessage() {
                console.log(this.files.length);
                if (this.files.length>0)
                {
                    console.log('files');
                    let fileArr=[];
                    this.files.forEach((file)=>{
                        fileArr.push(file.name);
                    })
                    if(this.userMessage !==null){
                        this.userMessage= this.userMessage.trim();
                    }

                    let message = {
                        name: sessionStorage.getItem('user_name'),
                        user_id: sessionStorage.getItem('user_id'),
                        message: this.userMessage,
                        status: "User",
                        date: this.dateFocuses(),
                        file:fileArr
                    }
                    console.log(message);
                    this.$socket.emit('user_message', message);

                    message = {
                        name: sessionStorage.getItem('user_name'),
                        user_id: sessionStorage.getItem('user_id'),
                        message: this.userMessage,
                        status: "User",
                        role: "User",
                        date: this.dateFocuses(),
                        file:this.files
                    }
                    console.log(message);

                    console.log(message);
                    this.messages.push(message);
                    this.userMessage = '';
                    this.files=[];
                    console.log('Сообщение отправлено');

                }
                else{
                    console.log('without files');
                    if (this.userMessage !== null){
                        this.userMessage = this.userMessage.trim();
                    }

                    if (this.userMessage !== null && this.userMessage !== '') {
                        let message = {
                            name: sessionStorage.getItem('user_name'),
                            user_id: sessionStorage.getItem('user_id'),
                            message: this.userMessage,
                            status: "User",
                            role: "User",
                            date: this.dateFocuses(),
                            file:[]
                        }
                        console.log(message);
                        this.$socket.emit('user_message', message);
                        console.log(message);
                        this.messages.push(message);
                        this.userMessage = '';
                        this.files=[];
                        console.log('Сообщение отправлено');
                    } else {
                        alert("Введите сообщение");
                    }

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
                                    role: ((res.data[i].status) === 'Admin' ? 'Admin' : 'User'),
                                    file: res.data[i].file
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
            getFiles(name){
                    const res = this.myProxy + '/api/file/' + name;
                    return res;
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
            isImage(name){
                if(name!==null){
                        if(name.substr(-4)==='.jpg'||name.substr(-4)==='.gif'||name.substr(-4)==='.png')
                        {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
            }

        },
        mounted() {
            this.checkAuth();
        },
        watch: {
            messages: {
                handler(val, oldVal) {
                    if(this.isHigh){
                        setTimeout(this.scrollToEnd,200);
                    }

                },
                deep: true
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "./UserChat.scss";
</style>