<template>

    <div>
        <div class="main_block">
            <div class="messaging">
                <div class="inbox_msg">
                    <div class="inbox_people">
                        <div class="headind_srch">
                            <div class="recent_heading">
                                <h4
                                 style="cursor: pointer; display: inline-block"
                                @click="openClient"
                                >Clients <svg v-if="!clientOpen" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-square" viewBox="0 0 16 16">
                                    <path d="M3.626 6.832A.5.5 0 0 1 4 6h8a.5.5 0 0 1 .374.832l-4 4.5a.5.5 0 0 1-.748 0l-4-4.5z"/>
                                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2z"/>
                                </svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-square" viewBox="0 0 16 16">
                                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                        <path d="M3.544 10.705A.5.5 0 0 0 4 11h8a.5.5 0 0 0 .374-.832l-4-4.5a.5.5 0 0 0-.748 0l-4 4.5a.5.5 0 0 0-.082.537z"/>
                                    </svg>
                                </h4>

                            </div>

<!--                            <div class="srch_bar">-->

<!--                                <div class="stylish-input-group">-->
<!--                                    <input type="text" class="search-bar"  placeholder="Search" >-->
<!--                                    <span class="input-group-addon">-->
<!--                <button type="button"> <i class="fa fa-search" aria-hidden="true"></i> </button>-->
<!--                </span> </div>-->
<!--                            </div>-->
                                                        <div class="srch_bar">
                                                       <h4
                                                               @click="toClose"
                                                               style="cursor: pointer">Exit</h4>
                                                            <div class="stylish-input-group" v-if="clientOpen">
                                                             <input

                                                                     type="text" class="search-bar"  placeholder="Search" >
                                                                                                    <span class="input-group-addon">
                                                                                <button type="button"> <i class="fa fa-search" aria-hidden="true"></i> </button>
                                                                                </span> </div>
                                                        </div>

                        </div>
                        <div class="inbox_chat" :style="{display: (clientOpen)?db:dn}" >
                            <div class="chat_list active_chat">
                                <div class="chat_people">
                                    <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                                    <div class="chat_ib">
                                        <h5>Sunil Rajput<span class="chat_date">Dec 25</span></h5>
                                        <p>Test, which is a new approach to have all solutions
                                            astrology under one roof.</p>
                                    </div>
                                </div>
                            </div>
<!--                            <div class="chat_list">-->
<!--                                <div class="chat_people">-->
<!--                                    <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>-->
<!--                                    <div class="chat_ib">-->
<!--                                        <h5>Sunil Rajput <span class="chat_date">Dec 25</span></h5>-->
<!--                                        <p>Test, which is a new approach to have all solutions-->
<!--                                            astrology under one roof.</p>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                            </div>-->
                            <div class="chat_list" v-for="n in 10" @click="messageOpen=true">
                                <div class="chat_people">
                                    <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                                    <div class="chat_ib">
                                        <h5>Sunil Rajput  id:{{n}} <span class="chat_date">Dec 25</span></h5>
                                        <p>Test, which is a new approach to have all solutions
                                            astrology under one roof.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="chat_list">
                                <div class="chat_people">
                                    <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                                    <div class="chat_ib">
                                        <h5>Sunil Rajput <span class="chat_date">Dec 25</span></h5>
                                        <p>Test, which is a new approach to have all solutions
                                            astrology under one roof.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="chat_list">
                                <div class="chat_people">
                                    <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                                    <div class="chat_ib">
                                        <h5>Sunil Rajput <span class="chat_date">Dec 25</span></h5>
                                        <p>Test, which is a new approach to have all solutions
                                            astrology under one roof.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="chat_list">
                                <div class="chat_people">
                                    <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                                    <div class="chat_ib">
                                        <h5>Sunil Rajput <span class="chat_date">Dec 25</span></h5>
                                        <p>Test, which is a new approach to have all solutions
                                            astrology under one roof.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="chat_list" @click="messageOpen=true">
                                <div class="chat_people">
                                    <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                                    <div class="chat_ib">
                                        <h5>Sunil Rajput <span class="chat_date">Dec 25</span></h5>
                                        <p>Test, which is a new approach to have all solutions
                                            astrology under one roof.</p>
                                    </div>
                                </div>
                            </div>
<!--                            <div style="width: 100%;height: 50px"></div>-->
                        </div>


                    </div>


                    <div class="mesgs" :style="{display: (messageOpen)?'flex':dn}">

<!--                        <div class="headind_srch"-->



<!--                             style="background-color: #f8f8f8; margin:-30px -15px 0 -25px;"-->
<!--                             :style="{display: (clientOpen)?dn:db}">-->
<!--                            <div class="recent_heading">-->
<!--                                <h4 @click="clientOpen=!clientOpen">Clients</h4>-->

<!--                            </div>-->


<!--                            <div class="srch_bar">-->
<!--                                <h4-->
<!--                                        @click="toClose"-->
<!--                                        style="cursor: pointer">Exit</h4>-->
<!--                            </div>-->



<!--                        </div>-->



                        <div class="msg_history">
                            <div class="incoming_msg">
                                <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                                <div class="received_msg">
                                    <div class="received_withd_msg">
                                        <p>Test which is a new approach to have all
                                            solutions</p>
                                        <span class="time_date"> 11:01 AM    |    June 9</span></div>
                                </div>
                            </div>
                            <div class="outgoing_msg">
                                <div class="sent_msg">
                                    <p>Test which is a new approach to have all
                                        solutions</p>
                                    <span class="time_date"> 11:01 AM    |    June 9</span> </div>
                            </div>
                            <div class="incoming_msg">
                                <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                                <div class="received_msg">
                                    <div class="received_withd_msg">
                                        <p>Test, which is a new approach to have</p>
                                        <span class="time_date"> 11:01 AM    |    Yesterday</span></div>
                                </div>
                            </div>
                            <div class="outgoing_msg">
                                <div class="sent_msg">
                                    <p>Apollo University, Delhi, India Test</p>
                                    <span class="time_date"> 11:01 AM    |    Today</span> </div>
                            </div>
                            <div class="incoming_msg">
                                <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                                <div class="received_msg">
                                    <div class="received_withd_msg">
                                        <p>We work directly with our designers and suppliers,
                                            and sell direct to you, which means quality, exclusive
                                            products, at a price anyone can afford.
                                            We work directly with our designers and suppliers,
                                            and sell direct to you, which means quality, exclusive
                                            products, at a price anyone can afford.
                                            We work directly with our designers and suppliers,
                                            and sell direct to you, which means quality, exclusive
                                            products, at a price anyone can afford.
                                            We work directly with our designers and suppliers,
                                            and sell direct to you, which means quality, exclusive
                                            products, at a price anyone can afford.</p>
                                        <span class="time_date"> 11:01 AM    |    Today</span></div>
                                </div>
                            </div>
                            <div class="incoming_msg">
                                <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                                <div class="received_msg">
                                    <div class="received_withd_msg">
                                        <p>We work directly with our designers and suppliers,
                                            and sell direct to you, which means quality, exclusive
                                            products, at a price anyone can afford.
                                            We work directly with our designers and suppliers,
                                            and sell direct to you, which means quality, exclusive
                                            products, at a price anyone can afford.
                                            We work directly with our designers and suppliers,
                                            and sell direct to you, which means quality, exclusive
                                            products, at a price anyone can afford.
                                            We work directly with our designers and suppliers,
                                            and sell direct to you, which means quality, exclusive
                                            products, at a price anyone can afford.</p>
                                        <span class="time_date"> 11:01 AM    |    Today</span></div>
                                </div>

                            </div>
                            <div class="incoming_msg">
                                <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                                <div class="received_msg">
                                    <div class="received_withd_msg">
                                        <p>We work directly with our designers and suppliers,
                                            and sell direct to you, which means quality, exclusive
                                            products, at a price anyone can afford.
                                            We work directly with our designers and suppliers,
                                            and sell direct to you, which means quality, exclusive
                                            products, at a price anyone can afford.
                                            We work directly with our designers and suppliers,
                                            and sell direct to you, which means quality, exclusive
                                            products, at a price anyone can afford.
                                            We work directly with our designers and suppliers,
                                            and sell direct to you, which means quality, exclusive
                                            products, at a price anyone can afford.</p>
                                        <span class="time_date"> 11:01 AM    |    Today</span></div>
                                </div>

                            </div>
                        </div>
                        <div class="type_msg">
                            <div class="input_msg_write">
                                <input type="text" class="write_msg" placeholder="Type a message" />
                                <button class="msg_send_btn" type="button"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                            </div>
                        </div>
                    </div>
                </div>




            </div></div>


    </div>
</template>

<script>

    export default {
        data(){
            return{
                dn:'none',
                db:'block',
                clientOpen:true,
                messageOpen:false,
                isClose:false,
                // searchQuery:''
            }
        },
        methods:{
            toClose(){
                this.isClose=true;
                this.$emit('exit',this.isClose);
            },
            openClient(){
                    this.clientOpen=!this.clientOpen;

            },
            // searchQuery(){
            //
            // }
        },


    }
</script >

<style scoped>

    .main_block{
        height: 100vh;
        width: 100vw;
        padding: 0;
        margin: 0;



        /*max-width:1170px; margin:auto;*/
    }
    img{ max-width:100%;}
    .inbox_people {
        background: #f8f8f8 none repeat scroll 0 0;
        float: left;
        overflow: hidden;
        width: 40%; border-right:1px solid #c4c4c4;
        height: 100%;
    }
    .inbox_msg {
        background-color: aliceblue;
        border: 1px solid #c4c4c4;
        clear: both;
        /*overflow: hidden;*/
        height: 100vh;
    }
    .top_spac{ margin: 20px 0 0;}


    .recent_heading {float: left; width:40%;}
    .srch_bar {
        display: inline-block;
        text-align: right;
        width: 60%;
        /*margin-left: 40%*/;
    }
    .headind_srch{ padding:10px 29px 10px 20px; overflow:hidden; border-bottom:1px solid #c4c4c4;}

    .recent_heading h4 {
        color: #05728f;
        font-size: 21px;
        margin: auto;
    }
    .srch_bar input{ border:1px solid #cdcdcd; border-width:0 0 1px 0; width:80%; padding:2px 0 4px 6px; background:none;}
    .srch_bar .input-group-addon button {
        background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
        border: medium none;
        padding: 0;
        color: #707070;
        font-size: 18px;
    }
    .srch_bar .input-group-addon { margin: 0 0 0 -27px;}

    .chat_ib h5{ font-size:15px; color:#464646; margin:0 0 8px 0;}
    .chat_ib h5 span{ font-size:13px; float:right;}
    .chat_ib p{ font-size:14px; color:#989898; margin:auto}
    .chat_img {
        float: left;
        width: 11%;
    }
    .chat_ib {
        float: left;
        padding: 0 0 0 15px;
        width: 88%;
    }

    .chat_people{ overflow:hidden; clear:both;}
    .chat_list {
        border-bottom: 1px solid #c4c4c4;
        margin: 0;
        padding: 18px 16px 10px;
    }
    .chat_list:hover {
        background-color: #ebebeb;
    }
    .inbox_chat {
        max-height:94% ;
        overflow-y: auto;}

    .active_chat{ background:#ebebeb;}

    .incoming_msg_img {
        display: inline-block;
        width: 6%;
    }
    .received_msg {
        display: inline-block;
        padding: 0 0 0 10px;
        vertical-align: top;
        width: 92%;
    }
    .received_withd_msg p {
        background: #ebebeb none repeat scroll 0 0;
        border-radius: 3px;
        color: #646464;
        font-size: 14px;
        margin: 0;
        padding: 5px 10px 5px 12px;
        width: 100%;
    }
    .time_date {
        color: #747474;
        display: block;
        font-size: 12px;
        margin: 8px 0 0;
    }
    .received_withd_msg { width: 57%;}
    .mesgs {
        float: left;
        padding: 30px 15px 0 25px;
        width: 60%;
        height: 100%;
       display: flex;
        flex-direction:column ;
        justify-content: space-between;
    }

    .sent_msg p {
        background: #05728f none repeat scroll 0 0;
        border-radius: 3px;
        font-size: 14px;
        margin: 0; color:#fff;
        padding: 5px 10px 5px 12px;
        width:100%;
    }
    .outgoing_msg{ overflow:hidden; margin:26px 0 26px;}
    .sent_msg {
        float: right;
        width: 46%;
    }
    .input_msg_write input {
        background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
        border: medium none;
        color: #4c4c4c;
        font-size: 15px;
        min-height: 48px;
        width: 100%;
        outline: none;
    }

    .type_msg {border-top: 1px solid #c4c4c4;position: relative;}
    .msg_send_btn {
        background: #05728f none repeat scroll 0 0;
        border: medium none;
        border-radius: 50%;
        color: #fff;
        cursor: pointer;
        font-size: 17px;
        height: 33px;
        position: absolute;
        right: 0;
        top: 11px;
        width: 33px;
    }
    /*.messaging { padding: 0 0 50px 0;}*/
    .msg_history {

        overflow-y: auto;
    }
    .search-bar{
        outline: none;

    }
    @media(max-width: 640px){
        .inbox_msg{
            display: flex;
            flex-direction: column;
            height: auto;
        }
        .mesgs{
            width: 100%;
            background-color: aliceblue;
        }
        .inbox_people{
            overflow: visible;
            width: 100%;
        }

    }


</style>