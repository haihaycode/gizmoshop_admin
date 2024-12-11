<template>
  <div class="flex justify-between items-center overflow-x-auto bg-white py-2">
    <div>
      <!-- Select option to change items per page -->
      <select v-model="localItemsPerPage" @change="updateLimit" class="px-2 py-1 ">
        <option class="bg-opacity-0" v-for="option in limitOptions" :key="option" :value="option">{{ option }} mục
        </option>
      </select>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="md:flex items-center justify-center">
      <!-- Previous Button -->
      <button @click="prevPage" :disabled="currentPage === 1"
        class="mx-1 px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-400 transition-colors duration-200"
        aria-label="Previous">
        <i class="bx bxs-chevron-left"></i>
      </button>

      <!-- First Page Button -->
      <button v-if="currentPage > 2" @click="goToPage(1)"
        class="mx-1 px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-500 transition-colors duration-200">
        1
      </button>

      <!-- Left Ellipsis -->
      <span v-if="currentPage > 3" class="mx-1">...</span>

      <!-- Middle Page Buttons -->
      <button v-for="page in pagesToShow" :key="page" @click="goToPage(page)" :class="{
        'bg-[#ffa500] text-white border border-[#ffa500]': currentPage === page,
        'bg-gray-200 hover:bg-gray-300 transition-colors duration-200': currentPage !== page
      }" class="mx-1 px-3 py-1 rounded-md">
        {{ page }}
      </button>

      <!-- Right Ellipsis -->
      <span v-if="currentPage < totalPages - 2" class="mx-1">...</span>

      <!-- Last Page Button -->
      <button v-if="currentPage < totalPages" @click="goToPage(totalPages)"
        class="mx-1 px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-500 transition-colors duration-200">
        {{ totalPages }}
      </button>

      <!-- Next Button -->
      <button @click="nextPage" :disabled="currentPage === totalPages"
        class="mx-1 px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-500 transition-colors duration-200"
        aria-label="Next">
        <i class="bx bxs-chevron-right"></i>
      </button>
    </div>
    <!-- Pagination -->

    <div>
      <div class="hidden sm:flex px-2  items-center">
        Trang
        <input type="number" v-model.number="editablePage" @input="updatePageInstant" min="1" :max="totalPages"
          class="w-16 border mx-1 rounded-sm text-center no-spinner focus:outline-none focus:border-none border-none bg-gray-50" />
        / {{ totalPages }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaginationComponent',
  props: {
    totalItems: {
      type: Number,
      required: true,
      default: 0
    },
    itemsPerPage: {
      type: Number,
      required: true,
      default: 10
    },
    currentPage: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data() {
    return {
      localItemsPerPage: this.itemsPerPage,
      limitOptions: [5, 8, 10, 15, 20],
      editablePage: this.currentPage,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.localItemsPerPage); // Sử dụng localItemsPerPage
    },
    pagesToShow() {
      const pages = [];
      const startPage = Math.max(2, this.currentPage - 1);
      const endPage = Math.min(this.totalPages - 1, this.currentPage + 1);
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    }
  },
  methods: {
    goToPage(page) {
      this.$emit('page-changed', page);
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.goToPage(this.currentPage + 1);
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.goToPage(this.currentPage - 1);
      }
    },
    updateLimit() {
      this.$emit('limit-changed', this.localItemsPerPage);
    },
    updatePageInstant() {
      if (this.editablePage >= 1 && this.editablePage <= this.totalPages) {
        this.goToPage(this.editablePage);
      } else if (this.editablePage > this.totalPages) {
        this.editablePage = this.totalPages;
        this.goToPage(this.totalPages);
      } else if (this.editablePage < 1) {
        this.editablePage = 1;
        this.goToPage(1);
      }
    }
  },
  watch: {
    itemsPerPage(newVal) {
      this.localItemsPerPage = newVal;
    },
    currentPage(newVal) {
      this.editablePage = newVal;
    }
  }
};
</script>

<style scoped>
/* Bạn có thể thêm kiểu dáng tùy chỉnh tại đây */
</style>