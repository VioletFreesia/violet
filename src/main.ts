import {createApp} from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'
import '@/assets/styles/iconfont.css'
import '@/assets/styles/main.css'
import 'animate.css/animate.min.css'

createApp(App).use(Antd).mount('#app')
