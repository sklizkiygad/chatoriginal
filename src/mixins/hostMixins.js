
export default {
    data() {
        return {
           //myProxy: 'http://31.28.9.200:23765',
            myProxy:process.env.VUE_APP_PROXY,
        }
    },
    methods:{
        dateFocuses() {
            let now = new Date(),
                year = now.getFullYear().toString(),
                month = now.getMonth(),
                day = now.getDate().toString(),
                hour = now.getHours().toString(),
                minute = now.getMinutes().toString();
            if (day < 10) day = '0' + day;
            if (month < 10) month = '0' + month.toString();
            const msgdate = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
            return msgdate;
        },
        userResponce() {
            this.$socket.emit('connected', {id: sessionStorage.getItem('user_id')});
            this.sockets.subscribe('user_response', (data) => {
                if(data.error){
                    console.log(data);
                    alert('Проблемы с серваком')
                }
                else{
                    console.log('Сообщение получено');
                    let fileArray=[];
                    for(let i=0;i<data.file.length;i++){
                        fileArray.push({
                            "name": data.file[i]
                        })
                    }
                    const newMessage = {
                        name: 'Admin',
                        message: data.message,
                        role: 'Admin',
                        file:fileArray
                    }
                    console.log(newMessage);
                    //this.messages.push(newMessage);
                    this.myNewMessage=newMessage;
                    this.playAudio();
                }
            });
        },
        async playAudio(){
            let audi=new Audio("https://song.nazvonok.ru/song/a9ba/ultra-sms-korotkiy-futuristichnyy-zvuchok.mp3?id=26328");
            await audi.play();
        },
        scrollToEnd() {
            this.$refs.chatter.scrollTop = this.$refs.chatter.scrollHeight;
        },

    }
}