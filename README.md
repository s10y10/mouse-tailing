# 屏幕鼠标拖尾效果

快速实现页面中鼠标拖尾的效果

## 安装

```
npm install --save mouse-tailing
```

## 使用

```
import { mouseTailing } from 'mouse-tailing'
mouseTailing()
```

## 参数
`mouseTailing(options)` 接受一个参数

- <b>options:</b> 可选，Object 类型，用于配置拖尾的形式，配置项如下：

|参数  | 说明 |类型|可选值|默认值|
|------|-----|---|------|------|
|type  |拖尾类型|string|star|star|
|renderer|自定义渲染器|function|-|undefind|
