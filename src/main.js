import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import store from './store/toast'
import getProfile from './store/getProfile'


import './style.css'
import './assets/main.css'

const app = createApp(App)

app.use(VueCookies, {

})


app.use(router)
app.use(store)
app.use(getProfile)

app.mount('#app')



