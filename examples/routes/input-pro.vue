<template>
    <div>
        <div style="width: 300px;margin-bottom: 30px;">
            <h3>有reset无icon的情况</h3>
            <input-pro v-model="value1" reset @on-reset="handleReset"></input-pro>
        </div>
        <div style="width: 300px;margin-bottom: 30px;">
            <h3>有reset同时也有icon的情况</h3>
            <input-pro reset v-model="value2" icon="search" @on-click="handleClick"></input-pro>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                value1: '',
                value2: '',
            }
        },
        methods: {
            handleReset() {
                this.$Message.info('Reset button is clicked');
            },
            handleClick() {
                this.$Message.info(`Icon is clicked, current value is "${this.value2}"`);
            }
        }
    }
</script>
