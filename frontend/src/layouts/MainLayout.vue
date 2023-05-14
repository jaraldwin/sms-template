<template>
  <q-layout view="lHh Lpr lFf">
    <!-- <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> </q-toolbar-title> -->

    <q-btn style="display: none" @click="logout" label="Logout" />
    <!-- </q-toolbar>
    </q-header> -->
    <q-drawer :width="350" v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item header class="text-h4 q-mt-lg row justify-center">
          School
        </q-item>
        <div class="q-mt-xl">
          <EssentialLink
            class="q-mt-xs"
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </div>
      </q-list>
    </q-drawer>

    <q-drawer
      :width="450"
      side="right"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item header class="text-h4 q-mt-sm"> School </q-item>
        <div class="q-mt-xl">
          <EssentialLink
            class="q-mt-xs"
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const linksList = [
  {
    title: "Dashboard",
    icon: "dashboard",
    active: true,
  },
  {
    title: "Messenger",
    icon: "messenger",
  },
  {
    title: "Calendar",
    icon: "today",
  },
  {
    title: "Database",
    icon: "info",
  },
  {
    title: "Attendance",
    icon: "people",
  },
  {
    title: "Settings",
    icon: "settings",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const $q = useQuasar();
    const router = useRouter();
    router.beforeEach((to, from, next) => {
      // Check if the route requires authentication
      if (to.meta.requiresAuth) {
        // Check if the "user" object exists in localStorage
        if (
          !$q.localStorage.getItem("accessToken") &&
          !$q.localStorage.getItem("user")
        ) {
          // If "user" object doesn't exist, redirect to the root path
          next("/"); // Redirect to the root path
        } else {
          // If "user" object exists, allow access to the route
          next();
        }
      } else {
        // If the route doesn't require authentication, allow access
        next();
      }
    });

    return {
      router,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      logout() {
        router.push("/");
        $q.localStorage.remove("user");
        $q.localStorage.remove("accessToken");
      },
    };
  },
});
</script>
