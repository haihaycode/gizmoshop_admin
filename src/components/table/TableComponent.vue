<template>
    <div>
        <div class="table-container overflow-x-auto">
            <table class="min-w-full border-collapse table-auto">
                <!-- Table Header -->
                <thead>
                    <tr class="bg-blue-500">
                        <slot name="header"></slot>
                    </tr>
                </thead>

                <!-- Table Body -->
                <tbody class="bg-white">
                    <slot name="body"></slot>
                </tbody>

                <!-- Table Footer -->
                <tfoot v-if="$slots.footer">
                    <tr>
                        <slot name="footer"></slot>
                    </tr>
                </tfoot>
            </table>
            <!-- pagination -->


        </div>

        <div class="bg-white bg-opacity-20">
            <slot name="pagination"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "TableComponent",
};
</script>

<style scoped>
::-webkit-scrollbar {
    width: 8px;
    /* Độ rộng của scrollbar */
    height: 8px;
    /* Chiều cao của scrollbar cho cuộn ngang */
}

::-webkit-scrollbar-thumb {
    background-color: #88888855;
    /* Màu của thanh cuộn */
    border-radius: 2px;
    /* Bo tròn góc thanh cuộn */
}

::-webkit-scrollbar-thumb:hover {
    background-color: #55555593;
    /* Màu khi hover thanh cuộn */
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}
</style>
