---

state: construction

---

## Getting Started

Buttons help indicate to the user that some action should be taken. When used correctly, toggle buttons can be a useful tool for allowing users to toggle between some alternative view, menu, modal, and/or options.

###### EXPORT VIA GRUNT

```
grunt export:atoms-button-toggle
```


### Description

The button toggle atom allows you to include a toggle button within another pattern. Use this button to control the state of a checkbox toggle like those commonly found in our navigation menus. Optionally, toggle buttons can include an icon.


### Best Practices

- Always label buttons with a clear call-to-action
- Avoid lengthy button labels by using short, concise ones instead
- Set the button's `for` attribute equal to the `id` of its checkbox toggle
- Use JavaScript only to enhance the button's functionality


## Schema

| Name            | Type      | Description                                               | Value(s)                                | Default                 |
|-----------------|-----------|-----------------------------------------------------------|-----------------------------------------|-------------------------|
| label           | `String`  | The text to be displayed on the button.                   |                                         |                         |
| id              | `String`  | The ID of the button.                                     |                                         |                         |
| for             | `String`  | The ID of the target toggle that the button controls.     |                                         |                         |
| active          | `Boolean` | Whether the button state is **active**.                   | `true` or `false`                       | `false`                 |
| hover           | `Boolean` | Whether the button state is **hovered** or **focused**.   | `true` or `false`                       | `false`                 |
| focus           | `Boolean` | Whether the button state is **hovered** or **focused**.   | `true` or `false`                       | `false`                 |
| disabled        | `Boolean` | Whether the button state is **disabled**.                 | `true` or `false`                       | `false`                 |


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