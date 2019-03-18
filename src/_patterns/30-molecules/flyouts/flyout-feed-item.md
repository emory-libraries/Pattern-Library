---

state: review
created: 03/06/2019
updated: 03/18/2019
js: false
php: false

---

## Getting Started

Feed items represent a single entry within an external content feed and highlights that entry by providing a small excerpt of information about it. Flyout feed items are particularly useful for helping to delivery feed-based content to users directly from flyout menus typically found in our site's header.

###### EXPORT VIA GRUNT

```
grunt export:molecules-flyout-feed-item
```


### Description

The flyout feed item molecule can be used to include a single feed item within a larger list of feed entries. Flyout feed items are specifically designed for use within our site's flyout navigation menus.


### Best Practices

- Use a thumbnail image whenever possible


## Schema

| Name          | Type      | Description                                                                             | Value(s)  | Default   |
|---------------|-----------|-----------------------------------------------------------------------------------------|-----------|-----------|
| label         | `String`  | An optional label to be displayed as a hyperlink.                                       |           |           |
| href          | `String`  | The path or URL of where the feed item can be accessed in full-text.                    |           |           |
| image         | `String`  | An optional path or URL of a thumbnail image to be displayed.                           |           |           |
| date          | `String`  | A formatted date string to be displayed.                                                |           |           |
| heading       | `String`  | A heading to be displayed for the feed item.                                            |           |           |
| description   | `String`  | An optional description to be displayed for the feed item, limited to `150` characters. |           |           |


## Classes

### State

| Class           |                                                   |
|-----------------|---------------------------------------------------|
| `has-thumbnail` | Indicates that feed item has a thumbnail image.   |
