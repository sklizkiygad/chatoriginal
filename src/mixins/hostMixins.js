
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
                month = now.getMonth()+1,
                day = now.getDate().toString(),
                hour = now.getHours().toString(),
                minute = now.getMinutes().toString(),
            second=now.getSeconds().toString();

            if (day < 10) day = '0' + day;
            if (month < 10) month = '0' + month.toString();
            if (hour < 10) hour= '0' + hour;
            if (minute < 10) minute= '0' + minute;
            if (second < 10) second= '0' + second;


            const msgdate = year + '-' + month + '-' + day + ' ' + hour + ':' + minute+':'+second;
            return msgdate;
        },
        isImage(name){
            if(name!==null){
                if(name.substr(-4)==='.jpg'||name.substr(-4)==='.gif'||name.substr(-4)==='.png'||name.substr(-4)==='jpeg')
                {
                    return true;
                }
                else {
                    return false;
                }
            }
        },
        scrollToEnd() {
            this.$refs.chatter.scrollTop = this.$refs.chatter.scrollHeight;
        },


    }
}