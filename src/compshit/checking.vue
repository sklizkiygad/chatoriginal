<template>
    <div>


        <button @click="clickButton">click</button>
        <div style="height: 500px;width: 500px;background-color: #ea526f;overflow-y: scroll" ref="sokl">
            lorem  ipsum lorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsum
            lorem  ipsum lorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsum
            lorem  ipsum lorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsum
            lorem  ipsum lorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsum
            lorem  ipsum lorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsum
            lorem  ipsum lorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsum
            lorem  ipsum lorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsum
            lorem  ipsum lorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsum
            lorem  ipsum lorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsum
            lorem  ipsum lorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsum
            lorem  ipsum lorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsum
            lorem  ipsum lorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsum
            lorem  ipsum lorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsum
            lorem  ipsum lorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsum
            lorem  ipsum lorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsum
            lorem  ipsum lorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsum
            lorem  ipsum lorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsum
            lorem  ipsum lorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsum
            lorem  ipsum lorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsum
            lorem  ipsum lorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsum
            lorem  ipsum lorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsumlorem  ipsum

        </div>
    </div>
</template>

<script>





    export default {
        data() {
            return {
                inside: 'null',
                socket:{},
                msg:null


            }
        },

        sockets: {
            connect: function () {
                console.log('socket connected');

            },

        },

        methods:{
            clickButton: function (data) {
                console.log(process.env.VUE_APP_TOKEN);
            },


        },

        created() {

        }


    }
</script>

<style scoped>

</style>