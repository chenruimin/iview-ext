<template>
    <div :class="[prefixCls]">
        <div :class="[prefixCls + '-rel']" ref="reference" :style="[prefixRelStyle]">
            <slot></slot>
        </div>
        <transition name="fade">
            <div :class="[prefixCls + '-popper']" ref="popper" v-show="!disabled && (visible || always)">
                <div :class="[prefixCls + '-content']">
                    <div :class="[prefixCls + '-arrow']"></div>
                    <div :class="[prefixCls + '-inner']">
                        <slot name="content">{{ content }}</slot>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    import Popper from 'iview/src/components/base/popper';
    import {oneOf} from 'iview/src/utils/assist';

    const prefixCls = 'ivu-tooltip';

    export default {
        name: 'TooltipGlobal',
        mixins: [Popper],
        props: {
            placement: {
                validator (value) {
                    return oneOf(value, ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']);
                },
                default: 'bottom'
            },
            content: {
                type: [String, Number],
                default: ''
            },
            delay: {
                type: Number,
                default: 0
            },
            disabled: {
                type: Boolean,
                default: false
            },
            controlled: {    // under this prop,Tooltip will not close when mouseleave
                type: Boolean,
                default: false
            },
            always: {
                type: Boolean,
                default: false
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
            };
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
            }
        }
    };
</script>
