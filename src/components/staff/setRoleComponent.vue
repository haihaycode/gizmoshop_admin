<template>

    <div>
        <ModalBox :isOpen="isOpen" :loading="isLoading" :closeModal="closeModal" :closeText="'Đóng'">
            <template #header>
                <h3 class="sm:text-sm md:text-lg font-bold">Cập nhập quyền cho tài khoản : {{ id }}</h3>
            </template>

            <template #body>
                <div>
                    <label for="role-select" class="font-bold">Chọn quyền:</label>
                    <select id="role-select" v-model="selectedRoles" multiple>
                        <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
                    </select>
                </div>
            </template>
        </ModalBox>
    </div>
</template>

<script>
import ModalBox from '../modal/ModalBox.vue'
import { mapGetters } from 'vuex';
import { getAllRoles } from '@/api/roleApi';
export default {
    name: 'setRoleComponent',
    components: {
        ModalBox
    },
    props: {
        id: {
            type: String,
            required: true,
        },
        isOpen: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            selectedRoles: [], // to store selected roles
            roles: [], // Default roles in case API doesn't respond
        }
    },
    computed: {
        ...mapGetters('loading', ['isLoading']),
    },
    watch: {
        isOpen(newVal) {
            if (newVal) {
                this.getRoles(); // Fetch roles when the modal is opened
            }
        }
    },
    methods: {
        async getRoles() {
            try {
                const response = await getAllRoles();
                this.roles = response.data;
            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        },
        closeModal() {
            this.$emit('close');
        }
    }
}
</script>

<style></style>
