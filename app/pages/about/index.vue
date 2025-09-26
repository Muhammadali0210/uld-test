<template>
  <div>
    <h1>About</h1>
    <button @click="checkError">Send Request</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const data = ref({
  contact: "string",
  google_url: "string",
  img_url: "string",
  name: {
    en: "string",
    ru: "string",
    uz: "string"
  },
  yandex_url: "string"
})

const checkError = async () => {
  try {
    const res = await fetch("https://api.tom-education.uz/branches/create", {
      method: "POST",
      body: JSON.stringify(data.value),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMWEzMDEyNjUtNzUzMC00N2M4LWFlYTUtYjVjZjM3ODU1MGM4IiwibmFtZSI6IjciLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3NTg5ODgzODAsImlhdCI6MTc1ODkwMTk4MH0.YdAhgUUoGRPg4T5nWd2DfY7hqrXSLd-zCjYsUMgDonY"
      }
    })

    const result = await res.json()
    console.log("Response:", result)
  } catch (error) {
    console.error("Error:", error)
  }
}
</script>
