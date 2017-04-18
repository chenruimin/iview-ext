<template>
    <div>
        <div style="margin-bottom: 50px;">
            <span @mouseenter="showTooltip" @mouseleave="hideTooltip" placement="top-start" style="margin-right: 50px;">
                上左
            </span>
            <span @mouseenter="showTooltip" @mouseleave="hideTooltip" placement="top" style="margin-right: 50px;">
                上边
            </span>
            <span @mouseenter="showTooltip" @mouseleave="hideTooltip" placement="top-end" style="margin-right: 50px;">
                上右
            </span>
            <span @mouseenter="showTooltip" @mouseleave="hideTooltip" placement="left-start" style="margin-right: 50px;">
                左上
            </span>
            <span @mouseenter="showTooltip" @mouseleave="hideTooltip" placement="left" style="margin-right: 50px;">
                左边
            </span>
            <span @mouseenter="showTooltip" @mouseleave="hideTooltip" placement="left-end" style="margin-right: 50px;">
                左下
            </span>
        </div>
        <div style="margin-bottom: 50px;">
            <span @mouseenter="showTooltip" @mouseleave="hideTooltip" placement="right-start" style="margin-right: 50px;">
                右上
            </span>
            <span @mouseenter="showTooltip" @mouseleave="hideTooltip" placement="right" style="margin-right: 50px;">
                右边
            </span>
            <span @mouseenter="showTooltip" @mouseleave="hideTooltip" placement="right-end" style="margin-right: 50px;">
                右下
            </span>
            <span @mouseenter="showTooltip" @mouseleave="hideTooltip" placement="bottom-start" style="margin-right: 50px;">
                下左
            </span>
            <span @mouseenter="showTooltip" @mouseleave="hideTooltip" placement="bottom" style="margin-right: 50px;">
                下边
            </span>
            <span @mouseenter="showTooltip" @mouseleave="hideTooltip" placement="bottom-end" style="margin-right: 50px;">
                下右
            </span>
        </div>
        <div id="clipboard-input">
            <Input v-model="value" icon="clipboard" placeholder="请输入..." @on-click="copyValueToClipboard" style="width: 200px"></Input>
        </div>
    </div>
</template>
<script>
    import Emitter from 'tiny-emitter';
    import ClipboardAction from 'clipboard/lib/clipboard-action';

    export default {
        data () {
            return {
                value: ''
            }
        },
        methods: {
            showTooltip (event) {
                this.tooltip = this.$Tooltip.info(
                    event.target, 'tooltip test content', event.target.getAttribute('placement')
                );
            },
            hideTooltip () {
                this.tooltip.hide();
            },
            copyValueToClipboard() {
                // register copy listeners
                let emitter = new Emitter();
                emitter.on('success', () => {
                    let tooltip = this.$Tooltip.info(
                        document.getElementById('clipboard-input'), 'copy success', 'right'
                    );
                    setTimeout(() => {
                        tooltip.hide();
                    }, 2000);
                });
                emitter.on('error', () => {
                    let tooltip = this.$Tooltip.info(
                        document.getElementById('clipboard-input'), 'copy error', 'right'
                    );
                    setTimeout(() => {
                        tooltip.hide();
                    }, 2000);
                });

                // do copy
                new ClipboardAction({
                    text    : this.value,
                    emitter : emitter,
                });
            }
        }
    }
</script>
