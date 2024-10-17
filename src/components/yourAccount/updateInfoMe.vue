<template>
    <ModalBox :isOpen="isOpen" :loading="isLoading" :closeModal="closeModal" :closeText="'Đóng'">
        <template #header>
            <h3 class="sm:text-sm md:text-lg font-bold">Cập nhật thông tin</h3>
        </template>
        <template #body>
            <form @submit.prevent="validateForm">

                <!-- <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input disabled v-model="parentInfo.email" type="email"
                        class="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập email" />
                    <span class="text-red-500 text-sm" v-if="errors.email">{{ errors.email }}</span>
                </div> -->


                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Họ và tên</label>
                    <input v-model="parentInfo.fullname" type="text"
                        class="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập họ và tên" />
                    <span class="text-red-500 text-sm" v-if="errors.fullname">{{ errors.fullname }}</span>
                </div>


                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Số điện thoại</label>
                    <input v-model="parentInfo.sdt" type="text"
                        class="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập số điện thoại" />
                    <span class="text-red-500 text-sm" v-if="errors.sdt">{{ errors.sdt }}</span>
                </div>


                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Ngày sinh</label>
                    <input v-model="parentInfo.birthday" type="date"
                        class="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <span class="text-red-500 text-sm" v-if="errors.birthday">{{ errors.birthday }}</span>
                </div>


                <!-- <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Hình ảnh</label>
                    <input v-model="parentInfo.image" type="text"
                        class="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="URL hình ảnh" />
                    <span class="text-red-500 text-sm" v-if="errors.image">{{ errors.image }}</span>
                </div> -->


                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Thông tin thêm</label>
                    <textarea v-model="parentInfo.extraInfo"
                        class="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập thông tin thêm"></textarea>
                    <span class="text-red-500 text-sm" v-if="errors.extra_info">{{ errors.extra_info }}</span>
                </div>


                <div class="flex justify-end">
                    <Button @click="updateMe" :isLoading="isLoading" :text="'Cập Nhật'"></Button>
                </div>
            </form>
        </template>
    </ModalBox>
    <NotificationModal :isOpen="NotificationModalIsOpen" :message="message" :type="messageType"
        @close="NotificationModalIsOpen = false" :title="'Thông báo'"></NotificationModal>
</template>

<script>
import ModalBox from '../modal/ModalBox.vue';
import * as Yup from 'yup';
import Button from '../buttons/button.vue';
import { updateMe } from '@/api/auth/meApi'
import NotificationModal from '../modal/NotificationModal.vue';

export default {
    name: 'updateInfoMeComponent',
    data() {
        return {
            NotificationModalIsOpen: false,
            messageType: '',
            message: '',
            parentInfo: {
                email: '',
                fullname: '',
                sdt: '',
                birthday: '',
                image: '',
                extra_info: ''
            },
            errors: {}
        };
    },
    components: {
        ModalBox,
        Button,
        NotificationModal
    },
    props: {
        isOpen: {
            type: Boolean,
            default: null,
        },
        getInfo: Function
    },
    mounted() {
        this.getInfoFromParent();
    },
    methods: {
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
                // image: Yup.string().url('URL hình ảnh không hợp lệ'),
                // extra_info: Yup.string()
                //     .max(500, 'Thông tin thêm không được vượt quá 500 ký tự'),
            });

            schema.validate(this.parentInfo, { abortEarly: false })
                .then(() => {
                    this.updateMe();
                })
                .catch(err => {
                    err.inner.forEach((validationError) => {
                        this.errors[validationError.path] = validationError.message;
                    });
                });
        },
        closeModal() {
            this.$emit('close');
        },
        async getInfoFromParent() {
            try {
                const info = await this.getInfo();
                this.parentInfo = info;
            } catch (error) {
                console.error(error);
            }
        },
        async updateMe() {
            try {
                const dataMe = {
                    fullname: this.parentInfo.fullname,
                    sdt: this.parentInfo.sdt,
                    birthday: this.parentInfo.birthday,
                    extraInfo: this.parentInfo.extra_info,
                }
                await updateMe(dataMe)
                this.message = "Cập nhật thành công";
                this.messageType = 'success';
                this.NotificationModalIsOpen = true;
                this.$emit('update-success');
            } catch (error) {
                this.message = error.message;
                this.messageType = 'error';
                this.NotificationModalIsOpen = true;
            }
        }
    }
};
</script>

<style scoped></style>
