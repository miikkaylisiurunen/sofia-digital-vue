import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import DetailsViewVue from "@/views/DetailsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/:id",
      name: "details",
      component: DetailsViewVue,
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: () => {
        return { path: "/", query: {} };
      },
    },
  ],
});

export default router;
