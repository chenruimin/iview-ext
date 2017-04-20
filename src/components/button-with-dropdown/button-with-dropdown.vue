<template>
    <div>
        <Button-group>
            <Button :type="type" @click="handleIconClick">{{ title }}</Button>
            <Dropdown :trigger="trigger" @on-click="handleItemClick">
                <Button :type="type" style="border-bottom-left-radius: 0; border-top-left-radius: 0;">
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
                default: 'default'
            },
            trigger: {
                validator (value) {
                    return oneOf(value, ['click', 'hover']);
                },
                default: 'click'
            }
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