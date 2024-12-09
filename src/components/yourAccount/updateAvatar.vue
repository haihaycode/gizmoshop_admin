<template>
    <ModalBox :isOpen="isOpen" :loading="isLoading" :closeModal="closeModal" :closeText="'Đóng'">
        <template #header>
            <h3 class="sm:text-sm md:text-lg font-bold">Cập nhật hình ảnh</h3>
        </template>
        <template #body>
            <form @submit.prevent="validateForm" class="flex flex-col items-center space-y-16">
                <!-- Hình ảnh xem trước ở trên -->
                <div class="w-full max-w-xs h-auto md:w-96 md:h-96">
                    <img :src="imagePreview || defaultImage" alt="Xem trước hình ảnh"
                        class="w-full h-full object-cover rounded-full shadow-sm" />
                </div>


                <!-- Chọn hình ảnh ở dưới -->
                <div
                    class="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4 w-full">
                    <!-- Input chọn file -->
                    <div class="flex-grow">
                        <input @change="handleFileChange" type="file" accept="image/*"
                            class="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ease-in-out duration-150" />
                        <span class="text-red-500 text-sm mt-2" v-if="errors.image">{{ errors.image }}</span>
                    </div>

                    <!-- Button cập nhật -->
                    <div class="w-full md:w-auto flex justify-center md:justify-end ">
                        <Button :isLoading="isLoading" :text="'Cập Nhật'"
                            class="w-full  md:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition ease-in-out duration-150" />
                    </div>
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
import { updateMe } from '@/api/auth/meApi';
import NotificationModal from '../modal/NotificationModal.vue';
import { mapGetters } from 'vuex';
import { loadImageAccount } from '@/services/accountService';
export default {
    name: 'updateImageMeComponent',
    data() {
        return {
            NotificationModalIsOpen: false,
            messageType: '',
            message: '',
            userData: {
                image: '',  // Lưu trữ file ảnh
                fullname: '', // Lưu thông tin accountRequest (thêm các thông tin khác nếu cần)
                sdt: '',
                birthday: '',
                extraInfo: ''
            },
            errors: {},
            imagePreview: '',  // Lưu URL của ảnh xem trước
            defaultImage: require('@/assets/image/3red.svg'),  // Đường dẫn ảnh mặc định
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
    computed: {
        ...mapGetters('loading', ['isLoading'])
    },
    mounted() {
        this.getInfoFromParent();
    },
    methods: {
        loadImageAccount,
        validateForm() {
            this.errors = {};
            const schema = Yup.object().shape({
                image: Yup.mixed().required('Bạn phải chọn một ảnh'),
            });

            schema.validate(this.userData, { abortEarly: false })
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
                this.userData.image = info.image || '';
                this.imagePreview = loadImageAccount(info.image) || this.defaultImage;
                this.userData.fullname = info.fullname || '';
                this.userData.sdt = info.sdt || '';
                this.userData.birthday = info.birthday || '';
                this.userData.extraInfo = info.extraInfo || '';
            } catch (error) {
                console.error(error);
            }
        },
        handleFileChange(event) {
            const file = event.target.files[0];  // Lấy file ảnh người dùng chọn
            if (file) {
                this.userData.image = file;
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imagePreview = e.target.result;  // Hiển thị ảnh xem trước
                };
                reader.readAsDataURL(file);
            }
        },
        async updateMe() {
            try {
                // Tạo đối tượng FormData để chứa dữ liệu
                const formData = new FormData();

                // Kiểm tra và thêm hình ảnh vào FormData
                if (this.userData.image) {
                    formData.append('file', this.userData.image);
                }

                // Tạo đối tượng accountRequest và chuyển đổi thành chuỗi JSON
                const accountRequest = {
                    fullname: this.userData.fullname,
                    sdt: this.userData.sdt,
                    birthday: this.userData.birthday,
                    extraInfo: this.userData.extraInfo
                };

                // Thêm accountRequest vào FormData
                formData.append('accountRequest', new Blob([JSON.stringify(accountRequest)], { type: 'application/json' }));

                // Gọi API để cập nhật hình ảnh và thông tin tài khoản
                const response = await updateMe(formData);
                console.log(response);

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
