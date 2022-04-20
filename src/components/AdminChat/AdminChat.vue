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
                          :chsStatus="chsStatus"
                          :newLastMessage="update_last_mess"
                          :newClient="addNewUser"
                          :endDialogUserId="end_dialog_user_id"
                        />
                    </div>

                    <div class="inbox_messages" :style="{display: (isMessageOpen)?db:dn}">
                         <admin-messages
                            :chsStatus="chsStatus"
                            :userId="messages_user_id"
                            :sendMessage="update_last_mess"
                            @endDialog="endDialog"
                          />
                         <admin-write-message
                             @updateLastMessage="updateClientList"
                             :chsAct="messages_user_id"/>
                    </div>


</div>
</template>

                            <script>
                                import axios from "axios";
                                import hostMixins from "@/mixins/hostMixins";
                                import AdminClientsHeader from "@/components/AdminClientsHeader/AdminClientsHeader";
                                import AdminClientsList from "@/components/AdminClientsList/AdminClientsList";
                                import AdminMessages from "@/components/AdminMessages/AdminMessages";
                                import AdminWriteMessage from "@/components/AdminWriteMessage/AdminWriteMessage";

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
                                            chsStatus: 1,
                                            update_last_mess: null,
                                            messages_user_id: null,
                                            addNewUser: null,
                                            end_dialog_user_id: null,
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
                                            this.chsStatus = stat;
                                        },
                                        openMessages(user_id) {
                                            this.messages_user_id = user_id;
                                            this.isMessageOpen = true;
                                        },
                                        updateClientList(mess) {
                                            this.update_last_mess = mess;
                                        },

                                        messageResponse() {
                                            try {
                                                this.sockets.subscribe('admin_response', (data) => {
                                                    if (data.new_chat) {
                                                        this.addNewUser = data;
                                                    } else {
                                                        this.update_last_mess = data;
                                                        this.newMessage = data;
                                                    }
                                                });
                                            } catch (e) {
                                                alert('Проблемы с подключением');
                                                console.log(e);
                                            }
                                        },
                                        endDialog(user_id) {
                                            this.end_dialog_user_id = user_id;
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