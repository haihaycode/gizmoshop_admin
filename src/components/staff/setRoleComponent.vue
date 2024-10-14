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
            roles: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_MANAGER'],
        }
    },
    computed: {
        ...mapGetters('loading', ['isLoading'])
    },
}
</script>

<style></style>