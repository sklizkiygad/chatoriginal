<template>
    <div class="headind_srch">
        <div class="recent_heading">
            <h4 @click="visClients">Клиенты
                <svg v-if="!clientOpen" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                     fill="currentColor" class="bi bi-caret-down-square" viewBox="0 0 16 16">
                    <path d="M3.626 6.832A.5.5 0 0 1 4 6h8a.5.5 0 0 1 .374.832l-4 4.5a.5.5 0 0 1-.748 0l-4-4.5z"/>
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2z"/>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                     fill="currentColor" class="bi bi-caret-up-square" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path d="M3.544 10.705A.5.5 0 0 0 4 11h8a.5.5 0 0 0 .374-.832l-4-4.5a.5.5 0 0 0-.748 0l-4 4.5a.5.5 0 0 0-.082.537z"/>
                </svg>
            </h4>
        </div>

        <div class="srch_bar">
            <h4
                    @click="toClose"
            >Выход</h4>
            <div class="stylish-input-group" v-if="clientOpen">
                <input
                        v-model="searchQuery"
                        type="text"
                        class="search-bar"
                        placeholder="Поиск">
                <span class="input-group-addon">
                                         <button type="button"><i class="fa fa-search" aria-hidden="true"></i></button>
                                    </span>
            </div>
        </div>
    </div>
    <div v-if="clientOpen" class="status_list">
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
        }
    },
    methods:{
        toClose() {
            this.$emit("close");
        },
        visClients() {
                this.clientOpen = !this.clientOpen;
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