<template>
    <div>
        <h1 class="text-lg font-semibold">Test View</h1>
        <button @click="callTestApi" class="bg-blue-500 text-white px-4 py-2 rounded">
            Gọi API
        </button>
    </div>
</template>

<script>
import { testApi } from '@/api/index';

export default {
    name: 'test-view',
    data() {
        return {

        };
    },
    methods: {
        async callTestApi() {
            try {
                const response = await testApi(); // Gọi API khi nhấn nút
                console.log(response)
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        },
    },
};
</script>
