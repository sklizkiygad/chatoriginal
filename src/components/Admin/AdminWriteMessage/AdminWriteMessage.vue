<template>
        <div class="input-msg-write">
            <textarea
              @keyup.enter="sendMessage"
               v-model="adminMsg"
               class="input-msg-write__area"
               cols="30"
               rows="4"
                placeholder="Введите сообщение"/>
            <button
                    @click="sendMessage"
                    class="input-msg-write__send-btn"
                    type="button">
                <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
            </button>
            <label  class="input-msg-write__file-uploader" for="file"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" class="bi bi-file-earmark-arrow-down" viewBox="0 -4 10 20">
                <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z"/>
                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
            </svg></label>
            <input type="file" id="file" v-on:input="handleFileUpload" ref="file"  />
            <div clas="input-msg-write__file-button">
                <div v-if="files.length>0">
                    <div class="input-msg-write__files_list"
                         v-for="file in files">
                        <a :href="file.fileURL"  target="_blank">{{file.name}}&ensp;</a>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    import axios from "axios";
    import hostMixins from "@/mixins/hostMixins";

    export default {

        data(){
            return{
                adminMsg:'',
                files:[],
            }
        },
        props:{
            chsAct:{
                type:Number,
                default:null
            },
        },
        mixins:[hostMixins],

methods:{
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
    sendMessage() {
        let fileArr=[];
        if(this.files.length>0) {
            console.log('with files');
            this.files.forEach((file) => {
                fileArr.push(file.name);
            })
            if(this.adminMsg!==''){
                this.adminMsg=this.adminMsg.trim();
            }
        }
        else{
            fileArr=[];
            if(this.adminMsg==='' || this.adminMsg==='\n'){
                this.adminMsg = '';
                alert("Введите сообщение");
                return
            }
        }
        let message = {
            name: "Admin",
            user_id: this.chsAct,
            message: this.adminMsg,
            status: "Admin",
            date: this.dateFocuses(),
            file:fileArr
        }
        this.$socket.emit('admin_send_message', message);
        console.log(message);
        this.$emit('updateLastMessage',message);
        this.adminMsg = '';
        this.files=[];
        console.log('Сообщение отправлено');
    },
}
    }
</script>

<style scoped>
@import "AdminWriteMessage.css";
</style>