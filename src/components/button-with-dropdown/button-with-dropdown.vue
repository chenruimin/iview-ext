<template>
    <div>
        <Button-group>
            <Button :size="size" :type="type" @click="handleIconClick">{{ title }}</Button>
            <Dropdown :trigger="trigger" :placement="placement" @on-click="handleItemClick">
                <Button :size="size" :type="type" style="border-bottom-left-radius: 0; border-top-left-radius: 0;">
                    <Icon type="arrow-down-b"></Icon>
                </Button>
                <div slot="list"><slot name="list"></slot></div>
            </Dropdown>
        </Button-group>
    </div>
</template>
<script>
    import { oneOf } from 'iview/src/utils/assist';

    export default {
        name: 'ButtonWithDropdown',
        props: {
            title: String,
            type: {
                validator (value) {
                    return oneOf(value, ['primary', 'ghost', 'dashed', 'text', 'info', 'success', 'warning', 'error']);
                },
            },
            trigger: {
                validator (value) {
                    return oneOf(value, ['click', 'hover']);
                },
                default: 'click'
            },
            size: {
                validator (value) {
                    return oneOf(value, ['small', 'large']);
                }
            },
            placement: {
                validator (value) {
                    return oneOf(value, ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']);
                },
                default: 'bottom'
            },
        },
        methods: {
            handleIconClick (event) {
                this.$emit('click', event);
            },
            handleItemClick (name) {
                this.$emit('select', name);
            }
        }
    }
</script>