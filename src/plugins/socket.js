import VueSocketIO from 'vue-3-socket.io'


const babySocket = new VueSocketIO({
    debug: true,
    //connection: 'http://31.28.9.200:23765',
    connection: process.env.VUE_APP_PROXY,
})

export default babySocket;


