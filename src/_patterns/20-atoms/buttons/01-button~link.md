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

The button link atom allows you to include a hyperlinked button within another pattern. Use this button to redirect users to another page. Optionally, buttons can include an icon.


### Best Practices

- Always label buttons with a clear call-to-action
- Avoid lengthy button labels by using short, concise ones instead
- Use page context to make sure you're linking to related, relevant content


## Schema

| Name            | Type      | Description                                               | Value(s)          | Default   |
|-----------------|-----------|-----------------------------------------------------------|-------------------|-----------|
| label           | `String`  | The text to be displayed on the button.                   |                   |           |
| href            | `String`  | A path or URL that the button links to.                   |                   |           |
| icon            | `Object`  | Optional data to about an icon to be used.                |                   |           |
| icon.id         | `String`  | The ID of the icon to be displayed.                       |                   |           |
| icon.position   | `String`  | Where to display the icon relative to the button's text.  | `left` or `right` | `left`    |


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
