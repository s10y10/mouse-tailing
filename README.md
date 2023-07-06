# 屏幕鼠标拖尾效果

快速实现页面中鼠标拖尾的效果

[![mouse-tailing Example](https://raw.githubusercontent.com/s10y10/mouse-tailing/master/example/example.gif)](https://github.com/s10y10/mouse-tailing)

## 安装

```
npm install --save mouse-tailing
```

## mouse-tailing API
### createMouseTailing 创建鼠标拖尾

```
import { createMouseTailing } from 'mouse-tailing'
createMouseTailing(TailConfig)
```

### `createMouseTailing()` 接受一个 <b>TailConfig</b> 对象类型

### TailConfig 拖尾配置，所有字段均为非必传项

```
{
    // 拖尾类型 star|circle|heart|icon|sky
    type:'star',

    // 显示拖尾用的dom容器,可以直接传一个HTMLElement对象或者一个querySelector字符串
    el:document.body,

    // 覆盖默认颜色, Hex颜色格式字符串
    color: '#FFFFFF',

    // 每次移动过程创建拖尾的数量
    count:1,

    // 拖尾存在的时间,毫秒
    duration:1000,

    // 给canvas画布一个识别用class类名
    className:'canvas-tailing'

    // 当type=icon时,需要传入icon的url
    url:'http://xxxxxx'
}
```