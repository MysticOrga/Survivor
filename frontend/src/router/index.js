import { createRouter, createWebHistory } from "vue-router";
import { jwtDecode } from "jwt-decode";

import HomePage from "@/views/home/HomePage.vue";
import ProjectCatalog from "@/views/home/ProjectCatalog.vue";
import ProjectPage from "@/views/home/ProjectPage.vue";
import ProjectDetails from "@/views/home/ProjectDetails.vue";
import NewsFeed from "@/views/home/NewsFeed.vue";
import NewsPage from "@/views/home/NewsPage.vue";
import SearchFilter from "@/views/home/SearchFilter.vue";
import EventsCalendar from "@/views/home/EventsCalendar.vue";
import EventsPage from "@/views/home/EventsPage.vue";
import Login from "@/views/login/Login.vue";

import AdminDashboard from "@/views/admin/AdminDashboard.vue";
import ContentManagement from "@/views/admin/ContentManagement.vue";
import ProjectManagement from "@/views/admin/ProjectManagement.vue";
import UserManagement from "@/views/admin/UserManagement.vue";

import Messaging from "@/views/startup/Messaging.vue";
import Opportunities from "@/views/startup/Opportunities.vue";
import OpportunitiesProject from "@/views/startup/OpportunitiesProject.vue";
import OpportunitiesFundings from "@/views/startup/OpportunitiesFundings.vue";
import OpportunitiesMatchings from "@/views/startup/OpportunitiesMatchings.vue";
import StartupProfile from "@/views/startup/StartupProfile.vue";
import InvestorMessaging from "@/views/investor/investorMessaging.vue";

const routes = [
  { path: "/", name: "home", component: HomePage },
  { path: "/home/catalog", name: "catalog", component: ProjectCatalog },
  { path: "/home/startup/:id", name: "project", component: ProjectPage },
  { path: "/home/project/:id", name: "project-details", component: ProjectDetails },
  { path: "/home/news", name: "news", component: NewsFeed },
  { path: "/home/news/:id", name: "info", component: NewsPage },
  { path: "/home/search", name: "search", component: SearchFilter },
  { path: "/home/events", name: "events", component: EventsCalendar },
  { path: "/home/events/:id", name: "event", component: EventsPage },
  { path: "/login", name: "login", component: Login },

  {
    path: "/investor/messaging",
    name: "investor-messaging",
    component: InvestorMessaging,
    meta: { requiresAuth: true, roles: ["investor"] }
  },

  {
    path: "/admin/dashboard",
    name: "dashboard",
    component: AdminDashboard,
    meta: { requiresAuth: true, roles: ["admin"] }
  },
  {
    path: "/admin/project/:id",
    name: "admin-project",
    component: ProjectManagement,
    meta: { requiresAuth: true, roles: ["admin"] }
  },
  {
    path: "/admin/users",
    name: "admin-users",
    component: UserManagement,
    meta: { requiresAuth: true, roles: ["admin"] }
  },
  {
    path: "/admin/content",
    name: "admin-content",
    component: ContentManagement,
    meta: { requiresAuth: true, roles: ["admin"] }
  },

  {
    path: "/startup/profile",
    name: "startup-profile",
    component: StartupProfile,
    meta: { requiresAuth: true, roles: ["founder"] }
  },
  {
    path: "/startup/messaging",
    name: "startup-messaging",
    component: Messaging,
    meta: { requiresAuth: true, roles: ["founder"] }
  },
  {
    path: "/startup/opportunities",
    name: "startup-opportunities",
    component: Opportunities,
    meta: { requiresAuth: true, roles: ["founder"] }
  },
  {
    path: "/startup/opportunities/:id",
    name: "opportunities-project",
    component: OpportunitiesProject,
    meta: { requiresAuth: true, roles: ["founder"]}
  },
  {
    path: "/startup/opportunities/fundings/:id",
    name: "opportunities-fundings",
    component: OpportunitiesFundings,
    meta: { requiresAuth: true, roles: ["founder"]}
  },
  {
    path: "/startup/opportunities/matchings/:id",
    name: "opportunities-matchings",
    component: OpportunitiesMatchings,
    meta: { requiresAuth: true, roles: ["founder"]}
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/pages/pageNotFound.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

function getUserRole() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const decoded = jwtDecode(token);
  return decoded.role;
}

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const userRole = getUserRole();

  if (to.meta.requiresAuth) {
    if (!token) return next({ name: "login" });
    if (to.meta.roles && !to.meta.roles.includes(userRole)) {
      return next({ name: "home" });
    }
  }

  next();
});

export default router;
