<template>
    <div class="lowbe"
         :style="{backgroundColor:chatColor}"
         :class="chatPosition==='left' ? 'positionLeft':'positionRight'"
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
</template>

<script>
    export default {
        props:{
            chatColor:{
                type:String,
                default:'#7B68EE'
            },
            mainTextColor:{
                type:String,
                default:'#ffffff'
            },
            chatPosition:{
                type:String,
                default:'right'
            }
        }

    }
</script>

<style scoped>
@import "UserChatLow.css";
</style>