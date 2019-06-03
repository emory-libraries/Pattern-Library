---

state: review
created: 06/03/2019
updated: 06/03/2019
js: false
php: false

---

## Getting Started

Cards can be used to callout some relevant information and visually group similar content. Staff cards are especially useful for inserting staff information within the context of another page.

###### EXPORT VIA GRUNT

```
grunt export:molecules-card-staff
```


### Description

The card staff molecule can be used to include a staff card within another pattern. Staff cards require an image, preferably in the form of a square headshot, but will default to a generic placeholder image if none is given.


### Best Practices

- Provide a square headshot whenever applicable


## Schema

| Name      | Type      | Description                                                                                               | Value(s)          |Default|
|-----------|-----------|-----------------------------------------------------------------------------------------------------------|-------------------|-------|
| name      | `String`  | The name of the staff, optionally formatted with postnominals included.                               |                   |       |
| title     | `String`  | The staff's title or position.                                                                        |                   |       |
| library   | `String`  | The staff's home library.                                                                             |                   |       |
| link      | `Object`  | Some link data using the [`atoms-link`][atoms-link] schema.                                               |                   |       |
| image     | `Object`  | Some image data for the staff's headshot using the [`atoms-image`][atoms-image] schema, preferably where the image is in a square format.           |                   |       |
| gender    | `String`  | Optionally indicates the staff's gender for identifying the appropriate placeholder avatar when `image` is not given.  | `male` or `female` | `male` |
| phone     | `Number` or `String` | The staff's phone number to be displayed.                                                  |                   |       |
| email     | `String` | The staff's email address to be displayed.                                                             |                   |       |
| cv        | `Object` | Some link data using the [`atoms-link`][atoms-link] schema, where the link's label always uses a default.  |                   |       |


[atoms-link]: /patterns/20-atoms-globals-link/20-atoms-globals-link.html
[atoms-image]: /patterns/20-atoms-media-image/20-atoms-media-image.html
