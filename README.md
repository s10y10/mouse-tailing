# 屏幕鼠标拖尾效果

快速实现页面中鼠标拖尾的效果

[![mouse-tailing Example](https://raw.githubusercontent.com/s10y10/mouse-tailing/master/example/example.gif)](https://github.com/s10y10/mouse-tailing)

## 安装

```
npm install --save mouse-tailing
```

## 使用

```
import { createMouseTailing } from 'mouse-tailing'
createMouseTailing()
```

## 参数
`createMouseTailing(options)` 接受一个参数

- <b>options:</b> 可选，Object 类型，用于配置拖尾的形式，配置项如下：

|参数  | 说明 |类型|可选值|默认值|必选|
|------|-----|---|------|------|----|
|type  |拖尾类型|string|star/circle/heart/icon/sky|star|false|
|el | 显示拖尾用的dom容器|string/HTMLElement|-|document.body|false|
|color| 覆盖默认颜色,Hex格式 | string | #000000 - #FFFFFF | 随类型变化 |false |
|count|拖尾数量|number|-|1|false|
|duration|拖尾存在时间(ms)|number|-|1000|false|
|url|当type=icon时需要,icon的url地址|string|-|-|false|
|className|给canvas一个识别用class|string|-|canvas-tailing|false|

## 0.1.6 新增destroy方法
## 0.1.5 增加sky星星闪烁
## 0.1.4 增加color配置
## 0.1.3 修复resize响应
## 0.1.2 增加自定义class参数