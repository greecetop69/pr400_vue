<script setup>
import { provide, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userID = ref(null);

const setUserID = (id) => {
  userID.value = id;
  localStorage.setItem("userID", id);
};

const handleStorageChange = () => {
  const storedUserID = localStorage.getItem("userID");

  if (!storedUserID) {
    userID.value = null;
    router.push("/login");
  }
};

onMounted(() => {
  const storedUserID = localStorage.getItem("userID");

  if (storedUserID) {
    setUserID(storedUserID);
  }

  window.addEventListener("storage", handleStorageChange);
});

onUnmounted(() => {
  window.removeEventListener("storage", handleStorageChange);
});

provide("userID", userID);
provide("setUserID", setUserID);
</script>

<template>
  <div class="layout">
    <RouterView />
  </div>
</template>
