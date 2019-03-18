---

state: review
created: 03/12/2019
updated: 03/18/2019
js: false
php: false

---

## Getting Started

Cards can be used to callout some relevant information and visually group similar content. Multimedia cards are especially useful for inserting multimedia information within the context of another page.

###### EXPORT VIA GRUNT

```
grunt export:molecules-card-multimedia
```


### Description

The card multimedia molecule can be used to include a multimedia card within another pattern. Multimedia cards accept a multimedia `type` to indicate the appropriate icon to be used.


### Best Practices

- Only link to one multimedia item per card
- Provide a duration for streaming multimedia formats


## Schema

| Name      | Type      | Description                                                       | Value(s)                                                                                          | Default   |
|-----------|-----------|-------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|-----------|
| type      | `String`  | Indicates the type of multimedia content.                         | `video`, `audio`, `photo`/`image`, `chart`/`diagram`, `presentation`/`slideshow`, or `activity`   |           |
| href      | `String`  | A path or URL to the multimedia conent.                           |                                                                                                   |           |
| title     | `String`  | The title of the multimedia content.                              |                                                                                                   |           |
| context   | `String`  | A short word or phrase providing some context for the multimedia content.                                                                               |             |           |
| target    | `String`  | Optionally indicates where the hyperlink should be opened.        | `_self`, `_blank`, `_parent`, or `_top`                                                           | `_self`   |
| duration  | `String`  | The multimedia content's streaming duration, requires content with `type` of `video`, `audio`, or `presentation`/`slideshow`.                           |             |           |
