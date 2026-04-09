import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueCookies from 'vue-cookies'
import { createI18n } from 'vue-i18n'

// 导入样式
import '../public/base.css'
import '../public/desktop.css'
import '../public/bootstrap-icons.css'

// 导入应用样式
import '../public/apps/style/setting.css'
import '../public/apps/style/explorer.css'
import '../public/apps/style/calc.css'
import '../public/apps/style/about.css'
import '../public/apps/style/notepad.css'
import '../public/apps/style/terminal.css'
import '../public/apps/style/edge.css'
import '../public/apps/style/camera.css'
import '../public/apps/style/pythonEditor.css'
import '../public/apps/style/run.css'
import '../public/apps/style/whiteboard.css'
import '../public/apps/style/imgviewer.css'
import '../public/apps/style/code-editor.css'
import '../public/apps/style/mediaplayer.css'
import '../public/apps/style/defender.css'
import '../public/apps/style/taskmgr.css'
import '../public/apps/style/msstore.css'
import '../public/apps/style/word.css'
import '../public/apps/style/copilot.css'
import '../public/apps/style/recognition.css'
import '../public/apps/style/login.css'

// 导入模块样式
import '../public/module/tab.css'
import '../public/module/widget.css'

// 创建国际化实例
const i18n = createI18n({
  locale: localStorage.getItem('lang') || 'zh-CN',
  messages: {
    'zh-CN': {
      // 中文翻译
    },
    'en': {
      // 英文翻译
    }
  }
})

const app = createApp(App)

app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(i18n)
app.use(VueCookies)

// 全局方法
app.config.globalProperties.$setData = (key, value) => {
  localStorage.setItem(key, value)
}

app.config.globalProperties.$getData = (key) => {
  return localStorage.getItem(key)
}

app.mount('#app')
