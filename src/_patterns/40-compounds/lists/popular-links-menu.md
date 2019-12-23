---

state: complete
created: 06/14/2019
updated: 06/14/2019
js: false
php: false

---

## Getting Started

Insert a sentence or two identifying what the **popular links menu** pattern is and what purpose it serves.

###### EXPORT VIA GRUNT

```
grunt export:compounds-popular-links-menu
```


### Description

Provide a detailed description about the **popular links menu** pattern. This should include a short summary of how the pattern works; what options or configurations are available to further customize the pattern based on context, if any; and/or what state changes the pattern possesses, if any. This description may include use-case scenarios for different contexts and other information that's deemed helpful for other developers.


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
