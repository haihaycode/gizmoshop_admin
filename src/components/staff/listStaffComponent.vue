<template>
  <div>
  <filterRolesComponent @search="loadInventory"></filterRolesComponent>
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
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Cập nhật quyền</th>
        <th @click="changeSort('deleted')"
          class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider">Trạng thái <span
            v-html="getSortIcon('deleted')"></span></th>
      </template>

      <!-- Body Slot -->
      <template #body>
        <tr v-for="(item, index) in formattedStaffList" :key="index" class="hover:bg-gray-300">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ index + 1 }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ item.fullname }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.email }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.sdt }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.birthday }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.extra_info }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.roles }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.updateAt }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" @click="handleChangeRole(item.id)"><i
              class='bx bxs-edit-alt'></i></td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <toggleButton :is-toggled="!item.deleted"></toggleButton>
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

    <setRoleComponentVue v-if="idAccountSelected" :id="idAccountSelected" :isOpen="ModalUpdateIsOpen"
      :userRoles="roleUser" @close="handleChangeRole(null)" @loadingList="loadInventory">
    </setRoleComponentVue>

  </div>
</template>

<script>
import { listStaff } from '@/api/staffApi.js';
import TableComponent from '../table/TableComponent.vue';
import toggleButton from '../buttons/toggleButton.vue';
import Pagination from '../pagination/Pagination.vue';
import filterRolesComponent from './filterRolesComponent.vue';
import dayjs from "dayjs";



import setRoleComponentVue from './setRoleComponent.vue';

export default {
  name: 'listStaffComponent',
  components: {
    TableComponent,
    toggleButton,
    setRoleComponentVue,
    Pagination,
    filterRolesComponent,

  },
  data() {
    return {
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
    this.loadInventory();
  },
  methods: {
    async loadInventory(keyword, role) {
        try {
            const response = await listStaff(keyword, undefined, role, this.page, this.limit, `${this.sortField},${this.sortDirection}`);
            this.pagination = response.data;
            this.staffList = response.data.content;
            console.log(response);
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
      await this.loadInventory();
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
      this.loadInventory();
    },
    handleLimitChange(limitPanigation) {
      this.limit = limitPanigation;
      this.page = 0;
      this.loadInventory();
    },
    handleChangeRole(accountId) {
      this.ModalUpdateIsOpen = !this.ModalUpdateIsOpen;
      this.idAccountSelected = accountId;
      this.roleUser = this.staffList.find(staff => staff.id === accountId)?.roles || [];
    }
    // async updateStatusInventory(id){
    //    try {
    //    await changeActiveById(id);
    //    this.loadInventory();
    //    } catch (error) {
    //     console.log(error)
    //    }

    //     },
  }
}
</script>

<style></style>
