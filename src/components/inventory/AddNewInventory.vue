<template>
    <ModalBox :isOpen="isOpen" :loading="isLoading" :closeModal="closeModal" :closeText="'Đóng'">
        <!-- Modal Header Slot -->
        <template #header>
            <h3 class="sm:text-sm md:text-lg font-bold">Thêm kho hàng</h3>
        </template>
        <!-- Modal Body Slot -->
        <template #body>
            <form @submit.prevent="validateForm">
                <!-- Inventory Name -->
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="inventoryName">Tên kho *</label>
                    <input v-model="form.inventoryName"
                        class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        :class="errors.inventoryName ? 'border-red-500' : ''" id="inventoryName"
                        placeholder="Nhập tên kho" />
                    <p class="lg:text-sm text-red-500">{{ errors.inventoryName }}</p>
                </div>

                <!-- City -->
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="city">Thành phố *</label>
                    <input v-model="form.city"
                        class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        :class="errors.city ? 'border-red-500' : ''" id="city" placeholder="Nhập thành phố" />
                    <p class="lg:text-sm text-red-500">{{ errors.city }}</p>
                </div>

                <!-- District -->
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="district">Quận/Huyện *</label>
                    <input v-model="form.district"
                        class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        :class="errors.district ? 'border-red-500' : ''" id="district" placeholder="Nhập quận/huyện" />
                    <p class="lg:text-sm text-red-500">{{ errors.district }}</p>
                </div>

                <!-- Commune -->
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="commune">Phường/Xã *</label>
                    <input v-model="form.commune"
                        class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        :class="errors.commune ? 'border-red-500' : ''" id="commune" placeholder="Nhập phường/xã" />
                    <p class="lg:text-sm text-red-500">{{ errors.commune }}</p>
                </div>

                <!-- Latitude -->
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="latitude">Vĩ độ *</label>
                    <input v-model="form.latitude"
                        class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        :class="errors.latitude ? 'border-red-500' : ''" id="latitude" placeholder="Nhập vĩ độ" />
                    <p class="lg:text-sm text-red-500">{{ errors.latitude }}</p>
                </div>

                <!-- Longitude -->
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="longitude">Kinh độ *</label>
                    <input v-model="form.longitude"
                        class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        :class="errors.longitude ? 'border-red-500' : ''" id="longitude" placeholder="Nhập kinh độ" />
                    <p class="lg:text-sm text-red-500">{{ errors.longitude }}</p>
                </div>

                <!-- Active Status -->
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="active">Hoạt động *</label>
                    <select v-model="form.active"
                        class="shadow-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        :class="errors.active ? 'border-red-500' : ''" id="active">
                        <option value=true>Hoạt động</option>
                        <option value=false>Ngừng hoạt động</option>
                    </select>
                    <p class="lg:text-sm text-red-500">{{ errors.active }}</p>
                </div>

                <div class="flex justify-end">
                    <Button :isLoading="isLoading" :text="'Lưu'" type="submit"
                        class="px-4 py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600">
                    </Button>
                </div>
            </form>
        </template>
    </ModalBox>

    <NotificationModal :isOpen="NotificationModalIsOpen" :message="message" :type="messageType"
        @close="NotificationModalIsOpen = false" :title="'Thông báo'"></NotificationModal>
</template>

<script>
import ModalBox from '../modal/ModalBox.vue';
import { mapGetters } from 'vuex';
import * as Yup from "yup";
import { createInventory } from '@/api/inventoryApi';
import NotificationModal from '../modal/NotificationModal.vue';
import Button from '../buttons/button.vue';

export default {
    name: 'AddNewInventoryComponent',
    components: {
        ModalBox,
        NotificationModal,
        Button
    },
    data() {
        return {
            NotificationModalIsOpen: false,
            messageType: '',
            message: '',
            form: {
                inventoryName: '',
                city: '',
                district: '',
                commune: '',
                latitude: '',
                longitude: '',
                active: true,
            },
            errors: {
                inventoryName: '',
                city: '',
                district: '',
                commune: '',
                latitude: '',
                longitude: '',
                active: '',
            }
        };
    },
    computed: {
        ...mapGetters('loading', ['isLoading'])
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        validateForm() {
            // Reset errors
            this.errors = {};

            const schema = Yup.object().shape({
                inventoryName: Yup.string()
                    .required('Tên kho là bắt buộc')
                    .min(2, 'Tên kho phải có ít nhất 2 ký tự')
                    .max(100, 'Tên kho không được vượt quá 100 ký tự'),

                city: Yup.string()
                    .required('Thành phố là bắt buộc')
                    .min(2, 'Thành phố phải có ít nhất 2 ký tự')
                    .max(100, 'Thành phố không được vượt quá 100 ký tự'),

                district: Yup.string()
                    .required('Quận/Huyện là bắt buộc')
                    .min(2, 'Quận/Huyện phải có ít nhất 2 ký tự')
                    .max(100, 'Quận/Huyện không được vượt quá 100 ký tự'),

                commune: Yup.string()
                    .required('Phường/Xã là bắt buộc')
                    .min(2, 'Phường/Xã phải có ít nhất 2 ký tự')
                    .max(100, 'Phường/Xã không được vượt quá 100 ký tự'),

                latitude: Yup.string()
                    .required('Vĩ độ là bắt buộc'),

                longitude: Yup.string()
                    .required('Kinh độ là bắt buộc'),
            });

            schema.validate(this.form, { abortEarly: false })
                .then(() => {
                    this.submitForm();
                })
                .catch(err => {
                    err.inner.forEach((validationError) => {
                        this.errors[validationError.path] = validationError.message;
                    });
                });
        },
        async submitForm() {
            try {
                const data = { ...this.form }; // Spread form data into object
                console.log(data);  // Should correctly log the form data
                const res = await createInventory(data);
                this.message = res.message;
                this.messageType = 'success';
                this.NotificationModalIsOpen = true;

            } catch (error) {
                this.message = error.message;
                this.messageType = 'error';
                this.NotificationModalIsOpen = true;
            }
        }
    }
}
</script>

<style scoped>
/* Custom styles for removing borders except for the bottom */
input {
    border: none;
    border-bottom: 2px solid #ddd;
}

input:focus {
    outline: none;
    border-bottom-color: #3b82f6;
    /* Blue border on focus */
}
</style>
