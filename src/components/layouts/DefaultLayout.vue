<template>
  <v-app id="inspire" class="app dashboard">
    <app-drawer class="app--drawer"></app-drawer>
    <app-toolbar class="app--toolbar"></app-toolbar>
    <v-content>
      <h1
        v-if="$vuetify.breakpoint.smAndUp && $route.meta.title"
        class="mt-3 ml-3"
      >
        {{ $route.meta.title }}
      </h1>
      <router-view></router-view>
    </v-content>
    <!-- Go to top -->
    <app-fab></app-fab>
  </v-app>
</template>

<script>
import AppDrawer from "@/components/AppDrawer";
import AppToolbar from "@/components/AppToolbar";
import AppFab from "@/components/AppFab";

export default {
  components: {
    AppDrawer,
    AppToolbar,
    AppFab
  }
};
</script>
