<template>
    <div :class="classes">
        <div :class="[prefixCls + '-rel']" ref="reference" :style="[prefixRelStyle]">
            <slot></slot>
        </div>
        <transition name="fade">
            <div :class="[prefixCls + '-popper']" :style="styles" ref="popper" v-show="visible">
                <div :class="[prefixCls + '-content']">
                    <div :class="[prefixCls + '-arrow']"></div>
                    <div :class="[prefixCls + '-inner']" v-if="confirm">
                        <div :class="[prefixCls + '-body']">
                            <i class="ivu-icon ivu-icon-help-circled"></i>
                            <div :class="[prefixCls + '-body-message']"><slot name="title">{{ title }}</slot></div>
                        </div>
                        <div :class="[prefixCls + '-footer']">
                            <i-button type="text" size="small" @click.native.stop="cancel">{{ localeCancelText }}</i-button>
                            <i-button type="primary" size="small" @click.native.stop="ok">{{ localeOkText }}</i-button>
                        </div>
                    </div>
                    <div :class="[prefixCls + '-inner']" v-if="!confirm">
                        <div :class="[prefixCls + '-title']" v-if="showTitle" ref="title"><slot name="title"><div :class="[prefixCls + '-title-inner']">{{ title }}</div></slot></div>
                        <div :class="[prefixCls + '-body']">
                            <div :class="[prefixCls + '-body-content']"><slot name="content"><div :class="[prefixCls + '-body-content-inner']">{{ content }}</div></slot></div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    import Popper from 'iview/src/components/base/popper';
    import iButton from 'iview/src/components/button/button.vue';
    import { oneOf } from 'iview/src/utils/assist';
    import Locale from 'iview/src/mixins/locale';

    const prefixCls = 'ivu-poptip';

    export default {
        name: 'PoptipGlobal',
        mixins: [ Popper, Locale ],
        components: { iButton },
        props: {
            trigger: {
                validator (value) {
                    return oneOf(value, ['click', 'focus', 'hover']);
                },
                default: 'click'
            },
            placement: {
                validator (value) {
                    return oneOf(value, ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']);
                },
                default: 'top'
            },
            title: {
                type: [String, Number]
            },
            content: {
                type: [String, Number],
                default: ''
            },
            width: {
                type: [String, Number]
            },
            confirm: {
                type: Boolean,
                default: false
            },
            okText: {
                type: String
            },
            cancelText: {
                type: String
            },
            target: {
                type: HTMLElement
            }
        },
        data () {
            return {
                prefixCls: prefixCls,
                prefixRelStyle: {
                    left: `-${this.target.offsetWidth}px`,
                    width: `${this.target.offsetWidth}px`,
                    height: `${this.target.offsetHeight}px`,
                    zIndex: '-9999999',
                },
                showTitle: true,
                isInput: false
            };
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-confirm`]: this.confirm
                    }
                ];
            },
            styles () {
                let style = {};

                if (this.width) {
                    style.width = `${this.width}px`;
                }
                return style;
            },
            localeOkText () {
                if (this.okText === undefined) {
                    return this.t('i.poptip.okText');
                } else {
                    return this.okText;
                }
            },
            localeCancelText () {
                if (this.cancelText === undefined) {
                    return this.t('i.poptip.cancelText');
                } else {
                    return this.cancelText;
                }
            }
        },
        methods: {
            handleShowPopper() {
                this.timeout = setTimeout(() => {
                    this.visible = true;
                }, this.delay);
            },
            handleClosePopper() {
                clearTimeout(this.timeout);
                if (!this.controlled) {
                    this.visible = false;
                }
            },
            cancel () {
                this.visible = false;
                this.$emit('on-cancel');
            },
            ok () {
                this.visible = false;
                this.$emit('on-ok');
            }
        },
        mounted () {
            if (!this.confirm) {
//                this.showTitle = this.$refs.title.innerHTML != `<div class="${prefixCls}-title-inner"></div>`;
                this.showTitle = this.$slots.title !== undefined;
            }
        }
    };
</script>
