<template>
    <div style="width: 300px;">
        <input-pro v-model="value" reset></input-pro>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                value: '',
            }
        }
    }
</script>
