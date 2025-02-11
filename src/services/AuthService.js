import axios from "axios";

const api = axios.create({
    baseURL: "/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default {
    async login(login, passwordHash, setUserID) {
        try {
            const response = await api.post("/F000_10_Login", {
                Login: login,
                PasswordHash: passwordHash,
            });

            if (response.data?.Data?.UserID) {
                setUserID(response.data.Data.UserID);
                localStorage.setItem("userID", response.data.Data.UserID);
                return response.data.Data.UserID;
            } else {
                throw new Error(response.data.UM || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error.message);
            throw error;
        }
    },

    async logout(userID) {
        try {
            const response = await api.post("/F000_20_Logout", { UserID: Number(userID) });
            if (response.data?.Data?.UserID === 0) {
                return true;
            } else {
                throw new Error(response.data.UM || "Logout failed");
            }
        } catch (error) {
            console.error("Logout error:", error.message);
            throw error;
        }
    },

    async checkSession() {
        try {
            const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
                const [name, value] = cookie.split("=");
                acc[name] = value;
                return acc;
            }, {});

            return cookies.sessionID || null;
        } catch (error) {
            console.error("Ошибка проверки сессии:", error.message);
            return null;
        }
    }
};
