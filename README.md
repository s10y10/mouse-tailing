# 屏幕鼠标拖尾效果

快速实现页面中鼠标拖尾的效果

[![mouse-tailing Example](https://raw.githubusercontent.com/s10y10/mouse-tailing/master/example/example.gif)](https://github.com/s10y10/mouse-tailing)

## 安装

```
npm install --save mouse-tailing
```

## 使用
##  创建鼠标拖尾

```
import { createMouseTailing } from 'mouse-tailing'
createMouseTailing(TailConfig)
```
```
参数
export interface TailConfig = {
    // 拖尾类型 star|circle|heart|icon
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

## 创建画布特效
```
import { createGroundEffect } from 'mouse-tailing'
createGroundEffect(EffectConfig)
```
```
参数
export interface EffectConfig extends Omit<TailConfig, 'type' | 'resource'> {
  // 效果类型 sky
  type?: EffectType;
}
```
