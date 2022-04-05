<template>
    <div>


        <button @click="clickButton">click</button>
        <h1>{{inside}}</h1>
        <h2>{{msg}}</h2>
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
                console.log(this.$socket);
                // $socket is socket.io-client instance
                /*this.$socket.emit('message', 'something')*/


            },


        },

        created() {
            // this.$socket.on('message_response', (data) => {
            //     this.messages.push(data);
            // })
           /* this.sockets.subscribe('message_response', (data) => {
                this.msg = data.message;
            });*/

            //this.sockets.unsubscribe('EVENT_NAME');
            // this.$socket.on('message_response', (data) => {
            //     this.messages.push(data);
            // })
        }


    }
</script>

<style scoped>

</style>