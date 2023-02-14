<template>
  <form @submit.prevent="$router.push({ query: { q: query } })">
    <label for="title">Title:</label>
    <input
      type="text"
      name="title"
      id="title"
      placeholder="Title..."
      v-model="query"
    />
    <button>Search</button>
  </form>
  <p v-if="loading">Loading...</p>
  <p v-else-if="error">{{ error }}</p>
  <SearchResults v-else :results="results" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchResults from "@/components/SearchResults.vue";
import { SearchPayload, SearchItem } from "@/types";

export default defineComponent({
  name: "HomeView",
  components: {
    SearchResults,
  },
  data(): {
    query: string;
    loading: boolean;
    error: string | null;
    results: SearchItem[];
  } {
    return {
      query: "",
      loading: false,
      error: null,
      results: [],
    };
  },
  created() {
    this.$watch(
      () => this.$route.query,
      () => {
        const q = this.parseQuery();
        if (q) {
          this.query = q;
          this.fetchData(q);
        } else {
          this.query = "";
          this.results = [];
          this.error = null;
          this.loading = false;
        }
      },
      { immediate: true }
    );
  },
  methods: {
    parseQuery(): string | null {
      const { q } = this.$route.query;
      if (!q) {
        return null;
      } else if (typeof q === "string") {
        return q;
      } else {
        return q[0];
      }
    },
    async fetchData(q: string) {
      this.loading = true;
      this.results = [];
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?s=${q.trim()}&apikey=4e4ca836`
        );
        const data = await res.json();
        const parsedData = SearchPayload.parse(data);
        if (parsedData.Response === "True") {
          this.results = parsedData.Search;
          this.error = null;
        } else {
          this.results = [];
          this.error = parsedData.Error;
        }
        this.loading = false;
      } catch (err) {
        this.error = "An error occurred";
        this.results = [];
        this.loading = false;
      }
    },
  },
});
</script>

<style scoped>
form {
  max-width: 15rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1rem;
}

label {
  font-size: 1rem;
}

input {
  font-size: 1rem;
  outline: none;
  border: 1px solid #a3a3a3;
  padding: 0.3rem 0.3rem;
  border-radius: 0.4rem;
  width: 100%;
}

input:focus {
  border-color: #3b82f6;
}

button {
  background-color: #f5f5f5;
  outline: none;
  border: 1px solid #a3a3a3;
  padding: 0.3rem 0.7rem;
  font-size: 1rem;
  border-radius: 0.4rem;
  cursor: pointer;
  width: 100%;
  margin-top: 0.5rem;
  color: currentColor;
}

button:hover {
  background-color: #e5e5e5;
}

button:active {
  background-color: #d4d4d4;
}

button:focus-visible {
  border: 1px #3b82f6 solid;
}
</style>
