<template>
    <div>
        <div style="width: 300px; margin-bottom: 50px;">
            <h3>下拉是hover的形式</h3>
            <Button-with-dropdown title="请点击" trigger="hover" type="primary" @click="handleButtonClick" @select="handleItemSelect">
                <Dropdown-menu slot="list">
                    <Dropdown-item name="position-0">驴打滚</Dropdown-item>
                    <Dropdown-item name="position-1">炸酱面</Dropdown-item>
                    <Dropdown-item name="position-2" disabled>豆汁儿</Dropdown-item>
                    <Dropdown-item name="position-3">冰糖葫芦</Dropdown-item>
                    <Dropdown-item name="position-4" divided>北京烤鸭</Dropdown-item>
                </Dropdown-menu>
            </Button-with-dropdown>
        </div>
        <div style="width: 300px; margin-bottom: 50px;">
            <h3>下拉是click的形式</h3>
            <Button-with-dropdown title="请点击" trigger="click" type="success" @click="handleButtonClick" @select="handleItemSelect">
                <Dropdown-menu slot="list">
                    <Dropdown-item name="position-0">驴打滚</Dropdown-item>
                    <Dropdown-item name="position-1">炸酱面</Dropdown-item>
                    <Dropdown-item name="position-2" disabled>豆汁儿</Dropdown-item>
                    <Dropdown-item name="position-3">冰糖葫芦</Dropdown-item>
                    <Dropdown-item name="position-4" divided>北京烤鸭</Dropdown-item>
                </Dropdown-menu>
            </Button-with-dropdown>
        </div>
        <div style="width: 300px; margin-bottom: 50px;">
            <h3>不同的size</h3>
            <h4>small</h4>
            <Button-with-dropdown title="请点击" trigger="click" size="small" @click="handleButtonClick" @select="handleItemSelect">
                <Dropdown-menu slot="list">
                    <Dropdown-item name="position-0">驴打滚</Dropdown-item>
                    <Dropdown-item name="position-1">炸酱面</Dropdown-item>
                    <Dropdown-item name="position-2" disabled>豆汁儿</Dropdown-item>
                    <Dropdown-item name="position-3">冰糖葫芦</Dropdown-item>
                    <Dropdown-item name="position-4" divided>北京烤鸭</Dropdown-item>
                </Dropdown-menu>
            </Button-with-dropdown>
            <h4>large</h4>
            <Button-with-dropdown title="请点击" trigger="click" size="large" type="error" @click="handleButtonClick" @select="handleItemSelect">
                <Dropdown-menu slot="list">
                    <Dropdown-item name="position-0">驴打滚</Dropdown-item>
                    <Dropdown-item name="position-1">炸酱面</Dropdown-item>
                    <Dropdown-item name="position-2" disabled>豆汁儿</Dropdown-item>
                    <Dropdown-item name="position-3">冰糖葫芦</Dropdown-item>
                    <Dropdown-item name="position-4" divided>北京烤鸭</Dropdown-item>
                </Dropdown-menu>
            </Button-with-dropdown>
        </div>
        <div style="width: 300px; margin-bottom: 50px;">
            <h3>支持placement</h3>
            <Button-with-dropdown title="请点击" trigger="click" type="warning" @click="handleButtonClick" @select="handleItemSelect">
                <Dropdown-menu slot="list">
                    <Dropdown-item>驴打滚</Dropdown-item>
                    <Dropdown-item>炸酱面</Dropdown-item>
                    <Dropdown-item>豆汁儿</Dropdown-item>
                    <Dropdown placement="right-start">
                        <Dropdown-item>
                            北京烤鸭
                            <Icon type="ios-arrow-right"></Icon>
                        </Dropdown-item>
                        <Dropdown-menu slot="list">
                            <Dropdown-item>挂炉烤鸭</Dropdown-item>
                            <Dropdown-item>焖炉烤鸭</Dropdown-item>
                        </Dropdown-menu>
                    </Dropdown>
                    <Dropdown-item>冰糖葫芦</Dropdown-item>
                </Dropdown-menu>
            </Button-with-dropdown>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            handleButtonClick() {
                this.$Message.info(`点击了按钮`);
            },
            handleItemSelect(name) {
                this.$Message.info(`选中了 ${name}`);
            }
        }
    }
</script>
