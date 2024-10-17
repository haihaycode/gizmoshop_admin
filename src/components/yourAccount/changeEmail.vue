<template>
    <ModalBox :isOpen="isOpen" :loading="isLoading" :closeModal="closeModal" :closeText="'Đóng'">
        <template #header>
            <h3 class="sm:text-sm md:text-lg font-bold">
                <h3 class="sm:text-sm md:text-lg font-bold">Cập nhật Email</h3>
            </h3>
        </template>
        <template #body>
            <form class="max-w-md mx-auto p-6">

                <div class="mb-4">
                    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Nhập email mới</label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        type="text" v-model="email" @input="validateEmail" placeholder="example@gmail.com" />
                    <span v-if="emailError" class="text-red-500 text-sm mt-2">{{ emailError }}</span>
                </div>

                <div class="mb-4 flex items-center justify-between">
                    <Button :isLoading="isLoading" :text="isOtpSending ? `Gửi lại sau ${countdown}s` : 'Gửi OTP'"
                        type="submit" @click="sendOtp" :disabled="emailError || isOtpSending"
                        class="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 hover:bg-blue-600 disabled:opacity-50">
                    </Button>
                </div>

                <div class="mb-4">
                    <label for="otp" class="block text-gray-700 text-sm font-bold mb-2">Nhập OTP</label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        type="text" v-model="otp" @input="validateOtp" placeholder="Nhập mã OTP" />
                    <span v-if="otpError" class="text-red-500 text-sm mt-2">{{ otpError }}</span>
                </div>


                <div class="flex items-center justify-between">
                    <Button :isLoading="isLoading" :text="'Xác nhận OTP'" type="submit" @click="verifyEmail"
                        :disabled="otpError || !otp"
                        class="bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 hover:bg-green-600 disabled:opacity-50">
                    </Button>
                </div>
            </form>

        </template>
        <template #footer></template>
    </ModalBox>
</template>

<script>
import ModalBox from '../modal/ModalBox.vue';
import Button from '../buttons/button.vue';
import { sendOtp, verifyEmail } from '@/api/auth/meApi'
import { mapGetters } from 'vuex';

export default {
    name: 'changeEmail',
    components: {
        ModalBox,
        Button
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            email: '',
            otp: '',
            emailError: '',
            otpError: '',
            countdown: 60,
            isOtpSending: false,
            timer: null,
        };
    },
    computed: {
        ...mapGetters('loading', ['isLoading'])
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        validateEmail() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!this.email) {
                this.emailError = 'Email không được để trống';
            } else if (!emailPattern.test(this.email)) {
                this.emailError = 'Email không hợp lệ';
            } else {
                this.emailError = '';
            }
        },
        validateOtp() {
            if (!this.otp) {
                this.otpError = 'OTP không được để trống';
            } else {
                this.otpError = '';
            }
        },
        async sendOtp() {
            try {
                this.startCountdown()
                const emailNew = {
                    newEmail: this.email
                }
                await sendOtp(emailNew)

            } catch (error) {
                console.error(error)
            }
        },
        startCountdown() {
            this.isOtpSending = true;
            this.countdown = 60;
            this.timer = setInterval(() => {
                if (this.countdown > 0) {
                    this.countdown--;
                } else {
                    this.stopCountdown();
                }
            }, 1000);
        },
        stopCountdown() {
            this.isOtpSending = false;
            clearInterval(this.timer);
        },
        async verifyEmail() {
            try {
                this.startCountdown()
                const emailNewandOtp = {
                    newEmail: this.email,
                    otp: this.otp
                }
                await verifyEmail(emailNewandOtp)
                this.closeModal()

            } catch (error) {
                console.error(error)
            }
        },
    },
    beforeUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    },
};
</script>

<style></style>
