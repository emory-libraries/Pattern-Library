---

state: review

---

## Getting Started

Cards can be used to callout some relevant information and visually group similar content. Listing cards are especially useful for inserting some listing information within the context of another page.

###### EXPORT VIA GRUNT

```
grunt export:molecules-card-listing
```


### Description

The card listing molecule can be used to include a listing card within another pattern. Listing cards are typically used to display some listing information sourced from one of our various feeds, such as news, events, exhibitions, and/or blogs.


### Best Practices

- Only link to one listing item per card


## Schema

| Name            | Type      | Description                                                                       | Value(s)                          | Default |
|-----------------|-----------|-----------------------------------------------------------------------------------|-----------------------------------|---------|
| title           | `String`  | The title of the listing content to be displayed.                                 |                                   |         |
| badge           | `String`  | An optional badge to be displayed.                                                |                                   |         |
| description     | `String`  | An optional description to be displayed.                                          |                                   |         |
| date            | `String`  | A formatted date or datetime string to be displayed.                              |                                   |         |
| theme           | `String`  | Optionally indicates the theme to use.                                            | `light` or `dark`                 | `light` |
| vertical        | `Boolean` | Optionally indicates whether the listing should be confined to its vertical layout.  | `true` or `false`              | `false` |
| image           | `String` or `Object` | A path or URL to an image, or some image data.                         |                                   |         |
| image.src       | `String`  | A path or URL to an image, requires that `image` be in `Object` form.             |                                   |         |
| image.orientation | `String`  | Optionally indicates the image's orientation to better optimize scaling.        | `portrait` or `landscape`         |         |
| buttons         | `Array`   | A set of buttons to be displayed.                                                 |                                   |         |
| buttons.`n`     | `Object`  | Some button data using the [`atoms-button-link`][atoms-button-link] schema.       |                                   |         |


## Classes

### Variations

| Class               | Description                                                                                             |
|---------------------|---------------------------------------------------------------------------------------------------------|
| `-has-badge`        | Indicates that the listing has a badge.                                                                 |
| `-has-description`  | Indicates that the listing has a description.                                                           |
| `-light`            | Uses the **light** theme.                                                                               |
| `-dark`             | Uses the **dark** theme.                                                                                |
| `-vertical`         | Indicates the listing uses a **vertical** layout.                                                       |
| `-portrait`         | Indicates the listing's image is in **portrait** orientation, must be applied to `card-listing-image`.  |
| `-landscape`        | Indicates the listing's image is in **landscape** orientation, must be applied to `card-listing-image`. |


[atoms-button-link]: /patterns/20-atoms-buttons-01-button-link/20-atoms-buttons-01-button-link.html
