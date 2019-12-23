---

state: complete
created: 03/04/2019
updated: 03/18/2019
js: false
php: false

---

## Getting Started

Links, or hyperlinks, are the standard way of linking to some other content within the same page or another page within our site.

###### EXPORT VIA GRUNT

```
grunt export:atoms-link
```


### Description

The link atom allows you to include a hyperlink within another pattern. Use links to redirect users to specific content within the page or another page entirely. Optionally, links can include an icon.


### Best Practices

- Always label links with a clear call-to-action or description
  - Never use labels like *Click Here*
  - Avoid using URLs as labels
- Use page context to make sure you're linking to related, relevant content


## Schema

| Name            | Type      | Description                                               | Value(s)                                | Default   |
|-----------------|-----------|-----------------------------------------------------------|-----------------------------------------|-----------|
| label           | `String`  | The text to be displayed on the link.                     |                                         |           |
| href            | `String`  | A path or URL to link to.                                 |                                         |           |
| target          | `String`  | Indicates where the hyperlink should be opened.           | `_self`, `_blank`, `_parent`, or `_top` | `_self`   |
| icon            | `String`  | The optional ID of the icon to be displayed.              |                                         |           |
| active          | `Boolean` | Whether the button state is **active**.                   | `true` or `false`                       | `false`   |
| hover           | `Boolean` | Whether the button state is **hovered** or **focused**.   | `true` or `false`                       | `false`   |
| focus           | `Boolean` | Whether the button state is **hovered** or **focused**.   | `true` or `false`                       | `false`   |


## Classes

### States

| Class             | Description                                                           |
|-------------------|-----------------------------------------------------------------------|
| `is-active`       | Indicates that the button is **active**.                              |
| `is-hover`        | Indicates that the button is being **hovered** or **focused**.        |
| `is-focus`        | Indicates that the button is being **hovered** or **focused**.        |
