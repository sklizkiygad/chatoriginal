<template>
    <div class="clients-header">
        <div class="clients-header__topic">
            <h4 @click="visClients">Клиенты

                <svg v-if="!clientOpen" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
                    <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                    <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                </svg>

            </h4>
            <h4 @click="toClose">Выход</h4>
        </div>

        <div class="clients-header__seach-bar">
                <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Поиск">
                <span class="clients-header__input-group-addon">
                <button type="button"><i class="fa fa-search" aria-hidden="true"></i></button>
                </span>
        </div>

    </div>

    <div class="status_list">
        <ul>
            <li @click.prevent="chosenStatus = 1" :class="{'activeStatus':chosenStatus===1}">Активные</li>
            <li @click.prevent="chosenStatus = 2" :class="{'activeStatus':chosenStatus===2}">Законченные</li>
            <li @click.prevent="chosenStatus = 3" :class="{'activeStatus':chosenStatus===3}">Бан</li>
        </ul>
    </div>

</template>

<script>
export default {
    data(){
        return{
            clientOpen:true,
            searchQuery: '',
            chosenStatus:1,
            clientOpen:true,
        }
    },
    methods:{
        toClose() {
            this.$emit("close");
        },
        visClients() {
            this.clientOpen=!this.clientOpen;
            this.$emit("messOpen",this.clientOpen);
        },
    },
    watch:{
        chosenStatus(){
            this.$emit("status",this.chosenStatus);
        }

    }

}
</script>

<style scoped>
@import "AdminClientsHeader.css";
</style>