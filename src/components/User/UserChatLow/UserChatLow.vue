<template>
    <div class="lowbe"
         v-if="chatIconType==='default'"

         :style="{backgroundColor:mainColor}"
         @click="this.$emit('setLow')"
         >
        <p :style="{color:mainTextColor}">
            <svg xmlns="http://www.w3.org/2000/svg"
                 width="16"
                 height="16"
                 :fill="mainTextColor"
                 class="bi bi-arrow-down-right-circle-fill"
                 viewBox="0 0 16 16">
                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm5.904-2.803a.5.5 0 1 0-.707.707L9.293 10H6.525a.5.5 0 0 0 0 1H10.5a.5.5 0 0 0 .5-.5V6.525a.5.5 0 0 0-1 0v2.768L5.904 5.197z"/>
            </svg>
            Жмакни
        </p>
    </div>

    <div
         v-if="chatIconType==='circle'"
         class="lowbe-round"
         :style="{backgroundColor:mainColor}"
         @click="this.$emit('setLow')">

        <svg xmlns="http://www.w3.org/2000/svg"
             width="65%"
             height="65%"
             :fill="mainTextColor"
             class="bi bi-chat-dots"
             viewBox="0 0 16 16">
            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
            <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z"/>
        </svg>
    </div>

</template>

<script>
    import {mapState} from "vuex";
    export default {
        computed:{
            ...mapState({
                mainColor:state=>state.styleForUser.mainColor,
                mainTextColor:state=>state.styleForUser.mainTextColor,
                chatIconType:state=>state.styleForUser.chatIconType,
            })
        }
    }
</script>

<style scoped>
@import "UserChatLow.css";
</style>