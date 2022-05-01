<template>
<div class="messenger">

                    <div class="messenger__clients" v-if="clientOpen">
                        <admin-clients-header
                           @messOpen="openClients"
                           @close="toClose"
                           @status="changeStatus"
                           @updateSearchQuery="searchRequest"/>

                        <admin-clients-list
                          @openMessage="openMessages"
                          :chosenStatus="chosenStatus"
                          :newLastMessage="lastMessageToUpdate"
                          :newClient="addNewUser"
                          :endDialogUserId="userIdEndDialog"
                          :searchText="searchQueryText"/>
                    </div>

                    <div class="messenger__clients-collapse" v-else @click="clientOpen=!clientOpen">
                         <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-chevron-double-right" viewBox="0 0 16 16">
                         <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
                         <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </div>

                    <div class="all-collapse" v-if="!(clientOpen || isMessageOpen)">
                        <h1>
                        <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" fill="currentColor" class="bi bi-caret-left" viewBox="0 0 16 16">
                         <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
                        </svg>Выберите пользователя чтобы начать с ним диалог
                        </h1>
                    </div>


                    <div class="messenger__messages" :style="{display: (isMessageOpen)?db:dn}">
                         <admin-messages
                            :chosenStatus="chosenStatus"
                            :userId="messagesUserId"
                            :sendMessage="lastMessageToUpdate"
                            @endDialog="endDialog"/>

                         <admin-write-message
                             @updateLastMessage="updateClientList"
                             :chsAct="messagesUserId"/>
                    </div>


</div>
</template>

                            <script>
                                import hostMixins from "@/mixins/hostMixins";
                                import AdminClientsHeader from "@/components/Admin/AdminClientsHeader/AdminClientsHeader";
                                import AdminClientsList from "@/components/Admin/AdminClientsList/AdminClientsList";
                                import AdminMessages from "@/components/Admin/AdminMessages/AdminMessages";
                                import AdminWriteMessage from "@/components/Admin/AdminWriteMessage/AdminWriteMessage";

                                export default {
                                    components: {
                                        AdminClientsHeader,
                                        AdminClientsList,
                                        AdminMessages,
                                        AdminWriteMessage
                                    },
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
                                            chosenStatus: 1,
                                            lastMessageToUpdate: null,
                                            messagesUserId: null,
                                            addNewUser: null,
                                            userIdEndDialog: null,
                                            newMessage: null,
                                            isMessageOpen: false,
                                            searchQueryText:''
                                        }
                                    },

                                    methods: {
                                        openClients(val) {
                                            this.clientOpen = val;
                                        },
                                        toClose() {
                                            this.$emit('close')
                                        },
                                        changeStatus(stat) {
                                            this.chosenStatus = stat;
                                            this.isMessageOpen=false;
                                        },
                                        openMessages(user_id) {
                                            this.messagesUserId = user_id;
                                            this.isMessageOpen = true;
                                        },
                                        updateClientList(mess) {
                                            this.lastMessageToUpdate = mess;
                                        },
                                        searchRequest(tex){
                                            this.searchQueryText=tex;
                                        },

                                        messageResponse() {
                                            try {
                                                this.sockets.subscribe('admin_response', (data) => {
                                                    if (data.new_chat) {
                                                        this.addNewUser = data;
                                                    } else {
                                                        this.lastMessageToUpdate = data;
                                                        this.newMessage = data;
                                                    }
                                                });
                                            } catch (e) {
                                                alert('Проблемы с подключением');
                                                console.log(e);
                                            }
                                        },
                                        endDialog(user_id) {
                                            this.userIdEndDialog = user_id;
                                        },
                                    },
                                    created() {
                                        this.messageResponse();
                                    },

                                }
                            </script>
                            <style scoped>
                            @import "AdminChat.css";
                            </style>