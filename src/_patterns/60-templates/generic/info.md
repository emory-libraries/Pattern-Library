---

state: construction
created: 04/11/2019
updated: 04/11/2019
js: false
php: false

---

## Getting Started

Insert a sentence or two identifying what the **info** pattern is and what purpose it serves.

###### EXPORT VIA GRUNT

```
grunt export:templates-info
```


### Description

This is a basic presentation of long-format page content that includes a page title, subtitle/lead paragraph, and body copy. This pattern also includes media such as images and videos.


### Best Practices

Optionally, create a bulleted list of best practices for how to properly use this pattern in production and/or integrate this pattern within other user interface components.


## Schema

Optionally, build a table to identify any pattern schematics that are pertinent for developers to be aware of. A sample schema table is given below.

| Name  | Type      | Description | Value(s)  | Default   |
|-------|-----------|-------------|-----------|-----------|
| label | `String`  | Some text.  |           |           |
| href  | `String`  | A path.     |           |           |

## Classes

Optionally, build a table to identify any pattern classes that are pertinent for developers to be aware of. For clarity, it could be useful to group classes into different tables based on their purpose, such as *Style Variations* or *State Changes*. Some sample class tables are given below.

### Variations

Classes used to indicate style variations are always prefixed with `-`. These classes tend to change the way the pattern appears.

| Class     | Description                                     |
|-----------|-------------------------------------------------|
| `-light`  | Uses a light theme.                             |
| `-dark`   | Uses a dark theme.                              |

### State

Classes used for state changes are always prefixed with `is-` or `has-`. Classes that use the `is-` prefix are typically used to temporarily alter the pattern's appearance while classes that use the `has-` prefix tend to indicate some structural difference from the pattern's usual state.

| Class       |                                                 |
|-------------|-------------------------------------------------|
| `is-active` | Indicates that it's **active**.                 |
