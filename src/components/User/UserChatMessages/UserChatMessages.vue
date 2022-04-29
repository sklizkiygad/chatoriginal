<template>
    <section class="user-message-history" ref="chatter">
        <p v-if="isBanned">
            Вы заблокированы и не можете отправлять сообщения
        </p>

        <div v-else-if="!isBanned && isLoading"
             :style="`border-top: 16px solid ${bcol}`"
             class="user-message-history__loader">

        </div>

        <div    v-else
                v-for="content in messages"
                class="user-message-history__messages-list"
                :class="(content.role === 'User' ? 'current-user' : null)">
            <div class="user-message-history__messages-list__message-inner">
                <div class="user-message-history__messages-list__message-inner__username">{{content.name}}</div>
                <div
                        :style="(content.role === 'User' ? {backgroundColor:bcol}:'background-color: #F3F3F3;')"
                        class="user-message-history__messages-list__message-inner__content">
                    {{content.message}}
                    <div
                            v-if="content.file.length!==0"
                            v-for="(file, index) in content.file"
                            :key="file.id">
                        <a v-if="isImage(content.file[index].name)"
                           :href="getFiles(content.file[index].name)"
                           target="_blank">
                            <img  class="user-message-history__messages-list__message-inner__content__img"  :src="getFiles(content.file[index].name)">
                        </a>
                        <a v-else
                           :href="getFiles(content.file[index].name)"
                           class="user-message-history__messages-list__message-inner__content__links"
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
</template>

<script>
    import hostMixins from "@/mixins/hostMixins";
    import axios from "axios";

    export default {
        data(){
            return{
                isLoading:true,
                messages:[],
                isBanned:false,
            }
        },
        mixins:[hostMixins],
props:{
    bcol:{
        type:String,
        default:"#7B68EE"
    },
    newMessage:{
        type:Object,
        default: null
    }

},
        methods:{

            getFiles(name){
                const res = this.myProxy + '/api/file/' + name;
                return res;
            },
            checkStatus(){
                if(sessionStorage.getItem('user_status')==="Banned")
                {
                    this.isBanned=true;
                }
                else{
                    this.isBanned=false;
                }
            },

            async getMessages() {
                this.checkStatus();
                if(!this.isBanned){
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
                                this.isLoading=false;
                            }

                        })
                }

            },
            addNewMessage(){

                this.messages.push(this.newMessage);
            },

        },
        created() {
            this.getMessages();
        },
        watch: {
            newMessage(){
                this.addNewMessage();
            },
            messages: {
                handler(val, oldVal) {
                        setTimeout(this.scrollToEnd,200);
                },
                deep: true
            },
        }

    }
</script>

<style scoped>
@import "UserChatMessages.css";
</style>