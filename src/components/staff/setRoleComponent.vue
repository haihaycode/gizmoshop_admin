<template>

    <div>
        <ModalBox :isOpen="isOpen" :loading="isLoading" :closeModal="closeModal" :closeText="'Đóng'"
            :footerIsActive="true">
            <template #header>
                <h3 class="sm:text-sm md:text-lg font-bold">Cập nhập quyền cho tài khoản : {{ id }}</h3>
            </template>

            <template #body>
                <div>
                    <label class="font-bold">Chọn quyền:</label>
                    <div v-for="role in roles" :key="role.id">
                        <label>
                            <input type="checkbox" :value="role.name" v-model="selectedRoles"
                                :checked="selectedRoles.includes(role.name)" />
                            {{ role.name }}
                        </label>
                    </div>
                </div>
            </template>

            <template #footer>
                <buttonVue :isLoading="isLoading" :text="'Lưu Quyền'" @click="handleSubmitRoles"></buttonVue>
            </template>

        </ModalBox>

        <NotificationModalVue :isOpen="isOpenModalInfo" :closeText="'đóng'" :message="message" :title="'Thông báo'"
            :type="messageType" @close="isOpenModalInfo = false"></NotificationModalVue>


    </div>
</template>

<script>
import ModalBox from '../modal/ModalBox.vue';
import { mapGetters } from 'vuex';
import { getAllRoles, addRole } from '@/api/roleApi';
import buttonVue from '../buttons/button.vue';
import NotificationModalVue from '../modal/NotificationModal.vue';

export default {
    name: 'setRoleComponent',
    components: {
        ModalBox,
        buttonVue,
        NotificationModalVue
    },
    data() {
        return {
            roles: [],
            selectedRoles: [...this.userRoles],
            isOpenModalInfo: false,
            message: '...',
            messageType: 'info'
        }
    },
    props: {
        id: {
            type: Number,
            required: true,
        },
        isOpen: {
            type: Boolean,
            default: false,
        },
        userRoles: {
            type: Array,
            default: () => [], // Danh sách các vai trò mà người dùng đã có
        },
    },
    computed: {
        ...mapGetters('loading', ['isLoading']),
    },
    mounted() {
        this.getRoles();
    },

    watch: {
        isOpen(newVal) {
            if (newVal) {
                this.selectedRoles = [...this.userRoles]; // Reset lại danh sách khi modal mở
            }
        }
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        async getRoles() {
            try {
                // Giả định bạn đang sử dụng Axios để lấy dữ liệu từ API
                const response = await getAllRoles();
                this.roles = response.data; // Gán dữ liệu vai trò vào mảng roles
            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        },
        async handleSubmitRoles() {
            try {
                const response = await addRole(this.id, this.selectedRoles);
                console.log("Roles updated successfully:", response);
                this.messageType = 'success';
                this.message = response.message;
                this.isOpenModalInfo = true;
                this.$emit('loadingList');
            } catch (error) {
                console.error("Error updating roles:", error.message);
                this.messageType = 'error';
                this.message = error.message;
                this.isOpenModalInfo = true;
            }
        }
    },


}
</script>

<style></style>
