import { createApp } from 'vue'
import router from "./router"
import App from './App.vue'
import store from './store'

import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')