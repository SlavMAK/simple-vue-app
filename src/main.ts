import { createApp } from 'vue'
import './style.scss'
import {BX24, BX24Dev} from '@slavmak2486/bx24ts'
import App from './App.vue'

declare global {
    interface Window {
        BX24:BX24|BX24Dev
    }
}

createApp(App).mount('#app')
