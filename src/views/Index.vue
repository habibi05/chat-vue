<template>
  <div class="card border-0">
    <div class="card-header p-3">
      <h3>Start Message</h3>
    </div>
    <div class="card-body bg-light card-message">
      Hii : {{ person.name }}
      <div class="messages" v-for="(msg, index) in messages" :key="index">
        <p>
          <span class="font-weight-bold">{{ msg.user }}: </span
          >{{ msg.message }}
        </p>
      </div>
    </div>
    <div class="card-footer">
      <form @submit.prevent="sendMessage">
        <div class="gorm-group">
          <label for="user">User:</label>
          <input type="text" v-model="user" class="form-control" />
        </div>
        <div class="gorm-group pb-3">
          <label for="message">Message:</label>
          <input type="text" v-model="message" class="form-control" />
        </div>
        <button type="submit" class="btn btn-success">Send</button>
      </form>
    </div>
  </div>
</template>

<style>
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
  display: inline-block;
  background-color: #dcf8c6;
  padding: 15px;
}

.recive p {
  display: inline-block;
  background-color: #fff;
  padding: 15px;
}
</style>

<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      user: "",
      message: "",
      messages: [],
      socket: io("http://localhost:3001"),
    };
  },
  computed: {
    islogin() {
      return this.$store.state.token;
    },
    person() {
      return this.$store.state.user;
    },
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();

      this.socket.emit("SEND_MESSAGE", {
        user: this.user,
        message: this.message,
      });
      this.message = "";
    },
  },
  created() {
    this.$store.dispatch("getUsers");
    // this.socket.on("MESSAGE", (data) => {
    //   this.messages = [...this.messages, data];
    //   // you can also do this.messages.push(data)
    //   // console.log(data);
    // });
  },
};
</script>