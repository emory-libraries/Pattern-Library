---

state: review

---

## Getting Started

Cards can be used to callout some relevant information and visually group similar content. Library aid cards are especially useful for inserting library aid information within the context of another page.

###### EXPORT VIA GRUNT

```
grunt export:molecules-card-library-aid
```


### Description

The card library aid molecule can be used to include a library aid card within another pattern. Library aid cards can be used to link to library aids pages from other parts of our site.


### Best Practices

- Only link to one library aid per card


## Schema

| Name      | Type      | Description                                                                   | Value(s)                                | Default         |
|-----------|-----------|-------------------------------------------------------------------------------|-----------------------------------------|-----------------|
| href      | `String`  | A path or URL to the library aid.                                             |                                         |                 |
| title     | `String`  | The title of the library aid.                                                 |                                         |                 |
| context   | `String`  | An optional short word or phrase providing some context for the library aid.  |                                         | `Library Aid`   |
| target    | `String`  | Optionally indicates where the hyperlink should be opened.                    | `_self`, `_blank`, `_parent`, or `_top` | `_self`         |
