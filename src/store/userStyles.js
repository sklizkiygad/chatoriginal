import axios from "axios";

export const userStyles={
    state:()=>({
        mainColor:'#7B68EE',
        mainTextColor:'#ffffff',
        adminMsgBackCol:'#F3F3F3',
        adminMsgFontCol:'#000000',
        usernameColor: '#888888',
        mainBackColor:'#ffffff',
        currentSiteId:null,
        settingsList:[],
        chatPosition:'right'
    }),

    mutations:{
        setmainColor(state,color){
            state.mainColor=color;
        },
        setmainTextColor(state,color){
            state.ainTextColor=color;
        },
        setadminMsgBackCol(state,color){
            state.adminMsgBackCol=color;
        },
        setadminMsgFontCol(state,color){
            state.adminMsgFontCol=color;
        },
        setusernameColor(state,color){
            state.usernameColor=color;
        },
        setmainBackColor(state,color){
            state.mainBackColor=color;
        },
        setcurrentSiteId(state,site_id){
            state.currentSiteId=site_id;
        },
        pushSettingList(state,sett){
            state.settingsList.push(sett);
        },

    },

    actions:{

        async getUserStyle({state,commit}){
            let styleReq = {
                headers: {
                    Authorization: process.env.VUE_APP_TOKEN
                },
                params: {
                    site_id: state.currentSiteId
                }
            };
            await axios.get(`${process.env.VUE_APP_PROXY}/settings/connect_site`,styleReq).then((res)=>{
                for(let i=0;i<res.data.length;i++) {
                            commit('pushSettingList',{
                                setting_id:res.data[i].setting_id.id,
                                name:res.data[i].setting_id.name,
                                value:res.data[i].value});
                            }

                if(state.settingsList.length>0){
                                commit('setmainColor',state.settingsList[0].value);
                                commit('setmainTextColor',state.settingsList[1].value);
                                commit('setadminMsgBackCol',state.settingsList[2].value);
                                commit('setadminMsgFontCol',state.settingsList[3].value);
                                commit('setusernameColor',state.settingsList[4].value);
                                commit('setmainBackColor',state.settingsList[5].value);
                                localStorage.setItem('chatPosition',state.settingsList[6].value);
                            }
            }).catch((e)=>{
                console.log(e);
            });



        },

        async getSiteId({state,dispatch,commit},siteHost){
            const forRes={
                params:{ url:`http://${siteHost}`}

            }
            await axios.get(`${process.env.VUE_APP_PROXY}/site/`,forRes).then((res)=>{
                state.currentSiteId=res.data.id;
                dispatch('getUserStyle');
            }).catch((e)=>{
                console.log(e);
            })

        }


    },
    namespaced:true
}