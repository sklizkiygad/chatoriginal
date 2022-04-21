<template>
    <registrationAdmin
            v-if="!isIn"
            @auth="checkAuth"
    />
    <AdminChat v-else
               @close="adminClose"


    ></AdminChat>
</template>

<script>
    import AdminChat from "@/components/Admin/AdminChat/AdminChat";
    import hostMixins from "@/mixins/hostMixins";
    import registrationAdmin from "@/components/Admin/RegistrationAdmin/RegistrationAdmin";

    export default {
        mixins: [hostMixins],
        components: {
            AdminChat,
            registrationAdmin
        },
        data() {
            return {
                isIn: false,
            }
        },
        methods: {
            checkAuth() {
                if (sessionStorage.getItem('is_auth') === 'true') {
                    this.isIn = true;
                } else {
                    this.isIn = false;
                }
            },
            adminClose() {
                this.$socket.disconnect();
                sessionStorage.clear();
                this.checkAuth();
                this.adminname = null;
                this.password = null;
            },
        },

        mounted() {
            this.checkAuth();
        }
    }


</script>

<style scoped>

</style>