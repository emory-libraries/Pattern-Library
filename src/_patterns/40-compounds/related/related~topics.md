---

state: review
created: 04/22/2019
updated: 04/22/2019
js: false
php: false

---

## Getting Started

Related sections are useful for showing relationships among site content. Related topics provides a list of topics for some other site content that relates to a given page within our site.

###### EXPORT VIA GRUNT

```
grunt export:compounds-related-topics
```


### Description

The related topics compound can be used to inlude a list of related topics within another pattern.


### Best Practices

- Only use one related section per page


## Schema

| Name    | Type      | Description                                                                                 | Value(s)  | Default   |
|---------|-----------|---------------------------------------------------------------------------------------------|-----------|-----------|
| title   | `String`  | The title of the related content section.                                                   |           | `Related` |
| topics  | `Array`   | A set of topics using the [`atoms-list-related-topics`][atoms-list-related-topics] schema.  |           |           |


[atoms-list-related-topics]: /patterns/20-atoms-lists-12-list-related-topics/20-atoms-lists-12-list-related-topics.html
