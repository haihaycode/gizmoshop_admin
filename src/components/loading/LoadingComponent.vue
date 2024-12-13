<template>
    <div v-if="loading && !hidden"
        class="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-40 z-10">
        <div class="loader">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "LoadingSpinner",
    props: {
        loading: {
            type: Boolean,
            required: true,
        },
        hidden: {
            type: Boolean,
            required: false,
        },
    },
};
</script>

<style scoped>
.loader {
    display: flex;
    justify-content: space-between;
    width: 64px;
    height: 64px;
}

.dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: rgb(89, 102, 123);
    animation: dot-bounce 1.2s infinite ease-in-out both;
}

.dot:nth-child(1) {
    animation-delay: -0.4s;
}

.dot:nth-child(2) {
    animation-delay: -0.3s;
}

.dot:nth-child(3) {
    animation-delay: -0.2s;
}

.dot:nth-child(4) {
    animation-delay: -0.1s;
}

@keyframes dot-bounce {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-15px);
    }
}
</style>