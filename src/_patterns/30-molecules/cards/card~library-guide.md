---

state: review

---

## Getting Started

Cards can be used to callout some relevant information and visually group similar content. Library guide cards are especially useful for inserting library guide information within the context of another page.

###### EXPORT VIA GRUNT

```
grunt export:molecules-card-library-guide
```


### Description

The card library guide molecule can be used to include a library guide card within another pattern. Library guide cards can be used to link to library guides pages from other parts of our site.


### Best Practices

- Only link to one library guide per card


## Schema

| Name      | Type      | Description                                                 | Value(s)                                | Default     |
|-----------|-----------|-------------------------------------------------------------|-----------------------------------------|-------------|
| href      | `String`  | A path or URL to the library guide.                         |                                         |             |
| title     | `String`  | The title of the library guide.                             |                                         |             |
| target    | `String`  | Optionally indicates where the hyperlink should be opened.  | `_self`, `_blank`, `_parent`, or `_top` | `_self`     |
