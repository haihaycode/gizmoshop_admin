<template>
    <ModalBox :isOpen="isOpen" :loading="isLoading" :closeModal="closeModal" :closeText="'Đóng'">
        <template #header>
            <h3 class="sm:text-sm md:text-lg font-bold">Cập nhật thông tin của: {{ dataAccount.id }}</h3>
        </template>
        <template #body>
            <form @submit.prevent="validateForm">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Họ và tên</label>
                    <input v-model="dataAccount.fullname" type="text"
                        class="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập họ và tên" />
                    <span class="text-red-500 text-sm" v-if="errors.fullname">{{ errors.fullname }}</span>
                </div>


                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Số điện thoại</label>
                    <input v-model="dataAccount.sdt" type="text"
                        class="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập số điện thoại" />
                    <span class="text-red-500 text-sm" v-if="errors.sdt">{{ errors.sdt }}</span>
                </div>


                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Ngày sinh</label>
                    <input v-model="dataAccount.birthday" type="date"
                        class="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <span class="text-red-500 text-sm" v-if="errors.birthday">{{ errors.birthday }}</span>
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Thông tin thêm</label>
                    <textarea v-model="dataAccount.extra_info"
                        class="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập thông tin thêm"></textarea>
                    <span class="text-red-500 text-sm" v-if="errors.extraInfo">{{ errors.extraInfo }}</span>
                </div>


                <div class="flex justify-end">
                    <Button :isLoading="isLoading" :text="'Cập Nhật'"></Button>
                </div>
            </form>
        </template>
    </ModalBox>
    <NotificationModal :isOpen="NotificationModalIsOpen" :message="message" :type="messageType"
        @close="NotificationModalIsOpen = false" :title="'Thông báo'"></NotificationModal>
</template>

<script>
import ModalBox from '../modal/ModalBox.vue';
import { getAccountId, updateAccountWithID } from '@/api/staffApi';
import * as Yup from 'yup';
import Button from '../buttons/button.vue';
import NotificationModal from '../modal/NotificationModal.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'updateStaff',
    data() {
        return {
            NotificationModalIsOpen: false,
            dataAccount: {},
            errors: {}
        }
    },
    props: {
        isOpen: {
            type: Boolean,
            default: null,
        },
        accountId: {
            type: String,
            required: true,
        }

    },
    computed: {
        ...mapGetters('loading', ['isLoading'])
    },
    components: {
        ModalBox,
        Button,
        NotificationModal
    },
    mounted() {
        this.useData(this.accountId)
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        validateForm() {
            this.errors = {};
            const schema = Yup.object().shape({
                email: Yup.string()
                    .email('Email không hợp lệ')
                    .required('Email là bắt buộc'),
                fullname: Yup.string()
                    .required('Họ và tên là bắt buộc')
                    .min(2, 'Họ và tên phải có ít nhất 2 ký tự')
                    .max(100, 'Họ và tên không được vượt quá 100 ký tự'),
                sdt: Yup.string()
                    .required('Số điện thoại là bắt buộc')
                    .matches(/^[0-9]+$/, 'Số điện thoại chỉ được chứa số'),
                birthday: Yup.date()
                    .required('Ngày sinh là bắt buộc')
                    .nullable(),
            });

            schema.validate(this.dataAccount, { abortEarly: false })
                .then(() => {
                    this.updateInfoAccount();
                })
                .catch(err => {
                    err.inner.forEach((validationError) => {
                        this.errors[validationError.path] = validationError.message;
                    });
                });
        },
        async useData(accountId) {
            try {
                const response = await getAccountId(accountId);
                this.dataAccount = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async updateInfoAccount() {
            console.log(this.dataAccount)
            try {
                const dataMe = {
                    ...this.dataAccount
                }
                console.log(dataMe + "lỗi dòng 136")
                const response = await updateAccountWithID(this.accountId, dataMe);
                this.message = response.message;
                this.messageType = 'success';
                this.NotificationModalIsOpen = true;
                this.$emit('update-success');
                console.log(this.dataAccount)
            } catch (error) {
                this.message = error.message;
                this.messageType = 'error';
                this.NotificationModalIsOpen = true;
            }
        }
    }
}
</script>

<style></style>
