---

state: review

---

## Getting Started

Tiles can be used to callout some relevant information and visually group similar content. Utility tiles are especially useful for inserting some generic information within the context of another page.

###### EXPORT VIA GRUNT

```
grunt export:molecules-tile-utility
```


### Description

The tile utility molecule can be used to include a utility tile within another pattern. Utility tiles are typically used to link to some other page within the site.


### Best Practices

- Only link to one page per card


## Schema

| Name            | Type      | Description                                                                       | Value(s)                                | Default   |
|-----------------|-----------|-----------------------------------------------------------------------------------|-----------------------------------------|-----------|
| title           | `String`  | The title of the tile to be displayed.                                            |                                         |           |
| description     | `String`  | An optional description to be displayed, limited to a maximum of `300` characters.|                                         |           |
| image           | `String`  | A path or URL to an image, or some image data.                                    |                                         |           |
| href            | `String`  | A path or URL that the tile should link to.                                       |                                         |           |
| target          | `String`  | Optionally indicates where the `href` hyperlink should be opened.                 | `_self`, `_blank`, `_parent`, or `_top` | `_self`   |
| align           | `Object`  | Optionally configures how the image should be aligned.                            |                                         |           |
| align.x         | `String`  | Configures the image's horizontal (`x`-axis) alignment.                           | `left`, `right`, or `center`            | `center`  |
| align.y         | `String`  | Configures the image's vertical (`y`-axis) alignment.                             | `top`, `bottom`, or `center`            | `center`  |
| fit             | `String`  | Configures the image's fit within its container, where `contain` fixes the image's width to the width of its container, scaling it up or down accordingly, and `cover` allows the image to be scaled upward when necessary but otherwise attempts to keep the image's native width by scaling the container's viewport instead of the image. | `contain` or `cover`            | `contain`  |


## Classes

### Variations

| Class               | Description                                                                                                                                                           |
|---------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `-align-x-left`     | Left-aligns the tile image within its container.                                                                                                                      |
| `-align-x-right`    | Right-aligns the tile image within its container.                                                                                                                     |
| `-align-x-center`   | Horizontally centers the tile image within its container.                                                                                                             |
| `-align-y-top`      | Top-aligns the tile image within its container.                                                                                                                       |
| `-align-y-bottom`   | Bottom-aligns the tile image within its container.                                                                                                                    |
| `-align-y-center`   | Vertically centers the tile image within its container.                                                                                                               |
| `-contain`          | Indicates the listing's image should be **contained** and, thus, fixed to its container's width.                                                                      |
| `-cover`            | Indicates the listing's image should **cover** its container's area, thus, prevents downscaling below the image's native width but allows upscaling as needed.        |

### State

| Class             |                                                                 |
|-------------------|-----------------------------------------------------------------|
| `has-description` | Indicates that the tile includes a description.                 |
