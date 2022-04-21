<template>
<div class="main_block">

                    <div class="inbox_people">
                        <admin-clients-header
                           @messOpen="openClients"
                           @close="toClose"
                           @status="changeStatus"
                        />
                        <admin-clients-list v-if="clientOpen"
                          @openMessage="openMessages"
                          :chosenStatus="chosenStatus"
                          :newLastMessage="lastMessageToUpdate"
                          :newClient="addNewUser"
                          :endDialogUserId="userIdEndDialog"
                        />
                    </div>

                    <div class="inbox_messages" :style="{display: (isMessageOpen)?db:dn}">
                         <admin-messages
                            :chosenStatus="chosenStatus"
                            :userId="messagesUserId"
                            :sendMessage="lastMessageToUpdate"
                            @endDialog="endDialog"
                          />
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
                                        },
                                        openMessages(user_id) {
                                            this.messagesUserId = user_id;
                                            this.isMessageOpen = true;
                                        },
                                        updateClientList(mess) {
                                            this.lastMessageToUpdate = mess;
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
                                    }
                                }
                            </script>
                            <style scoped>
                            @import "AdminChat.css";
                            </style>