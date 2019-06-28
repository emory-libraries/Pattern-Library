---

state: review
created: 06/19/2019
updated: 06/19/2019
js: false
php: false

---

## Getting Started

The main subnavigation menu helps users navigate through the site's main content.

###### EXPORT VIA GRUNT

```
grunt export:compounds-subnav-menu-main
```


### Description

Use the subnav menu main compound to include a main subnavigation menu within the site's main navigation.


### Best Practices

- Use the appropriate layout for the subnavigation menu's content


## Schema

| Name            | Type        | Description                                                                   | Value(s)  | Default   |
|-----------------|-------------|-------------------------------------------------------------------------------|-----------|-----------|
| heading         | `String`    | The subnavigation menu's heading.                                             |           |           |
| navigation      | `Array`     | An list of navigation items to be displayed within the subnavigaiton menu.    |           |           |
| navigation.`n`  | `Object`    | Some navigation data for a single navigation item.                            |           |           |

## Classes

### Variations

| Class           | Description                                           |
|-----------------|-------------------------------------------------------|
| `-grouped`      | Indicates that the grouped layout should be used.     |
| `-categorized`  | Indicates that the categorized layout should be used. |

### State

| Class         |                                                                                     |
|---------------|-------------------------------------------------------------------------------------|
| `has-search`  | Indicates that the menu contains a search box. Only applicable for grouped layouts. |
