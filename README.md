# iView Extras

## 如何运行

```
npm install
npm run dev
```

在执行"npm run dev"之前，需要将 node_modules/iview/src/index.js 中最后一行的"module.exports ="改成"export default"。

webpack认为这两种方式只能二选一，可能在webpack命令里面加参数可以解决，这一点我还没有研究。

## 组件Api

### Tooltip

```javascript
// show
let tooltip = this.$Tooltip.info(target, 'I am content', 'top');

// hide
tooltip.hide();
```

### Poptip

```javascript
// show info
let poptip = this.$Poptip.info(target, 'I am content', 'right');

// show card
let poptip = this.$Poptip.card(target, 'I am title', 'I am content', 'right');

// show confirm
let poptip = this.$Poptip.confirm(target, 'Are you ok?', 'top', ()=> {/* ok */}, ()=> {/* cancel */});

// show confirm with custom button
let poptip = this.$Poptip.confirm(target, 'Are you ok?', 'top', ()=> {/* ok */}, ()=> {/* cancel */}, 'ok', 'cancel');

// show modal
let poptip = this.$Poptip.modal(target, '<div>html</div>', 'top');

// hide
poptip.hide();
```

### InputPro

* 注：暂时只是在Input的功能上增加了reset按钮的功能，起InputPro这个名字只是为了后续基于Input的扩展继续使用这个组件。

```html
<input-pro v-model="value" reset></input-pro>
```

加上reset的标记即可开启一键清除input中内容的功能，其他的使用方式和input相同，除了下面这点例外：reset的x按钮占用的是icon位置，因此，设置了reset后icon会被覆盖。

### ButtonWithDropdown

```html
<Button-with-dropdown title="请点击" trigger="hover" type="primary" @click="handleButtonClick" @select="handleItemSelect">
    <Dropdown-menu slot="list">
        <Dropdown-item name="position-0">驴打滚</Dropdown-item>
        <Dropdown-item name="position-1">炸酱面</Dropdown-item>
        <Dropdown-item name="position-2" disabled>豆汁儿</Dropdown-item>
        <Dropdown-item name="position-3">冰糖葫芦</Dropdown-item>
        <Dropdown-item name="position-4" divided>北京烤鸭</Dropdown-item>
    </Dropdown-menu>
</Button-with-dropdown>
```

1. type 的取值可参考Button的type，默认为 default
2. trigger 可为 hover 或者 click，默认为 click （区别于Dropdown组件默认是hover，考虑到当前场景下 click 的概率更大）
3. title 是左边按钮的显示内容，@click 是左边按钮被点击的事件，@select 是下拉中任意一个item被点击的事件
4. Dropdown-menu 和 Dropdown-item 参考iview的相关组件，未做改变。只需在Dropdown-menu上加 slot="list"，这是**必需**的

## 改动

### 2017.04.18
关闭popper的方式由 poptip() 改成 poptip.hide() ，让其更加语义化。

## 存在问题

里面还是存在一些样式上的问题，主要是 event.target 捕获到的不一定是最合适的HTMLElement。

因为很多iview的Component，最后渲染的时候，可能是2-3层的嵌套，嵌套里的任何一层，都能拿到click或者mouse事件，就导致了点击的时候拿到的event.target有可能不相同。这时候popper弹出的位置就会有细微的不同。

