import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/views/home/HomePage.vue";
import ProjectCatalog from "@/views/home/ProjectCatalog.vue";
import ProjectPage from "@/views/home/ProjectPage.vue";
import NewsFeed from "@/views/home/NewsFeed.vue";
import NewsPage from "@/views/home/NewsPage.vue"
import SearchFilter from "@/views/home/SearchFilter.vue";
import EventsCalendar from "@/views/home/EventsCalendar.vue";
import EventsPage from "@/views/home/EventsPage.vue"
import Login from "@/views/login/Login.vue"

import AdminDashboard from "@/views/admin/AdminDashboard.vue";
import ContentManagement from "@/views/admin/ContentManagement.vue";
import ProjectManagement from "@/views/admin/ProjectManagement.vue";
import UserManagement from "@/views/admin/UserManagement.vue";

import Messaging from "@/views/startup/Messaging.vue";
import Opportunities from "@/views/startup/Opportunities.vue";
import StartupProfile from "@/views/startup/StartupProfile.vue";

const routes = [
  { path: "/", name: "home", component: HomePage },
  { path: "/home/catalog", name: "catalog", component: ProjectCatalog },
  { path: "/home/project/:id", name: "project", component: ProjectPage },
  { path: "/home/news", name: "news", component: NewsFeed },
  { path: "/home/news/:id", name: "info", component: NewsPage},
  { path: "/home/search", name: "search", component: SearchFilter },
  { path: "/home/events", name: "events", component: EventsCalendar },
  { path: "/home/events/:id", name: "event", component: EventsPage},
  { path: "/login", name: "login", component: Login},

  { path: "/admin/dashboard", name: "dashboard", component: AdminDashboard },
  { path: "/admin/projects", name: "admin-projects", component: ProjectManagement },
  { path: "/admin/users", name: "admin-users", component: UserManagement },
  { path: "/admin/content", name: "admin-content", component: ContentManagement },

  { path: "/startup/profile", name: "startup-profile", component: StartupProfile },
  { path: "/startup/messaging", name: "startup-messaging", component: Messaging },
  { path: "/startup/opportunities", name: "startup-opportunities", component: Opportunities },

  {path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/pages/pageNotFound.vue')},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;