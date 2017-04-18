/**
 * Created by ruimin on 2017/4/15.
 */

import PoptipGlobal from './poptip-global.vue';
import Vue from 'vue';

const popDivStyle = `display: inline-block; position: absolute; text-align: left; color: #657180;`;
const poptipPool = {};
let seed = 0;

function getUuid () {
    const now = Date.now();
    return 'poptip_global_' + now + '_' + (seed++);
}

function _show (target, poptipCreater) {
    let poptip = null;
    let poptipId = target.getAttribute('poptip-id');

    if (poptipId) {
        poptip = poptipPool[poptipId];
    } else {
        poptip = poptipCreater();

        let uuid = getUuid();
        poptipPool[uuid] = poptip;
        target.setAttribute('poptip-id', uuid);
    }

    poptip.handleShowPopper();

    return {
        hide: () => {
            poptip.handleClosePopper();
        }
    };
}

function showInfo (target, content, placement) {
    return _show(target, () => {
        const div = document.createElement('div');
        div.setAttribute('style', popDivStyle);
        div.innerHTML = `<Poptip-Global :content="content" :placement="placement" :target="target"></Poptip-Global>`;
        target.appendChild(div);

        return new Vue({
            el: div,
            data: {
                content,
                placement,
                target,
            },
            components: {PoptipGlobal}
        }).$children[0];
    });
}

function showConfirm (target, title, okCallback, cancelCallback, okText, cancelText) {
    return _show(target, () => {
        const div = document.createElement('div');
        div.setAttribute('style', popDivStyle);
        div.innerHTML = `<Poptip-Global confirm :title="title" @on-ok="okCallback" @on-cancel="cancelCallback" :ok-text="okText" :cancel-text="cancelText" :target="target" placement="top"></Poptip-Global>`;
        target.appendChild(div);

        return new Vue({
            el: div,
            data: {
                target,
                title,
                okCallback,
                cancelCallback,
                okText,
                cancelText,
            },
            components: {PoptipGlobal}
        }).$children[0];
    })
}

function showModal (target, content, placement) {
    return _show(target, () => {
        const div = document.createElement('div');
        div.setAttribute('style', popDivStyle);
        div.innerHTML = `<Poptip-Global :placement="placement" :target="target">${content}</Poptip-Global>`;
        target.appendChild(div);

        return new Vue({
            el: div,
            data: {
                placement,
                target,
            },
            components: {PoptipGlobal}
        }).$children[0];
    });
}

export default {
    info (target, content, placement) {
        return showInfo(target, content, placement);
    },
    confirm (target, title, okCallback, cancelCallback, okText, cancelText) {
        return showConfirm(target, title, okCallback, cancelCallback, okText, cancelText);
    },
    modal (target, content, placement) {
        return showModal(target, content, placement);
    }
}