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
            <tbody>
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

        <div class="bg-white p-2 bg-opacity-20">
            <slot name="pagination"></slot>
        </div>  
   </div>
</template>

<script>
export default {
    name: "TableComponent",
};
</script>

<style scoped></style>
