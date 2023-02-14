<template>
  <main>
    <div class="container">
      <h1>Entertainment search</h1>
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
export default {
  name: "App",
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 2.5rem;
}
</style>
