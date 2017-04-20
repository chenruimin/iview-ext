// es6 polyfill
import 'core-js/fn/array/find-index';

import TooltipGlobal from './components/tooltip-global';
import PoptipGlobal from './components/poptip-global';
import InputPro from './components/input-pro';
import ButtonWithDropdown from './components/button-with-dropdown';

const iviewExt = {
    TooltipGlobal,
    PoptipGlobal,
    InputPro,
    ButtonWithDropdown,
};

const install = function (Vue, opts = {}) {
    Object.keys(iviewExt).forEach((key) => {
        Vue.component(key, iviewExt[key]);
    });

    Vue.prototype.$Tooltip = TooltipGlobal;
    Vue.prototype.$Poptip = PoptipGlobal;
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default Object.assign(iviewExt, {install});   // eslint-disable-line no-undef
