<template>
  <p v-if="loading">Loading...</p>
  <p v-else-if="error">{{ error }}</p>
  <div v-else-if="details" class="details-container">
    <h2>{{ details.Title }}</h2>
    <div class="line" v-for="detail in detailsToRender" :key="detail">
      <p class="bold">{{ detail }}</p>
      <p>{{ details[detail] }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { DetailsPayload, ItemDetails } from "@/types";

export default defineComponent({
  name: "DetailsView",
  data(): {
    details: ItemDetails | null;
    loading: boolean;
    error: string | null;
    detailsToRender: (keyof ItemDetails)[];
  } {
    return {
      details: null,
      loading: false,
      error: null,
      detailsToRender: [
        "Actors",
        "Awards",
        "Country",
        "Director",
        "Genre",
        "Plot",
        "Rated",
        "Released",
        "Runtime",
        "Type",
        "Writer",
      ],
    };
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        const id = this.parseId();
        if (id) {
          this.fetchData(id);
        } else {
          this.details = null;
          this.error = "Invalid IMDb ID format.";
          this.loading = false;
        }
      },
      { immediate: true }
    );
  },
  methods: {
    parseId(): string | null {
      let { id } = this.$route.params;
      if (typeof id !== "string") {
        id = id[0];
      }

      if (/^tt[0-9]{6,8}$/.test(id.trim())) {
        return id.trim();
      } else {
        return null;
      }
    },
    async fetchData(id: string) {
      this.loading = true;
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=4e4ca836&plot=full`
        );
        const data = await res.json();
        const parsedData = DetailsPayload.parse(data);
        if (parsedData.Response === "True") {
          this.details = parsedData;
          this.error = null;
        } else {
          this.details = null;
          this.error = parsedData.Error;
        }
        this.loading = false;
      } catch (err) {
        this.error = "An error occurred";
        this.details = null;
        this.loading = false;
      }
    },
  },
});
</script>

<style scoped>
h2 {
  font-size: 2rem;
}

.details-container {
  width: 100%;
  max-width: 70rem;
  background-color: gray;
  padding: 2rem;
  border-radius: 1rem;
  background-color: #f5f5f5;
  border: 1px solid #a3a3a3;
}

.line {
  margin-top: 0.5rem;
  font-size: 1.1rem;
}

.bold {
  font-weight: 600;
}
</style>
