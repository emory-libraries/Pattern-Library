---

state: complete
created: 05/28/2019
updated: 05/29/2019
js: false
php: false

---

## Getting Started

Sidebar lists are a useful tool for organizing some supplemental information for a page within its sidebar region.

###### EXPORT VIA GRUNT

```
grunt export:compounds-sidebar-list
```


### Description

The sidebar list compound can be used to include a sidebar list within another pattern. Sidebar lists are composed of one or more sections with an optional title and separated by a divider.


### Best Practices

- Use focused, relevant sections within a sidebar list


## Schema

| Name  | Type      | Description | Value(s)  | Default   |
|-------|-----------|-------------|-----------|-----------|
| sections            | `Array`     | A collection of sections to be displayed within the sidebar list.                                               |                     |           |
| sections.`n`        | `Object`    | Some configuratons for a sidebar list section.                                                                  |                     |           |
| sections.`n`.title  | `String`    | The sidebar list section's title to be displayed.                                                               |                     |           |
| sections.`n`.icon   | `Object`    | Optionally indicates the icon to be displayed beside the the sidebar list section's title.                      |                     |           |
| sections.`n`.content  | `String` or `Array` | The content to be displayed for the sidebar list. If given in `Array` form, the items are displayed using a non-bulleted list. |    |   |
| sections.`n`.markdown | `Boolean` | Optionally indicates whether the sidebar list section's content should be parsed as markdown. Requires that the content be given in `String` form. |||
| sections.`n`.link     | `Object`  | An optional link to be displayed at the bottom of the sidebar list section, using the schema for [`atoms-link`][atoms-link].          |     |     |
| sections.`n`.button   | `Object`  | An optional button to be displayed at the bottom of the sidebar list section, using the schema for [`atoms-button-link`][atoms-button-link]. | |  |
| button                | `Object`  | An optional button to be displayed at the bottom of the sidebar list, using the schema for [`atoms-button-link`][atoms-button-link], used as an alternative for `buttons`. |     |     |
| buttons               | `Array`   | An optional set of buttons to be displayed at the bottom of the sidebar list, used as an alternative for `button`.                    |     |     |
| buttons.`n`           | `Object`  | An optional button to be displayed at the bottom of the sidebar list, using the schema for [`atoms-button-link`][atoms-button-link].  |     |     |
| divider             | `Object`    | Some configurations for divider variations.                                                                     |                     |           |
| divider.start       | `Boolean`   | Optionally indicates whether the sidebar list should start with a divider.                                      | `true` or `false`   | `false`   |
| divider.end         | `Boolean`   | Optionally indicates whether the sidebar list should end with a divider when it does not end with a button.     | `true` or `false`   | `false`   |


## Classes

### Variations

| Class             | Description                                                               |
|-------------------|---------------------------------------------------------------------------|
| `-divider-start`  | Indicates that a divider should exist at the start of the sidebar list.   |
| `-divider-end`    | Indicates that a divider should exist at the end of the sidebar list, unless the list is ends with one or more buttons. |

### State

| Class       |                                                                 |
|-------------|-----------------------------------------------------------------|
| `has-icon`  | Indicates that a sidebar list section's title contains an icon. |


[atoms-link]: /patterns/20-atoms-globals-link/20-atoms-globals-link.html
[atoms-button-link]: /patterns/20-atoms-buttons-01-button-link/20-atoms-buttons-01-button-link.html