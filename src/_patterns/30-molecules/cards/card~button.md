---

state: complete
created: 04/26/2019
updated: 04/26/2019
js: false
php: false

---

## Getting Started

Card buttons are a variation of a standard link button but use a card-like format.

###### EXPORT VIA GRUNT

```
grunt export:molecules-card-button
```


### Description

The card button molecule can be used to include a card button link within another pattern.


### Best Practices

- Always label buttons with a clear call-to-action
- Avoid lengthy button labels by using short, concise ones instead
- Use page context to make sure you're linking to related, relevant content


## Schema

| Name            | Type      | Description                                               | Value(s)                                | Default   |
|-----------------|-----------|-----------------------------------------------------------|-----------------------------------------|-----------|
| label           | `String`  | The text to be displayed on the button.                   |                                         |           |
| href            | `String`  | A path or URL that the button links to.                   |                                         |           |
| target          | `String`  | Indicates where the hyperlink should be opened.           | `_self`, `_blank`, `_parent`, or `_top` | `_self`   |
| active          | `Boolean` | Whether the button state is **active**.                   | `true` or `false`                       | `false`   |
| hover           | `Boolean` | Whether the button state is **hovered** or **focused**.   | `true` or `false`                       | `false`   |
| focus           | `Boolean` | Whether the button state is **hovered** or **focused**.   | `true` or `false`                       | `false`   |
| disabled        | `Boolean` | Whether the button state is **disabled**.                 | `true` or `false`                       | `false`   |


## Classes

### States

| Class             | Description                                                           |
|-------------------|-----------------------------------------------------------------------|
| `is-active`       | Indicates that the button is **active**.                              |
| `is-hover`        | Indicates that the button is being **hovered** or **focused**.        |
| `is-focus`        | Indicates that the button is being **hovered** or **focused**.        |
| `is-disabled`     | Indicates that the button is **disabled**.                            |
