<template>
    <ModalBox :isOpen="isOpen" :loading="isLoading" :closeModal="closeModal" :closeText="'Đóng'">
        <template #header>
            <h3 class="sm:text-sm md:text-lg font-bold">Cập nhật thông tin của:</h3>
        </template>
        <template #body>
            <h1>đang chờ api get id </h1>
        </template>
    </ModalBox>
</template>

<script>
import ModalBox from '../modal/ModalBox.vue';
import { updateAccountWithID } from '@/api/staffApi'
export default {
    name: 'updateStaff',
    data() {
        return {
            dataAccount: {}
        }
    },
    components: {
        ModalBox
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        async updateInfoAccountWithId(accountId) {
            try {
                //    đang chờ api get id
                const userData = {

                }
                await updateAccountWithID(accountId, userData)
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style></style>