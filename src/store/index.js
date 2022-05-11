import {createStore} from "vuex";
import {userStyles} from "@/store/userStyles";


export default createStore({
    modules:{
        styleForUser:userStyles

    }
})