<script setup>
import { ref, onMounted } from "vue";
import AuthService from "@/services/AuthService";

const login = ref("");
const passwordHash = ref("");
const userID = ref(null);
const sessionID = ref(null);
const errorMessage = ref("");

const handleLogin = async () => {
    errorMessage.value = "";
    try {
        userID.value = await AuthService.login(login.value, passwordHash.value);
        sessionID.value = await AuthService.checkSession();
    } catch (error) {
        errorMessage.value = error.message;
    }
};

const handleLogout = async () => {
    if (userID.value) {
        try {
            await AuthService.logout(userID.value);
            userID.value = null;
            sessionID.value = null;
        } catch (error) {
            errorMessage.value = error.message;
        }
    }
};

onMounted(async () => {
    sessionID.value = await AuthService.checkSession();
});
</script>

<template>
    <div>
        <h2>Authentication</h2>

        <div v-if="!sessionID">
            <input v-model="login" placeholder="Login" />
            <input v-model="passwordHash" placeholder="Password Hash" type="password" />
            <button @click="handleLogin">Login</button>
        </div>

        <div v-else>
            <p>Session ID: {{ sessionID }}</p>
            <button @click="handleLogout">Logout</button>
        </div>

        <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
    </div>
</template>
