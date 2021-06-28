<template>
  <div class="py-3">
    <h3 class="card-title p-3 mb-3">List User</h3>
    <ul v-if="authUser" class="user-list">
      <li v-for='user in allUsers' :key='user.id'>
        <router-link
          v-if="user.id !== person.id"
          :to="{ name: 'views.chat', params: { id: user.id } }"
          class="user-item"
        >
          <div class="w-25">
            <img
              src="https://avatars.githubusercontent.com/u/98681"
              alt="user"
              class="img-fluid rounded-circle"
            />
          </div>
          <div class="w-75 box-meta">
            <strong>{{ user.name }}</strong>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  computed: {
    person() {
      return this.$store.state.user;
    },
    allUsers() {
      return this.$store.state.users;
    },
    authUser() {
      return this.$store.state.token;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #ddd;
}

::-webkit-scrollbar-thumb:hover {
  background: #999;
}

.user-list {
  padding-inline-start: 0;
  height: 75vh;
  overflow-x: auto;
}

.user-item {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.user-item:hover {
  background-color: #ddd;
}

.box-meta {
  margin: 15px;
}

.box-meta p {
  margin: 0;
}
</style>
