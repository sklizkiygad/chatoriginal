<template>
    <header>
        <button
                class="header__buttons"
                @click="chiba"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" :fill="mainTextColor" class="bi bi-arrows-angle-contract" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M.172 15.828a.5.5 0 0 0 .707 0l4.096-4.096V14.5a.5.5 0 1 0 1 0v-3.975a.5.5 0 0 0-.5-.5H1.5a.5.5 0 0 0 0 1h2.768L.172 15.121a.5.5 0 0 0 0 .707zM15.828.172a.5.5 0 0 0-.707 0l-4.096 4.096V1.5a.5.5 0 1 0-1 0v3.975a.5.5 0 0 0 .5.5H14.5a.5.5 0 0 0 0-1h-2.768L15.828.879a.5.5 0 0 0 0-.707z"/>
        </svg>
        </button>
        <button
                class="logout"
                @click="logOutHeader"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" :fill="mainTextColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
            <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
        </svg>
        </button>
        <h1 :style="{color:mainTextColor}" class="header__greeting">
            Здравствуйте, {{username}}
        </h1>
    </header>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        data(){
            return{
                username: sessionStorage.getItem('user_name'),
            }

        },

        methods:{
            chiba() {
                this.$emit('collapse')
            },
            logOutHeader() {
                this.$emit('logOutUserChat');
            },
        },
        computed:{
            ...mapState({
                mainTextColor:state=>state.styleForUser.mainTextColor,
            })
        }


    }
</script>

<style scoped>
@import "UserChatHeader.css";
</style>