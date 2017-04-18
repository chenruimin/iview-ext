/**
 * Created by aresn on 16/6/20.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import iView from 'iview/src/index';
import iViewExt from '../src/index';
// import locale from '../src/locale/lang/en-US';
import locale from 'iview/src/locale/lang/zh-CN';
import TooltipGlobal from './routes/tooltip-global.vue';
import PoptipGlobal from './routes/poptip-global.vue';

Vue.use(VueRouter);
Vue.use(iView, { locale });
Vue.use(iViewExt, { locale });

// 开启debug模式
Vue.config.debug = true;

// 路由配置
const router = new VueRouter({
    routes: [
        {
            path: '/tooltip-global',
            component: TooltipGlobal
        },
        {
            path: '/poptip-global',
            component: PoptipGlobal
        }
    ]
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
