<template>
    <div v-show="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
        <div class="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg md:p-8 transform transition-transform duration-300"
            :class="isOpen ? 'scale-100' : 'scale-95'">
            <!-- Modal Header with Icon -->
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-2">
                    <!-- Icon based on notification type -->

                    <svg v-if="type === 'success'" class="w-6 h-6 text-green-500" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>

                    <svg v-if="type === 'error'" class="w-6 h-6 text-red-500" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>

                    <svg v-if="type === 'warning'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" class="w-6 h-6 text-yellow-500">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 9v2m0 4h.01M10.93 2.3c.58-.94 1.76-.94 2.34 0l9.36 15.02c.58.94-.14 2.13-1.17 2.13H3.74c-1.03 0-1.75-1.19-1.17-2.13L10.93 2.3z" />
                    </svg>

                    <svg v-if="type === 'info'" class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 16h-1v-4h1m0-4h-1m-6 8a9 9 0 1118 0 9 9 0 01-18 0z" />
                    </svg>
                    <h3 class="text-lg font-bold">{{ title }}</h3>
                </div>
                <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
                    &times;
                </button>
            </div>

            <!-- Modal Body -->
            <div class="mb-6">
                <slot name="body">{{ message }}</slot>
            </div>

            <!-- Modal Footer -->
            <div class="flex justify-end space-x-2">
                <button @click="closeModal" class="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600">
                    {{ closeText || 'Close' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isOpen: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: 'Notification',
        },
        message: {
            type: String,
            default: 'This is the notification message.',
        },
        type: {
            type: String,
            default: 'info', // 'success', 'error', 'warning', 'info'
        },
        closeText: {
            type: String,
            default: 'Close',
        },
    },
    emits: ['close'],
    methods: {
        closeModal() {
            this.$emit('close');
        },
    },
};
</script>

<style scoped>
/* Additional CSS can be added here */
</style>