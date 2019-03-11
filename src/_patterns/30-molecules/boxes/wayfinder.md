---

state: review

---

## Getting Started

Wayfinder boxes are a good way to callout wayfinding content, such as maps and spaces, within the site. Wayfinders help users quickly access information about physical spaces.

###### EXPORT VIA GRUNT

```
grunt export:molecules-wayfinder
```


### Description

The wayfinder molecule allows you to include a wayfinder box within another pattern. Wayfinder boxes require that an image be used, preferably in landscape orientation.


### Best Practices

- Adhere to art direction guidelines when selecting imagery
- Limit action buttons to a maximum of 2


## Schema

| Name        | Type      | Description                                                                                               | Value(s)  | Default   |
|-------------|-----------|-----------------------------------------------------------------------------------------------------------|-----------|-----------|
| heading     | `String`  | A heading to be displayed.                                                                                |           |           |
| text        | `String`  | A text blurb to be displayed, limited to `150` characters.                                                |           |           |
| image       | `String`  | A path or URL of an image to be displayed, where the image preferably uses a *landscape* orientation.     |           |           |
| buttons     | `Array`   | A set of button links to be displayed.                                                                    |           |           |
| buttons.`n` | `Object`  | Some data for a button link. Refer to [`atoms-button-link`][atoms-button-link] for more proper schema.    |           |           |
| align       | `Object`  | Optionally configures how the image should be aligned.                                                    |           |           |
| align.x     | `String`  | Configures the image's horizontal (`x`-axis) alignment.                               | `left`, `right`, or `center`  | `center`  |
| align.y     | `String`  | Configures the image's vertical (`y`-axis) alignment.                                 | `top`, `bottom`, or `center`  | `center`  |


## Classes

### Variations

| Class               | Description                                                   |
|---------------------|---------------------------------------------------------------|
| `-align-x-left`     | Left-aligns the feature image within its container.           |
| `-align-x-right`    | Right-aligns the feature image within its container.          |
| `-align-x-center`   | Horizontally centers the feature image within its container.  |
| `-align-y-top`      | Top-aligns the feature image within its container.            |
| `-align-y-bottom`   | Bottom-aligns the feature image within its container.         |
| `-align-y-center`   | Vertically centers the feature image within its container.    |


[atoms-button-link]: /patterns/20-atoms-buttons-01-button-link/20-atoms-buttons-01-button-link.html