---

state: review

---

## Getting Started

Icons are used to help make different types of content more identifiable and can break up the monotony of text-heavy content.

###### EXPORT VIA GRUNT

```
grunt export:tokens-icon
```


### Description

The icon token allows you to directly include any icon from our icon library within another pattern. All icons are included as an inline SVG and is placed inside an `.icon` block. For a complete list of all icons available, refer to our [Icon Library](/patterns/00-meta-20-assets-icons/00-meta-20-assets-icons.html).


### Best Practices

- Placement should always come before any related text
- Only one icon should be used at a time


## Schema


| Name    | Type      | Description                              | Value(s)  | Default   |
|---------|-----------|------------------------------------------|-----------|-----------|
| `id`    | `String`  | The ID of a icon within our icon library |           |           |
