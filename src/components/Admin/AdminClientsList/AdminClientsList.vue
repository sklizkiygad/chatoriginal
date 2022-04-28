<template>
    <div class="inbox_chat">

        <div class="client_list">

            <transition-group   name="fade">

                <div v-if="isLoading" class="loaderAbs"></div>
                <div
                        v-else
                        class="chat_list" v-for="client in searchedList" :key="client.id"
                        :class="client.id === chsAct ? 'active_chat':null"
                        @click="chosenUser(client.id)">
                    <div class="chat_people">
                        <div @click="endDialog(client.id)"
                             class="chat_img">
                            <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil">
                        </div>
                        <div class="chat_ib">
                            <h5>{{client.name}}
                                <span class="chat_date">{{client.last_message.date.slice(0, -3)}}</span>
                            </h5>
                            <p v-if="client.last_message.message!=='' && client.last_message.message!==null">{{client.last_message.message}}</p>
                            <p v-else>[Вложение]</p>
                        </div>
                    </div>

                </div>
            </transition-group>

            <div class="observer" ref="observer"></div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import hostMixins from "@/mixins/hostMixins";


    export default {
        mixins: [hostMixins],
        data(){
            return{
                clientPages: 1,
                currentClientPage:0,
                maxClientsPerPage:10,
                clientDataList:[],
                chsAct:null,
                fullClientDataList:[],
                isLoading:true
            }
        },

        props:{
            chosenStatus:{
                type:Number,
                default:1
            },
            searchQuery:{
                type:String,
                default: ''
            },
            isMessageOpen:{
                type:Boolean,
                default:false
            },
            newLastMessage:{
                type:Object,
                default: {}
            },
            newClient:{
                type:Object,
                default:{}
            },
            endDialogUserId:{
                type:Number,
                default:null
            }
        },

        methods:{
            paginationOut(numCli) {
                console.log('Количество клиентов '+numCli);
                this.clientPages = Math.ceil(numCli / this.maxClientsPerPage);

            },

             chosenUser(user_id) {
                 this.chsAct=user_id;
                this.$emit('openMessage',user_id);
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

            addNewClient(data) {
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
                                if (this.clientDataList[i].id === data.user_id) {
                                    this.clientDataList[i].last_message = data;
                                }
                            }


            },



            async apiCallClients() {
                console.log('I am calling');
                this.clientDataList = [];
                this.fullClientDataList=[];
                const config = {
                    headers: {
                        Authorization: process.env.VUE_APP_TOKEN
                    },
                    // params: {
                    //     limit: this.maxClientsPerPage,
                    //     page: this.currentClientPage,
                    // }
                }
                let stat='';

                switch (this.chosenStatus) {
                    case 1: {
                        stat='Actived';
                        break;
                    }
                    case 2: {
                        stat='Disabled';
                        break;
                    }
                    case 3: {
                        stat='Banned';
                        break;
                    }
                }
                await axios.get(`${this.myProxy}/api/users/all/status?status=${stat}`, config).then((res)=>{
                    console.log(res);
                    this.paginationOut(res.data.length);
                    for (let i = 0; i < res.data.users.length; i++)
                    {
                        this.fullClientDataList.push(res.data.users[i]);
                    }

                    this.loadMoreClients();

                });
            },
            updateLastMessage(mess){
                for (let i = 0; i < this.clientDataList.length; i++) {
                    if (this.clientDataList[i].id == mess.user_id) {
                        this.clientDataList[i].last_message = mess;
                    }
                }
                this.sortClientListByDate();
            },
            sortClientListByDate(){

                    this.clientDataList.sort((a,b)=>Date.parse(b.last_message.date)-Date.parse(a.last_message.date))
            },
            loadMoreClients(){
                console.log('яродился');
                const beginIteration=this.clientDataList.length;
                let maxIteration=this.clientDataList.length+this.maxClientsPerPage;


                if(this.fullClientDataList.length-beginIteration<this.maxClientsPerPage) {
                    maxIteration=beginIteration+(this.fullClientDataList.length-beginIteration);
                }

                    for (let i = beginIteration; i < maxIteration; i++)
                    {
                        this.clientDataList.push(this.fullClientDataList[i]);
                    }
                this.isLoading=false;
                }

            },


        mounted() {
            this.apiCallClients();

            const options={
                rootMargin:'0px',
                threshold:0
            }


            const callback=(entries,observer)=>{
                if(entries[0].isIntersecting){
                    this.loadMoreClients();
                }
            }
            const observer = new IntersectionObserver(callback,options);
            observer.observe(this.$refs.observer);
        },

        watch:{
            chosenStatus(){
                this.currentClientPage=1;
                this.apiCallClients();
            },
            currentClientPage(){
                    this.apiCallClients();
            },
            newLastMessage(lastMes){
                this.updateLastMessage(lastMes);
            },
            newClient(userData){
                this.addNewClient(userData);
            },
            endDialogUserId(userId){
                for (let i = 0; i < this.clientDataList.length; i++) {
                    if (this.clientDataList[i].id === userId) {
                        console.log(i);
                        this.clientDataList.splice(i, 1);
                    }
                }
            }

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

    }

</script>

<style scoped>
@import "AdminClientsList.css";
</style>