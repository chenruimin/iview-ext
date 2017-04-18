/**
 * Created by ruimin on 2017/4/15.
 */

import TooltipGlobal from './tooltip-global.vue';
import Vue from 'vue';

const tooltipPool = {};
let seed = 0;

function getUuid () {
    const now = Date.now();
    return 'tooltip_global_' + now + '_' + (seed++);
}

function show (target, content, placement) {
    let tooltip = null;
    let tooltipId = target.getAttribute('tooltip-id');

    if (tooltipId) {
        tooltip = tooltipPool[tooltipId];
    } else {
        const div = document.createElement('div');
        div.setAttribute('style', `display: inline-block; position: absolute;`);
        div.innerHTML = `<Tooltip-Global :content="content" :placement="placement" :target="target"></Tooltip-Global>`;
        target.appendChild(div);

        tooltip = new Vue({
            el: div,
            data: {
                content,
                placement,
                target,
            },
            components: {TooltipGlobal}
        }).$children[0];

        let uuid = getUuid();
        tooltipPool[uuid] = tooltip;
        target.setAttribute('tooltip-id', uuid);
    }

    tooltip.handleShowPopper();

    // 用于手动消除
    return {
        hide: () => {
            tooltip.handleClosePopper();
        }
    };
}

export default {
    info (target, content, placement) {
        return show(target, content, placement);
    },
}