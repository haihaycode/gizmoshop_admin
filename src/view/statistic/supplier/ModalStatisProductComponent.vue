<template>
    <div>
        <ModalBox :isOpen="isOpen" :closeModal="closeModal" :closeText="'Đóng'" :footerIsActive="false"
            :loading="isLoading">
            <template #header>
                <h3 class="sm:text-sm md:text-lg font-bold">
                    <i class='bx bx-package'></i> Thông tin sản phẩm <span class="text-blue-500"> #{{ product?.id }}_{{
                        product?.productName }}</span>
                </h3>
            </template>
            <template #body>
                <div>
                    <div class="flex justify-between items-center space-x-4 mt-2">
                        <h3 class="text-lg font-semibold text-gray-800"> Tìm kiếm theo khoảng thời gian</h3>
                        <div class="flex space-x-4">
                            <input type="date" v-model="startDate"
                                class="px-4 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <input type="date" v-model="endDate"
                                class="px-4 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <button
                                class="px-4 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                @click="handleFetchProductById()">
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                    <div>
                        <div v-if="isLoading">
                            <i class="bx bx-loader bx-spin"></i> Đang tải dữ liệu ...
                        </div>
                        <div v-else class="">
                            <div class="flex flex-wrap space-x-4 justify-between p-4">
                                <div class="flex-1 min-w-[200px] bg-blue-400 p-4 rounded-md shadow-md text-center">
                                    <label class="block font-semibold text-white">Số lượng bán ra</label>
                                    <p class="w-full mt-2 p-2  rounded-md text-2xl text-white">{{
                                        productStatis?.quantityBr
                                    }}</p>
                                </div>
                                <div class="flex-1 min-w-[200px] bg-red-400 p-4 rounded-md shadow-md text-center">
                                    <label class="block font-semibold text-white">Số lượng cung cấp</label>
                                    <p class="w-full mt-2 p-2 rounded-md text-2xl text-white">{{
                                        productStatis?.quantityCC
                                    }}</p>
                                </div>
                                <div class="flex-1 min-w-[200px] bg-green-400 p-4 rounded-md shadow-md text-center">
                                    <label class="block font-semibold text-white">Số lượng tồn kho</label>
                                    <p class="w-full mt-2 p-2 rounded-md text-2xl text-white">{{
                                        productStatis.quantityTK
                                    }}</p>
                                </div>
                            </div>
                            <div>
                                <div class="flex-none w-full ">
                                    <img :src="loadImage('product', productStatis?.product.thumbnail)" alt="sp"
                                        class="w-full h-auto rounded-lg shadow-lg">
                                    <!-- duyệt qua toàn bộ hình ảnh  -->
                                    <p class="w-full mt-2 p-2 text-black"> Mã sản phẩm : &nbsp; {{
                                        productStatis?.product.idProduct || 'không có '
                                    }}</p>
                                    <p class="w-full mt-2 p-2  text-black"> Tên sản phẩm : &nbsp;{{
                                        productStatis?.product.productName || 'không có '
                                    }}</p>
                                    <p class="w-full mt-2 p-2  text-black"> Giảm giá sản phẩm : &nbsp;{{
                                        productStatis?.product.discountProduct || 'không có '
                                    }}</p>
                                    <p class="w-full mt-2 p-2  text-black"> Giá sản phẩm : &nbsp;{{
                                        productStatis?.product.productPrice || 'không có '
                                    }}</p>
                                    <p class="w-full mt-2 p-2  text-black"> Cân nặng sản phẩm : &nbsp;{{
                                        productStatis?.product.productWeight || 'không có '
                                    }}</p>
                                    <p class="w-full mt-2 p-2  text-black"> Số lượng xem sản phẩm : &nbsp;{{
                                        productStatis?.product.view || 'không có '
                                    }}</p>
                                    <p class="w-full mt-2 p-2  text-black"> Diện tích : &nbsp; {{
                                        productStatis?.product.productArea || 'không có '
                                    }}</p>
                                    <p class="w-full mt-2 p-2  text-black"> Thể tích : &nbsp;{{
                                        productStatis?.product.productVolume || 'không có '
                                    }}</p>
                                    <p class="w-full mt-2 p-2  text-black"> Chiều cao : &nbsp;{{
                                        productStatis?.product.productHeight || 'không có '
                                    }}</p>
                                    <p class="w-full mt-2 p-2  text-black"> Chiều dài : &nbsp;{{
                                        productStatis?.product.productLength || 'không có '
                                    }}</p>
                                    <p class="w-full mt-2 p-2  text-black"> Thương hiệu : &nbsp;{{
                                        productStatis?.product.productBrand.name || 'không có '
                                    }}</p>
                                    <p class="w-full mt-2 p-2  text-black"> Danh mục : &nbsp; {{
                                        productStatis?.product.productCategories.name || 'không có '
                                    }}</p>
                                    <p class="w-full mt-2 p-2  text-black"> Ảnh danh mục : &nbsp;{{
                                        productStatis?.product.productCategories.image || 'không có '
                                    }}</p>
                                    <p class="w-full mt-2 p-2  text-black"> Ngày tạo danh mục : &nbsp;{{
                                        productStatis?.product.productCategories.createAt || 'không có '
                                    }}</p>
                                    <p class="w-full mt-2 p-2  text-black"> Ngày cập nhật danh mục : &nbsp;{{
                                        productStatis?.product.productCategories.updateAt || 'không có '
                                    }}</p>
                                    <p class="w-full mt-2 p-2  text-black"> Trạng thái sản phẩm : &nbsp;{{
                                        productStatis?.product.productStatusResponse.name || 'không có '
                                    }}</p>
                                    <p class="w-full mt-2 p-2  text-black"> Ngày tạo sản phẩm : &nbsp;{{
                                        productStatis?.product.productCreationDate || 'không có '
                                    }}</p>
                                    <p class="w-full mt-2 p-2  text-black"> Ngày cập nhật sản phẩm : &nbsp;{{
                                        productStatis?.product.productUpdateDate || 'không có '
                                    }}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </template>
        </ModalBox>
    </div>

</template>

<script>
import { revenueStatisticsByIdProduct } from '@/api/statisticApi';
import ModalBox from '@/components/modal/ModalBox.vue';
import { loadImage } from '@/services/accountService';


export default {
    data() {
        return {
            productStatis: null,
            startDate: null,
            endDate: null,
            isLoading: false
        }
    },
    components: {
        ModalBox
    },
    watch: {
        isOpen(newVal) {
            if (newVal) {
                this.handleFetchProductById();
            }
        },
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        product: {
            type: Object,
            Required: true
        }
    },
    methods: {
        loadImage,
        closeModal() {
            this.$emit('closeModal')
        },
        async handleFetchProductById() {
            this.isLoading = true
            try {
                const res = await revenueStatisticsByIdProduct(this.product?.id, this.startDate, this.endDate);
                this.productStatis = res.data
            } catch (error) {
                console.error(error);
            } finally {
                this.isLoading = false
            }
        }
    }
}
</script>

<style></style>