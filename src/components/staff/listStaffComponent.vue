<template>
  <div>
    <filterRolesComponent @search="getListAllAccount"></filterRolesComponent>
    <TableComponent>
      <!-- Header Slot -->
      <template #header>
        <th @click="changeSort('id')"
          class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Stt <span
            v-html="getSortIcon('id')"></span></th>
        <th @click="changeSort('fullname')"
          class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Tên Nhân Viên <span
            v-html="getSortIcon('fullname')"></span></th>
        <th @click="changeSort('email')"
          class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Email <span
            v-html="getSortIcon('email')"></span></th>
        <th @click="changeSort('sdt')"
          class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Số điện thoại <span
            v-html="getSortIcon('sdt')"></span></th>
        <th @click="changeSort('birthday')"
          class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Năm sinh<span
            v-html="getSortIcon('birthday')"></span></th>
        <th @click="changeSort('extra_info')"
          class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Thông tin thêm <span
            v-html="getSortIcon('extra_info')"></span></th>
        <th @click="changeSort('roles')"
          class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Quyền <span
            v-html="getSortIcon('roles')"></span></th>
        <th @click="changeSort('updateDate')"
          class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Cập nhật lần cuối<span
            v-html="getSortIcon('updateDate')"></span></th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Công cụ</th>
        <th @click="changeSort('deleted')"
          class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Trạng thái <span
            v-html="getSortIcon('deleted')"></span></th>
      </template>

      <!-- Body Slot -->
      <template #body>
        <tr :class="index % 2 === 0 ? 'bg-slate-200' : ''" v-for="(item, index) in formattedStaffList" :key="index"
          class="hover:bg-gray-300">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ item.id }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ item.fullname }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.email }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.sdt }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.birthday }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.extraInfo }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.roles }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.updateAt }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <i @click="handleModalSetting(item.id)" class='bx bx-cog text-xl'></i>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <toggleButton :is-toggled="!item.deleted" @update:isToggled="updateDeleted(item.id)"></toggleButton>
          </td>
        </tr>
      </template>

      <template #footer>
        <td colspan="8"></td>
      </template>

      <template #pagination>
        <div>
          <Pagination :total-items="Number(pagination.totalElements)" :items-per-page="limit" :current-page="page + 1"
            @page-changed="handlePageChange" @limit-changed="handleLimitChange"></Pagination>
        </div>
      </template>
    </TableComponent>

    <ModalBox :isOpen="ModalSettingIsOpen" :closeModal="handleModalSetting">
      <template #header>
        <h2 class="text-2xl font-bold mb-4">Các công cụ chỉnh sửa và cập nhật</h2>
      </template>
      <template #body>
        <div class="space-y-4">
          <div @click="handleChangeRole" class="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded">
            <i class="bx bxl-android text-xl text-blue-500 cursor-pointer"></i>
            <span class="text-sm font-medium text-gray-700 cursor-pointer">Cập nhật quyền cho tài khoản</span>
          </div>

          <div @click="handleresetpass" class="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded">
            <i class="bx bx-reset text-xl text-red-500 cursor-pointer"></i>
            <span class="text-sm font-medium text-gray-700 cursor-pointer">Đặt lại mật khẩu cho tài khoản</span>
          </div>

          <div @click="updateStaffModal" class="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded">
            <i class="bx bxs-edit text-xl text-green-500 cursor-pointer"></i>
            <span class="text-sm font-medium text-gray-700 cursor-pointer">Cập nhật thông tin cho tài khoản</span>
          </div>
        </div>
      </template>

    </ModalBox>

    <setRoleComponentVue v-if="idAccountSelected" :id="idAccountSelected" :isOpen="ModalUpdateIsOpen"
      :userRoles="roleUser" @close="handleChangeRole" @loadingList="getListAllAccount">
    </setRoleComponentVue>
    <updatestaff v-if="idAccountSelected" :isOpen="ModalUpdateStaffIsOpen" @close="updateStaffModal"
      @update-success="getListAllAccount" :accountId="idAccountSelected"></updatestaff>
  </div>
</template>

<script>
import { listStaff, updateRoles, resertAccount } from '@/api/staffApi.js';
import updatestaff from './updateStaff.vue';
import TableComponent from '../table/TableComponent.vue';
import toggleButton from '../buttons/toggleButton.vue';
import Pagination from '../pagination/Pagination.vue';
import filterRolesComponent from './filterRolesComponent.vue';
import notificationService from '@/services/notificationService';
import dayjs from "dayjs";
import { mapGetters } from 'vuex';
import setRoleComponentVue from './setRoleComponent.vue';
import ModalBox from '../modal/ModalBox.vue';

export default {
  name: 'listStaffComponent',
  components: {
    TableComponent,
    toggleButton,
    setRoleComponentVue,
    Pagination,
    filterRolesComponent,
    updatestaff,
    ModalBox

  },
  data() {
    return {
      ModalSettingIsOpen: false,
      ModalUpdateStaffIsOpen: false,
      ModalUpdateIsOpen: false,
      idAccountSelected: null,
      roleUser: [],
      pagination: [],
      staffList: [],
      sortField: 'id',
      sortDirection: 'desc',
      limit: 5,
      page: 0
    };
  },

  computed: {
    ...mapGetters('loading', ['isLoading']),
    formattedStaffList() {
      return this.staffList.map(item => {
        let roles = item.roles;
        if (Array.isArray(roles)) {
          roles = roles.map(role => {
            if (role === "ROLE_ADMIN") {
              return "Quản trị viên";
            } else if (role === "ROLE_SHIPPER") {
              return "Nhân viên giao hàng";
            } else if (role === "ROLE_STAFF") {
              return "Nhân viên quản lí";
            } else if (role === "ROLE_CUSTOMER") {
              return "Khách hàng";
            }
            return role;
          }).join(', ');
        }

        return {
          ...item,
          roles: roles,
          updateAt: item.updateAt
            ? dayjs(item.updateAt).format("DD/MM/YYYY HH:mm")
            : "No create date provided"
        };
      });
    }
  },

  mounted() {
    this.getListAllAccount();
  },
  methods: {
    async getListAllAccount(keyword, role) {
      try {
        const response = await listStaff(keyword, undefined, role, this.page, this.limit, `${this.sortField},${this.sortDirection}`);
        this.pagination = response.data;
        this.staffList = response.data.content;
      } catch (error) {
        console.error('Error loading staff list:', error);
      }
    },

    async changeSort(column) {
      if (this.sortField === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortField = column;
        this.sortDirection = 'asc';
      }
      await this.getListAllAccount();
    },
    async resetPass() {
      try {
        await resertAccount(this.idAccountSelected)
        notificationService.success("reset password thành công")
      } catch (error) {
        notificationService.error("reset password thất bại")
        console.log(error)
      }
    },

    getSortIcon(column) {
      if (this.sortField === column) {
        return this.sortDirection === 'asc'
          ? "<i class='bx bx-sort-a-z'></i>"
          : "<i class='bx bx-sort-z-a'></i>";
      }
      return '';
    },

    handlePageChange(newPage) {
      this.page = newPage - 1;
      this.getListAllAccount();
    },
    handleLimitChange(limitPanigation) {
      this.limit = limitPanigation;
      this.page = 0;
      this.getListAllAccount();
    },
    handleModalSetting(accountId) {
      this.idAccountSelected = accountId;
      this.ModalSettingIsOpen = !this.ModalSettingIsOpen;
    },
    handleChangeRole() {
      this.roleUser = this.staffList.find(staff => staff.id === this.idAccountSelected)?.roles || [];
      this.ModalUpdateIsOpen = !this.ModalUpdateIsOpen;
    },
    handleresetpass() {
      this.resetPass(this.idAccountSelected)
    },
    async updateDeleted(id) {
      try {
        await updateRoles(id);
        this.getListAllAccount();
      } catch (error) {
        console.log(error)
      }
    },
    updateStaffModal() {
      this.ModalUpdateStaffIsOpen = !this.ModalUpdateStaffIsOpen;
    }

  }
}
</script>

<style></style>
