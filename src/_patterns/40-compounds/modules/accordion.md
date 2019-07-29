---

state: review
created: 04/22/2019
updated: 04/22/2019
js: true
php: false

---

## Getting Started

Accordions are a handy organizational tool that can be used to condense large amounts of content so as to not overwhelm the user.

###### EXPORT VIA GRUNT

```
grunt export:compounds-accordion
```


### Description

The accordion compound can be used to insert an accordion into other patterns. Accordions are made up of one or more [`molecules-accordion`][molecules-accordion] panels.


### Best Practices

- Use a descriptive title to help identify the purpose of the accordion
- Only set one accordion panel to open by default


## Schema

| Name  | Type      | Description | Value(s)  | Default   |
|-------|-----------|-------------|-----------|-----------|
| title | `String`  | The title of the accordion.  |           |           |
| showall  | `String` or `Boolean`  | Indicates whether a *Show All* button should be enabled. Optionally, this can be set to a string value to assign the button's label. By default, the button's label is "Show All Sections" when this value equals `true`.  | `true` or `false`  | `true`    |
| hideall  | `String` or `Boolean`  | Indicates whether a *Hide All* button should be enabled. Optionally, this can be set to a string value to assign the button's label. By default, the button's label is "Hide All Sections" when this value equals `true`.  | `true` or `false`  | `true`    |
| panels  | `Array`  | A set of panels to be included within the accordion.  |            |           |
| panels.`n`  | `Object`  | An accordion panel using the [`molecules-accordion`][molecules-accordion] schema.  |            |           |


[molecules-accordion]: /patterns/30-molecules-modules-accordion/30-molecules-modules-accordion.html
