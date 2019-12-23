---

state: complete
created: 04/22/2019
updated: 04/22/2019
js: false
php: false

---

## Getting Started

Related sections are useful for showing relationships among site content. Related links provides a list of links for some other site content that relates to a given page within our site.

###### EXPORT VIA GRUNT

```
grunt export:compounds-related-links
```


### Description

The related links compound can be used to inlude a list of related links within another pattern.


### Best Practices

- Only use one related section per page


## Schema

| Name    | Type      | Description                                                                                 | Value(s)  | Default   |
|---------|-----------|---------------------------------------------------------------------------------------------|-----------|-----------|
| title   | `String`  | The title of the related content section.                                                   |           | `Related` |
| links   | `Array`   | A set of links using the [`atoms-list-related-links`][atoms-list-related-links] schema.     |           |           |


[atoms-list-related-links]: /patterns/20-atoms-lists-11-list-related-links/20-atoms-lists-11-list-related-links.html
