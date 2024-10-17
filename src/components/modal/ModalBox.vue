<template>
    <div v-if="isOpen" class="z-30 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
        <div
            class="relative   w-full  max-w-screen-xl max-h-screen overflow-y-auto p-6 bg-white shadow-lg md:p-8 rounded-sm">
            <!-- Loading state -->
            <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                <svg class="w-10 h-10 text-blue-600 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>
            </div>

            <!-- Modal Header -->
            <div class="flex justify-between mb-4">
                <!-- Use slot for header -->
                <slot name="header">
                    <h3 class="text-lg font-bold">{{ header }}</h3>
                </slot>
                <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
                    &times;
                </button>
            </div>

            <!-- Modal Body with scroll -->
            <div class="mb-6 overflow-y-auto max-h-[70vh] pr-4">
                <slot name="body">{{ body }}</slot>
            </div>

            <!-- Modal Footer -->
            <div v-if="footerIsActive" class="flex justify-end space-x-2">
                <slot name="footer">
                    <button @click="closeModal" class="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600">
                        {{ closeText || 'Close' }}
                    </button>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
import '@/assets/css/customScrollbar.css';
export default {
    props: {
        isOpen: {
            type: Boolean,
            default: false,
        },
        header: {
            type: String,
            default: 'Modal Header',
        },
        body: {
            type: String,
            default: 'This is the modal body content.',
        },
        footer: {
            type: String,
            default: 'Footer content',
        },
        loading: {
            type: Boolean,
            default: false,
        },
        closeText: {
            type: String,
            default: 'Close',
        },
        closeModal: {
            type: Function,
        },
        footerIsActive: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style scoped>
/* Ensures the modal content can scroll inside if there's too much content */
.modal-body {
    max-height: 70vh;
    overflow-y: auto;
}



/* Styling to prevent overflow issues */
</style>