<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";
import AuthService from "@/services/AuthService";

const router = useRouter();
const userID = inject("userID");
const setUserID = inject("setUserID");

const handleLogout = async () => {
    try {
        if (userID.value) {
            const response = await AuthService.logout(Number(userID.value));
            if (response) {
                localStorage.removeItem("userID");
                setUserID(null);
                router.push("/login");
            }
        }
    } catch (error) {
        console.error("Logout error:", error.message);
    }
};
</script>

<template>
    <div class="layout">
        <header class="header">
            <div class="header-container">
                <h1 class="logo">DPM</h1>
            </div>

            <nav class="tabs">
                <RouterLink to="/projects" class="tab" active-class="active-tab">Проекты</RouterLink>
                <RouterLink to="/users" class="tab" active-class="active-tab">Пользователи</RouterLink>
            </nav>

            <button @click="handleLogout" class="logout-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="logout-icon">
                    <path d="M2.00098 11.999L16.001 11.999M16.001 11.999L12.501 8.99902M16.001 11.999L12.501 14.999"
                        stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                        d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.3531 21.8897 19.1752 21.9862 17 21.9983M9.00195 17C9.01406 19.175 9.11051 20.3529 9.87889 21.1213C10.5202 21.7626 11.4467 21.9359 13 21.9827"
                        stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                </svg>
            </button>
        </header>

        <main class="main-content">
            <slot />
        </main>
    </div>
</template>

<style scoped>
.layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #2c3e50;
    color: white;
    padding: 15px;
}

.logo {
    font-size: 24px;
    font-weight: bold;
}

.tabs {
    display: flex;
    gap: 20px;
}

.tab {
    color: white;
    text-decoration: none;
    font-size: 18px;
}

.active-tab {
    font-weight: bold;
    border-bottom: 2px solid white;
}

.logout-button {
    background: none;
    border: none;
    cursor: pointer;
}

.logout-icon {
    width: 24px;
    height: 24px;
    filter: invert(1);
}
</style>
