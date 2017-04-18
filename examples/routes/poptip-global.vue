<template>
    <div>
        <div style="margin-bottom: 50px;">
            <span @mouseenter="showPoptip" @mouseleave="hidePoptip" placement="top-start" style="margin-right: 50px;">
                上左
            </span>
            <span @mouseenter="showPoptip" @mouseleave="hidePoptip" placement="top" style="margin-right: 50px;">
                上边
            </span>
            <span @mouseenter="showPoptip" @mouseleave="hidePoptip" placement="top-end" style="margin-right: 50px;">
                上右
            </span>
            <span @mouseenter="showPoptip" @mouseleave="hidePoptip" placement="left-start" style="margin-right: 50px;">
                左上
            </span>
            <span @mouseenter="showPoptip" @mouseleave="hidePoptip" placement="left" style="margin-right: 50px;">
                左边
            </span>
            <span @mouseenter="showPoptip" @mouseleave="hidePoptip" placement="left-end" style="margin-right: 50px;">
                左下
            </span>
        </div>
        <div style="margin-bottom: 50px;">
            <span @mouseenter="showPoptip" @mouseleave="hidePoptip" placement="right-start" style="margin-right: 50px;">
                右上
            </span>
            <span @mouseenter="showPoptip" @mouseleave="hidePoptip" placement="right" style="margin-right: 50px;">
                右边
            </span>
            <span @mouseenter="showPoptip" @mouseleave="hidePoptip" placement="right-end" style="margin-right: 50px;">
                右下
            </span>
            <span @mouseenter="showPoptip" @mouseleave="hidePoptip" placement="bottom-start" style="margin-right: 50px;">
                下左
            </span>
            <span @mouseenter="showPoptip" @mouseleave="hidePoptip" placement="bottom" style="margin-right: 50px;">
                下边
            </span>
            <span @mouseenter="showPoptip" @mouseleave="hidePoptip" placement="bottom-end" style="margin-right: 50px;">
                下右
            </span>
        </div>
        <div style="margin-bottom: 150px;">
            <Input v-model="value" icon="clipboard" placeholder="请输入..." @on-click="copyValueToClipboard" style="width: 200px"></Input>
        </div>
        <div style="margin-left:100px; margin-bottom: 50px;">
            <Button @click="showConfirm" v-clickoutside="hideConfirm">Confirm</Button>
            <Button @click="showConfirm2" v-clickoutside="hideConfirm2">Confirm i18n</Button>
            <Button @click="toggleModal">Modal</Button>
        </div>
    </div>
</template>
<script>
    import Emitter from 'tiny-emitter';
    import ClipboardAction from 'clipboard/lib/clipboard-action';
    import clickoutside from 'iview/src/directives/clickoutside';

    export default {
        directives: { clickoutside },
        data () {
            return {
                value: ''
            }
        },
        methods: {
            showPoptip (event) {
                this.poptip = this.$Poptip.info(
                    event.target, 'poptip test content', event.target.getAttribute('placement')
                );
            },
            hidePoptip () {
                this.poptip.hide();
            },
            copyValueToClipboard() {
                // register copy listeners
                let emitter = new Emitter();
                emitter.on('success', () => {
                    let poptip = this.$Poptip.info(
                        event.target, 'copy success', 'right'
                    );
                    setTimeout(() => {
                        poptip.hide();
                    }, 2000);
                });
                emitter.on('error', () => {
                    let poptip = this.$Poptip.info(
                        document.getElementById('clipboard-input'), 'copy error', 'right'
                    );
                    setTimeout(() => {
                        poptip.hide();
                    }, 2000);
                });

                // do copy
                new ClipboardAction({
                    text    : this.value,
                    emitter : emitter,
                });
            },
            showConfirm(event) {
                if (!this.poptipConfirm) {
                    this.poptipConfirm = this.$Poptip.confirm(
                        event.target, //document.getElementById('confirm-button'),
                        'Are you ok?',
                        () => {
                            console.log('click ok');
                            this.poptipConfirm = null;
                        },
                        () => {
                            console.log('click cancel');
                            this.poptipConfirm = null;
                        }
                    );
                }
            },
            hideConfirm() {
                this.poptipConfirm && this.poptipConfirm.hide();
                this.poptipConfirm = null;
            },
            showConfirm2(event) {
                if (!this.poptipConfirm2) {
                    this.poptipConfirm2 = this.$Poptip.confirm(
                        event.target,
                        'Are you ok?',
                        () => {
                            console.log('click ok');
                            this.poptipConfirm = null;
                        },
                        () => {
                            console.log('click cancel');
                            this.poptipConfirm = null;
                        },
                        'ok',
                        'cancel'
                    );
                }
            },
            hideConfirm2() {
                this.poptipConfirm2 && this.poptipConfirm2.hide();
                this.poptipConfirm2 = null;
            },
            toggleModal(event) {
                if (this.poptipModal) {
                    this.poptipModal.hide();
                    this.poptipModal = null;
                } else {
                    this.poptipModal = this.$Poptip.modal(
                        event.target,
                        `
                            <div class="api" slot="content">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>版本号</th>
                                            <th>更新时间</th>
                                            <th>说明</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>0.9.5</td>
                                            <td>2016-10-26</td>
                                            <td>新增信息提示组件 <code>Tooltip</code>和<code>Poptip</code></td>
                                        </tr>
                                        <tr>
                                            <td>0.9.4</td>
                                            <td>2016-10-25</td>
                                            <td>新增对话框组件 <code>Modal</code></td>
                                        </tr>
                                        <tr>
                                            <td>0.9.2</td>
                                            <td>2016-09-28</td>
                                            <td>新增选择器组件 <code>Select</code></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        `,
                        'right'
                    );
                }
            },
        }
    }
</script>
