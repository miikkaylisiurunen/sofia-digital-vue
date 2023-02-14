<template>
  <div class="results-wrapper">
    <router-link
      v-for="result in results"
      class="result-item"
      :key="result.imdbID"
      :to="result.imdbID"
    >
      <div class="image-wrapper">
        <img :src="result.Poster" alt="Poster" v-if="result.Poster !== 'N/A'" />
      </div>
      <div class="details">
        <p class="title">{{ result.Title }}</p>
        <p class="year">{{ result.Year }}</p>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { SearchItem } from "@/types";

export default defineComponent({
  name: "SearchResults",
  props: {
    results: {
      type: Array as PropType<SearchItem[]>,
      required: true,
    },
  },
});
</script>

<style scoped>
.results-wrapper {
  max-width: 25rem;
  width: 100%;
}

.result-item {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 0.4rem;
  border: 1px solid #a3a3a3;
  color: currentColor;
  text-decoration: none;
}

.image-wrapper {
  width: 4rem;
  height: 6rem;
  margin-right: 1rem;
  border-radius: 0.3rem;
  background-color: #d4d4d4;
  flex-shrink: 0;
  overflow: hidden;
}

img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.details {
  color: #000;
}

.title {
  font-weight: 500;
  font-size: 1.2rem;
}

.year {
  font-weight: 300;
  font-size: 1rem;
}
</style>
