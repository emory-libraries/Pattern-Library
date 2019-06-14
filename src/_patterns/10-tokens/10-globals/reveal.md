---

state: review
created: 06/13/2019
updated: 06/13/2019
js: false
php: false

---

## Getting Started

Reveals are a useful tool for temporarily hiding some overflow content that users can toggle and show when ready.

###### EXPORT VIA GRUNT

```
grunt export:tokens-reveal
```


### Description

The reveal token can be used to hide some content temporarily that can later be revealed by the user.


### Best Practices

- Use only one reveal per page.


## Schema

| Name    | Type        | Description                                                                                   | Value(s)          | Default           |
|---------|-------------|-----------------------------------------------------------------------------------------------|-------------------|-------------------|
| content | `String`    | Some optional content to display. Alternatively, the `big-reveal-content` block can be extended.  |                   |                   |
| id      | `String`    | An unique ID for the reveal component.                                                        |                   | *auto-generated*  |
| once    | `Boolean`   | Inidicates if the reveal button can only be clicked once (to show all content).               | `true` or `false` | `false`           |


## Classes

### Variations

| Class     | Description                                                                   |
|-----------|-------------------------------------------------------------------------------|
| `-once`   | Indicates that the reveal button can only be clicked once before it's hidden. |
