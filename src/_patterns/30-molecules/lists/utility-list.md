---

state: review
created: 03/22/2019
updated: 03/22/2019
js: false
php: false

---

## Getting Started

Utility lists are a flexible tool for calling out and grouping content within a styled list format.

###### EXPORT VIA GRUNT

```
grunt export:molecules-utility-list
```


### Description

The utility list molecule can be used to include a utility list within another pattern. Unlike normal lists, utility lists differ in that they are more stylized to help callout content and grab the user's attention.


### Best Practices

- Use utility lists sparingly within page content


## Schema

| Name              | Type      | Description                                                                                                                               | Value(s)  | Default   |
|-------------------|-----------|-------------------------------------------------------------------------------------------------------------------------------------------|-----------|-----------|
| icon              | `String`  | An optional ID of an icon to be displayed.                                                                                                |           |           |
| title             | `String`  | The title of the utility list.                                                                                                            |           |           |
| context           | `String`  | An optional context to be applied to all list items.                                                                                      |           |           |
| items             | `Array`   | A set of list items to be included in the list.                                                                                           |           |           |
| items.`n`         | `Object`  | Some data for the given list item.                                                                                                        |           |           |
| items.`n`.title   | `String`  | The title of the given list item.                                                                                                         |           |           |
| items.`n`.image   | `Object`  | Some optional image data for the given item using the [`atoms-image`][atom-image] schema.                                                 |           |           |
| items.`n`.context | `String`  | An optional item-specific context, which overwrites `context` if set.                                                                     |           |           |
| items.`n`.link    | `Object`  | Some optional link data for the given item using the [`atoms-link`][atoms-link] schema, where the link's label is set to `items.n.title`. |           |           |


## Classes

### State

| Class         |                                                                                             |
|---------------|---------------------------------------------------------------------------------------------|
| `has-image`   | Indicates that that a list item has an image, used on the `utility-list-list-item`.         |
| `has-context` | Indicates that that a list item has a context label, used on the `utility-list-list-item`.  |


[atoms-image]: /patterns/20-atoms-media-image/20-atoms-media-image.html
[atoms-link]: /patterns/20-atoms-globals-link/20-atoms-globals-link.html
