<template>
    <div v-if="isLoading"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 fade-animation">
        <div class="loader"></div>
    </div>
</template>

<script>
export default {
    props: {
        isLoading: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
.loader {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #3498db;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

/* Tailwind fade-in & fade-out effect */
.fade-animation {
    @apply opacity-0 transition-opacity duration-500 ease-in-out;
}

.fade-animation-enter-active {
    @apply opacity-100;
}

.fade-animation-leave-active {
    @apply opacity-0;
}
</style>
