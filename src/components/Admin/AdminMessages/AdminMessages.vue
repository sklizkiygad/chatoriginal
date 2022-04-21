<template>
    <div class="butt" v-if="chosenStatus===1">
        <button @click="endDialog">Закрыть диалог</button>
        <button @click="banUser">Забанить пользователя</button>
    </div>
    <div class="msg_history" ref="chatter">
        <div v-if="isLoading" class="loader"></div>
        <div v-else
                v-for="message in dialogMsgs"
                :class="message.status === 'Admin'? 'outgoing_msg':'incoming_msg'">
            <div v-if="message.status !== 'Admin'" class="incoming_msg_img">
                <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil">
            </div>
            <div :class="message.status === 'Admin'? 'sent_msg':'received_msg'">
                <div :class="message.status === 'Admin'? 'sent_msg':'received_withd_msg'">
                    <p>{{message.message}}
                        <span v-if="message.file.length!==0" class="message_inner_file">
                          <div
                             v-for="(file, index) in message.file"
                             :key="file.id">
                                     <a
                                       v-if="isImage(message.file[index].name)"
                                       :href="getFiles(message.file[index].name)"
                                       target="_blank">
                                          <img :src="getFiles(message.file[index].name)"/>
                                     </a>
                                     <a v-else
                                       :href="getFiles(message.file[index].name)"
                                       target="_blank">
                                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-arrow-down" viewBox="0 0 16 16">
                                            <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z"/>
                                            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                                          </svg>{{message.file[index].name}} <br>
                                     </a>
                          </div>
                        </span>
                    </p>
                    <span class="time_date"> {{message.date}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import hostMixins from "@/mixins/hostMixins";

    export default {
        mixins: [hostMixins],
        data() {
            return {
                dialogMsgs: [],
                isLoading:true,
            }
        },
        props: {
            chosenStatus: {
                type: Number,
                default: 1
            },
            userId: {
                type: Number,
                default: null
            },
            sendMessage:{
                type:Object,
                default:{}

            }
        },
        methods: {

            async getMessages(user_id) {
                const sup = {
                    headers: {'Authorization': process.env.VUE_APP_TOKEN},
                    params: {
                        user_id: user_id
                    }
                }
                await axios.get(`${this.myProxy}/api/users/messages`, sup).then((response)=>{
                    console.log(response.data);
                    this.dialogMsgs = [];
                    for (let i = 0; i < response.data.length; i++) {
                        response.data[i].date = response.data[i].date.slice(0, -3);
                        this.dialogMsgs.push(response.data[i]);
                    }
                    this.isLoading=false;
                });
            },

            addMessage(getMess){
                console.log(getMess);
                let fileArr=[];
                let i=0;
                if(getMess.file.length>0) {
                   getMess.file.forEach((file) => {
                        fileArr.push({
                            id:i,
                            name:file
                        });
                       i++;
                    })
                }
                getMess.file=fileArr;
               this.dialogMsgs.push(getMess);
            },



            getFiles(name) {
                const res = this.myProxy + '/api/file/' + name;
                return res;
            },

            async endDialog() {
                if (confirm("Вы уверены что хотите закончить диалог с пользователем?")) {
                    let dat = {
                        headers: {
                            Authorization: process.env.VUE_APP_TOKEN
                        },
                        params: {
                            status: 'Disabled',
                            id: this.userId
                        }
                    }
                    await axios.post(`${this.myProxy}/api/users/new/status`, null, dat)
                        .then((res) => {
                            console.log(res);
                            this.$emit('endDialog',this.userId);
                        })
                }
            },
            async banUser() {
                if (confirm("Вы уверены что хотите заблокировать пользователем?")) {
                    let dat = {
                        headers: {
                            Authorization: process.env.VUE_APP_TOKEN
                        },
                        params: {
                            status: 'Banned',
                            id: this.userId
                        }
                    }
                    await axios.post(`${this.myProxy}/api/users/new/status`, null, dat)
                        .then((res) => {
                            console.log(res);
                            this.$emit('endDialog',this.userId);
                        })


                }
            },
        },


        watch: {
            userId(newid) {
                this.isLoading=true;
                this.getMessages(newid);
            },
            dialogMsgs: {
                handler(val, oldVal) {
                    setTimeout(this.scrollToEnd, 200);
                },
                deep: true
            },
            sendMessage(getMes){
                this.addMessage(getMes);
            }
        }
    }

</script>

<style scoped>
    @import "AdminMessages.css";
</style>