<script setup>
import { inject, ref } from "vue";
import AuthService from "@/services/AuthService";
import md5 from "md5";
import { useRouter } from "vue-router";

const router = useRouter();
const login = ref("");
const password = ref("");
const showPassword = ref(false);
const errorMessage = ref("");
const setUserID = inject("setUserID");

const handleLogin = async () => {
    try {
        const passwordHash = md5(password.value);
        const id = await AuthService.login(login.value, passwordHash, setUserID);
        if (id) {
            setUserID(id);
            router.push("/projects");
        }
    } catch (error) {
        errorMessage.value = "Ошибка входа: " + error.message;
    }
};
</script>

<template>
    <div class="flex flex-col items-center justify-center min-h-screen">
        <h2 class="text-2xl font-bold mb-4">Вход</h2>

        <form @submit.prevent="handleLogin" class="w-full max-w-sm">
            <input v-model="login" placeholder="Логин" class="border p-2 mb-2 w-full" autocomplete="username" />

            <div class="relative">
                <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Пароль"
                    class="border p-2 mb-2 w-full pr-10" autocomplete="current-password" />
                <button type="button" @click="showPassword = !showPassword"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path
                            d="M17.94 17.94A10.1 10.1 0 0112 20c-6 0-10-8-10-8a18.36 18.36 0 014.22-4.93M9.88 9.88A3 3 0 1112 15a3 3 0 01-2.12-5.12z">
                        </path>
                        <path d="M1 1l22 22"></path>
                    </svg>
                </button>
            </div>

            <button type="submit" class="bg-blue-500 text-white px-4 py-2 w-full">
                Войти
            </button>
        </form>

        <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
    </div>
</template>
