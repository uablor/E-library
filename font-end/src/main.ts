// import 'reflect-metadata'
// import router from './router'
// import i18n from './common/configurations/vue18n.config.ts'
// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'
// import { createPinia } from 'pinia'

// createApp(App).mount('#app')

// const app = createApp(App)

// app.use(router)
// app.use(i18n)
// app.use(createPinia())
// // registerPlugins(app)

// app.mount('#app')
import 'reflect-metadata'
import router from './router'
import i18n from './common/configurations/vue18n.config.ts'
import { createApp } from 'vue'
import './style.css'

import App from './App.vue'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(router)
app.use(i18n)
app.use(createPinia())

app.mount('#app')
