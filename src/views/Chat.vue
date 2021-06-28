<template>
  <div class="card border-0">
    <div class="card-header">
      <div class="d-flex align-items-center">
        <div class="card-image">
          <img
            src="https://avatars.githubusercontent.com/u/98681"
            alt="user"
            class="img-fluid rounded-circle"
          />
        </div>
        <div class="box-meta">
          <strong class="p-3">{{
            chatUser(parseInt($route.params.id)).name
          }}</strong>
        </div>
        <div class="box-close ms-auto p-3">
          <router-link
            :to="{ name: 'views.index' }"
            class="btn btn-outline-primary"
            >X</router-link
          >
        </div>
      </div>
    </div>
    <div class="card-body bg-light card-message">
      <ul ref="list" v-if="chatMessage">
        <li
          v-for="item in chatMessage.data[0]"
          :key="item.id"
          class="m-3"
          :class="item.id_user_sender == person.id ? 'send' : 'receiver'"
        >
          <p>{{ item.text }}</p>
        </li>
      </ul>
    </div>
    <div class="card-footer">
      <div class="input-group mb-3">
        <textarea
          v-model="text"
          class="form-control"
          aria-describedby="button-addon2"
        ></textarea>
        <button
          @click="sendMessage"
          class="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
        >
          send
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  name: "Chat",
  data() {
    return {
      text: "",
      socket: io("http://localhost:3001"),
    };
  },
  methods: {
    chatUser(id) {
      return this.$store.state.users.find((user) => user.id === id);
    },
    sendMessage: function () {
      let data = {
        id_user_sender: this.person.id,
        id_user_receiver: parseInt(this.$route.params.id),
        text: this.text,
      };
      this.$store.dispatch("sendMessage", data).then(() => {
        this.socket.emit("SEND_MESSAGE", data);
        this.text = "";
      });
    },
  },
  computed: {
    person() {
      return this.$store.state.user;
    },
    chatMessage() {
      let find = this.$store.state.chat.find(
        (chat) => chat.id === parseInt(this.$route.params.id)
      );
      if (!find) {
        this.$store.dispatch("detailChat", this.$route.params.id);
        find = this.$store.state.chat.find(
          (chat) => chat.id === parseInt(this.$route.params.id)
        );
      }
      return find;
    },
  },
  created() {
    this.socket.on("MESSAGE", (data) => {
      if (data.id_user_sender !== this.person.id) {
        this.$store.dispatch("AddMessage", data);
      }
    });
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
}

.card-image {
  width: 10%;
}

.card-meta {
  width: 90%;
}

.card-message {
  height: 70vh;
  overflow: auto;
}

.send {
  text-align: right;
}

.send p {
  padding: 15px;
  color: #f2f2f2;
  text-align: left;
  display: inline-block;
  background-color: #3390ec;
}

.receiver p {
  display: inline-block;
  background-color: #fff;
  padding: 15px;
}
</style>