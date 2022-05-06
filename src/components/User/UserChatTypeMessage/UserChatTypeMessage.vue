<template>
    <footer>
        <form class="input-msg-form" @submit.prevent="sendMessage">
                                <textarea
                                        ref="inpMes"
                                        @keyup.enter="sendMessage"
                                        v-model="userMessage"
                                        rows="2"
                                        cols="4"
                                        placeholder="Написать сообщение..."/>
            <div class="input-msg-form__butt">
                <label :style="{backgroundColor:bcol}" for="subBut">
                  <svg  xmlns="http://www.w3.org/2000/svg" width="100%" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                  </svg>
                </label>
                <input
                        type="submit"
                        id="subBut"
                        value='Отпр.'
                />
                <label :style="{backgroundColor:bcol}" for="fileUp">
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="16" fill="currentColor" class="bi bi-folder-symlink" viewBox="0 0 16 16">
                    <path d="m11.798 8.271-3.182 1.97c-.27.166-.616-.036-.616-.372V9.1s-2.571-.3-4 2.4c.571-4.8 3.143-4.8 4-4.8v-.769c0-.336.346-.538.616-.371l3.182 1.969c.27.166.27.576 0 .742z"/>
                    <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm.694 2.09A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09l-.636 7a1 1 0 0 1-.996.91H2.826a1 1 0 0 1-.995-.91l-.637-7zM6.172 2a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z"/>
                  </svg>
                </label>
                <input
                        ref="file"
                        v-on:change="handleFileUpload"
                        id="fileUp"
                        type="file"
                />
            </div>

        </form>
        <div class="files-area"
             v-if="files.length>0"
             v-for="file in files">
            <p >{{file.name}}&ensp;</p>
        </div>
    </footer>
</template>

<script>
    import axios from "axios";
    import hostMixins from "@/mixins/hostMixins";

    export default {
        data(){
            return{
                files:[],
                userMessage:'',
            }
        },
        mixins:[hostMixins],
        methods:{
            sendMessage() {
                let fileArr=[];
                if(this.files.length>0) {
                    console.log('with files');
                    this.files.forEach((file) => {
                        fileArr.push(file.name);
                    })
                    if(this.userMessage!==''){
                        this.userMessage= this.userMessage.trim();
                    }
                }
                else{
                    fileArr=[];
                    if(this.userMessage==='' || this.userMessage==='\n'){
                        this.userMessage = '';
                        alert("Введите сообщение");
                        return
                    }
                }
                let message = {
                    name: sessionStorage.getItem('user_name'),
                    user_id: sessionStorage.getItem('user_id'),
                    message: this.userMessage,
                    status: "User",
                    role: "User",
                    date: this.dateFocuses(),
                    file:fileArr
                }
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
                this.$emit('sendMessage',message);
                this.userMessage = '';
                this.files=[];
                console.log('Сообщение отправлено');

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
        },
        props:{
            bcol:{
                type:String,
                default:"#7B68EE"
            },
        }

    }
</script>

<style scoped>
@import "UserChatTypeMessage.css";
</style>