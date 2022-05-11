<template>
    <div class="style-changer">

        <select v-if="sitesList.length>0" class="style-changer__site-select" @change="changeOption">
            <option v-for="site in sitesList" :value="site.id">{{site.name}}</option>
        </select>

        <div v-else><p>У вас еще нет добавленных сайтов. Добавьте адрес хоста своего сайта</p></div>
        <button class="style-changer__delete-btn" v-show="sitesList.length>0" @click="deleteSite">Удалить сайт</button>
        
        <div class="style-changer__site-creator">
            <form  @submit.prevent="sendUrlSite">
                <div class="style-changer__site-creator__input">
                    <div>
                        <label for="urlText">Адрес сайта: </label>
                        <input type="text" id="urlText" placeholder="https://site.org" v-model="siteUrl">
                    </div>
                    <div>
                        <label for="urlText">Название сайта: </label>
                        <input type="text" id="urlName" placeholder="site" v-model="siteName">
                    </div>



                </div>
                <button v-show="siteUrl!==''&&siteName!==''" type="submit">Добавить сайт</button>
            </form>

            
        </div>

        <form  @submit.prevent="sendStyle">

            <div class="style-changer__twin-blocks">

                <div>
                    <label for="mainColor">Основной цвет чата:</label>
                    <input id="mainColor"  v-model="mainColor" type="color" >
                </div>

                <div>
                    <label for="mainColor">Основной текст чата:</label>
                    <input id="mainTextColor"  v-model="mainTextColor" type="color">
                </div>


                <div>
                    <label for="adminMsgBackCol">Цвет сообщений админа:</label>
                    <input id="adminMsgBackCol"  v-model="adminMsgBackCol" type="color">
                </div>


                <div>
                    <label for="adminMsgFontCol">Цвет текста сообщений админа:</label>
                    <input id="adminMsgFontCol"  v-model="adminMsgFontCol" type="color">
                </div>

                <div>
                    <label for="usernameColor">Цвет имён:</label>
                    <input id="usernameColor"  v-model="usernameColor" type="color">
                </div>


                <div>
                     <label for="mainBackColor">Цвет фона сообщений:</label>
                     <input id="mainBackColor"  v-model="mainBackColor" type="color">
                </div>
            </div>





            <h4>Расположение на странице:</h4>
            <div class="style-changer__position-choose">
                <div>
                <label for="positionChatLeft">Слева</label>
                <input id="positionChatLeft"  value="left" type="radio"  v-model="chatPosition">
                </div>

                <div>
                 <label for="positionChatRight">Справа</label>
                <input id="positionChatRight"  value="right" type="radio" v-model="chatPosition">
                </div>
            </div>
            <button type="submit" v-if="currentSiteId!==null">Применить изменения</button>
        </form>
        <div class="style-changer__links">
            <a href="https://github.com/sklizkiygad/chatPlugin" target="_blank">Скачать файлы чата</a>
            <p>Для того чтобы чат заработал на сайте надо вставить этот скрипт перед закрывающимся тегом &#60;&#92;body&#62;</p>
            <p> &#60;script src="./plugin/chat/startingScript.js"&#62;&#60;&#92;script&#62; </p>
        </div>
    </div>
    <admin-user-chat-style
            :chatColor="mainColor"
            :adminMsgBackground="adminMsgBackCol"
            :adminMsgFont="adminMsgFontCol"
            :usernameColor="usernameColor"
            :chatPosition="chatPosition"
            :chatBackgroundColor="mainBackColor"
            :mainTextColor="mainTextColor"
    />
</template>

<script>
    import AdminUserChatStyle from "@/components/Admin/AdminUserChatStyle/AdminUserChatStyle";
    import axios from 'axios';
    import hostMixins from "@/mixins/hostMixins";

    export default {
        data(){
          return{
              mainColor:'#7B68EE',
              mainBackColor:'#ffffff',
              chatPosition:'right',
              adminMsgBackCol:'#F3F3F3',
              adminMsgFontCol:'#000000',
              mainTextColor:'#ffffff',
              usernameColor: '#888888',
              sitesList:[],
              currentSiteId:null,
              settingsList:[],
              siteUrl:'',
              siteName:'',
          }
        },
        components:{
            AdminUserChatStyle
        },
        mixins:[hostMixins],
        methods:{
            async sendStyle(){

                let myStyleArray=[
                    this.mainColor,
                    this.mainTextColor,
                    this.adminMsgBackCol,
                    this.adminMsgFontCol,
                    this.usernameColor,
                    this.mainBackColor,
                    this.chatPosition,
                ],
                    isOk=true;
                for (let i=0;i<this.settingsList.length;i++)
                {
                    let sendStyleReq = {
                        headers: {
                            Authorization: process.env.VUE_APP_TOKEN
                        },
                        params: {
                            site_id: this.currentSiteId,
                            setting_id: this.settingsList[i].setting_id,
                            value:myStyleArray[i],
                        }
                    };

                    console.log(sendStyleReq);
                    await axios.post(`${this.myProxy}/settings/connect_site`,null,sendStyleReq).then((res)=>{
                        console.log(res);
                        isOk=true;
                    }).catch((e)=>{
                        console.log(e);
                        alert('Не удалось применить стили. Попробуйте позже');
                        isOk=false;
                    })
                }
                if(isOk){
                    alert('Изменения успешно применены');
                }
            },

            async getSites(){
                await axios.get(`${this.myProxy}/site/all`).then((res)=>{
                    this.sitesList=res.data;
                    if(this.sitesList.length>0){
                        this.currentSiteId=this.sitesList[0].id;
                    }
                    this.getSiteStyle();
                })
            },

            changeOption(event){
                this.settingsList=[];
                this.currentSiteId=event.target.value;
                this.getSiteStyle();
            },

             async getSiteStyle(){

                 let styleReq = {
                     headers: {
                         Authorization: process.env.VUE_APP_TOKEN
                     },
                     params: {
                         site_id: this.currentSiteId
                     }
                 };
                axios.get(`${this.myProxy}/settings/connect_site`,styleReq).then((res)=>{
                    for(let i=0;i<res.data.length;i++) {
                        this.settingsList.push({
                            setting_id:res.data[i].setting_id.id,
                            name:res.data[i].setting_id.name,
                            value:res.data[i].value
                        })
                    }
               if(this.settingsList.length>0){
                    this.mainColor=this.settingsList[0].value;
                    this.mainTextColor=this.settingsList[1].value;
                    this.adminMsgBackCol=this.settingsList[2].value;
                    this.adminMsgFontCol=this.settingsList[3].value;
                    this.usernameColor=this.settingsList[4].value;
                    this.mainBackColor=this.settingsList[5].value;
                    this.chatPosition=this.settingsList[6].value;
               }
                })
             },
            async addNewSiteSettings(newSiteId){
                let nullArray=[
                '#7B68EE',
                '#ffffff',
                '#F3F3F3',
                '#000000',
                '#888888',
                '#ffffff',
                'right',
                ],
                    isOk=true;
                for(let i=0;i<nullArray.length;i++){
                    let forNewSite={
                        headers:{
                            Authorization: process.env.VUE_APP_TOKEN
                        },
                        params:{
                            site_id:newSiteId,
                            setting_id:this.settingsList[i].setting_id,
                            value:nullArray[i]
                        }

                    }
                    await axios.post(`${this.myProxy}/settings/connect_site`,null,forNewSite).then((res)=>{
                        console.log(res);
                    }).catch((e)=>{
                        console.log(e);
                    })

                }
                if(!isOk){
                    alert('Ошибка при добавлении сайта');
                }
                else {
                    alert('Успешно добавлен сайт');
                }

            },
            async sendUrlSite(){
                const forUrl={
                    headers: {
                        Authorization: process.env.VUE_APP_TOKEN
                    },
                    params:{
                        url:this.siteUrl,
                        name:this.siteName
                    }
                };
                await axios.post(`${this.myProxy}/site/`,null,forUrl).then((res)=>{
                    console.log(res);
                    this.addNewSiteSettings(res.data.id);
                    this.getSites();
                }).catch((e)=>{
                    console.log(e);
                    alert('Не удалось добавить сайт');
                })
                this.siteUrl='';
                this.siteName='';

            },
           async deleteSite(){
                let parForDel={
                    headers:{
                        Authorization: process.env.VUE_APP_TOKEN
                    },
                    params:{
                        id:this.currentSiteId
                    }

                }
                await axios.delete(`${this.myProxy}/site/`,parForDel).then((res)=>{
                    console.log(res);
                    alert('Сайт удален');
                    this.getSites();

                }).catch((e)=>{
                    console.log(e);
                    alert('Ошибка удаления. Попробуйте позже')
                })
            }
        },

        mounted() {
            this.getSites();
        },
    }
</script>

<style scoped>
@import "AdminStyleChanger.css";
</style>