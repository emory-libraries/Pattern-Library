---

state: construction

---

## Getting Started

Buttons help indicate to the user that some action should be taken. When used correctly, link buttons can be a useful tool for redirecting end users to other relevant content and/or resources on other pages of our site.

###### EXPORT VIA GRUNT

```
grunt export:atoms-button-link
```


### Description

The button link atom allows you to include a hyperlinked button within another pattern. Use this button to redirect users to another page. Optionally, link buttons can include an icon.


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
| icon            | `Object`  | Optional data to about an icon to be used.                |                                         |           |
| icon.id         | `String`  | The ID of the icon to be displayed.                       |                                         |           |
| hollow          | `Boolean` | Whether the button should use its hollow style.           | `true` or `false`                       | `false`   |
| active          | `Boolean` | Whether the button state is **active**.                   | `true` or `false`                       | `false`   |
| hover           | `Boolean` | Whether the button state is **hovered** or **focused**.   | `true` or `false`                       | `false`   |
| focus           | `Boolean` | Whether the button state is **hovered** or **focused**.   | `true` or `false`                       | `false`   |
| disabled        | `Boolean` | Whether the button state is **disabled**.                 | `true` or `false`                       | `false`   |


## Classes

### Variations

| Class           | Description                                 |
|-----------------|---------------------------------------------|
| `-hollow`       | Uses a hollow version of the button.        |

### States

| Class             | Description                                                           |
|-------------------|-----------------------------------------------------------------------|
| `is-active`       | Indicates that the button is **active**.                              |
| `is-hover`        | Indicates that the button is being **hovered** or **focused**.        |
| `is-focus`        | Indicates that the button is being **hovered** or **focused**.        |
| `is-disabled`     | Indicates that the button is **disabled**.                            |
