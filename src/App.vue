<template>
  <div class="container bg-light mt-5">
    <div class="row">
      <div class="col-md-4">
        <sidebar />
      </div>
      <div class="col-md-8">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>

import sidebar from "./components/Sidebar.vue";

export default {
  name: "App",
  components: {
    sidebar,
  }
};
</script>