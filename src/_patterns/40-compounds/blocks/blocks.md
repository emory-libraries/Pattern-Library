---

state: construction
created: 04/12/2019
updated: 04/23/2019
js: false
php: false

---

## Getting Started

Blocks, or content blocks, are repeatable groups of content that tend to exist within the main body portion of a page.

###### EXPORT VIA GRUNT

```
grunt export:compounds-blocks
```


### Description

The block compound can be used to include one or more blocks within another pattern.


### Best Practices

- Use blocks inside [`organisms-main`][organisms-main]


## Schema

| Name  | Type      | Description | Value(s)  | Default   |
|-------|-----------|-------------------------------------------------|-----------|-----------|
| blocks | `Array`  | A collectino of block content to be displayed.  |           |           |
| blocks.`n`  | `Object`  | Some block content to be displayed using the appropriate schema for `blocks.n.type`.     |           |           |
| blocks.`n`.type  | `String`  | The type of block to display.     | `rich-text`, `text`, `heading`, `image`, or `video` |           |


[organisms-main]: /patterns/50-organisms-main-main/50-organisms-main-main.html
