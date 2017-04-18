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

```
// show
let tooltip = this.$Tooltip.info(target, 'I am content', 'top');

// hide
tooltip.hide();
```

### Poptip

```
// show
// show info
let poptip = this.$Poptip.info(target, 'I am content', 'right');
// show confirm
let poptip = this.$Poptip.confirm(target, 'Are you ok?', ()=> {/* ok */}, ()=> {/* cancel */});
// show confirm with custom button
let poptip = this.$Poptip.confirm(target, 'Are you ok?', ()=> {/* ok */}, ()=> {/* cancel */}, 'ok', 'cancel');
// show modal
let poptip = this.$Poptip.modal(target, '<div>html</div>', 'top');

// hide
poptip.hide();
```

## 改动

关闭popper的方式由 poptip() 改成 poptip.hide() ，让其更加语义化。

## 存在问题

里面还是存在一些样式上的问题，主要是 event.target 捕获到的不一定是最合适的HTMLElement。

因为很多iview的Component，最后渲染的时候，可能是2-3层的嵌套，嵌套里的任何一层，都能拿到click或者mouse事件，就导致了点击的时候拿到的event.target有可能不相同。这时候popper弹出的位置就会有细微的不同。

