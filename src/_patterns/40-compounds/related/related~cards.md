---

state: complete
created: 04/22/2019
updated: 04/22/2019
js: false
php: false

---

## Getting Started

Related sections are useful for showing relationships among site content. Related cards depicts a graphical representation of some other site content as it relates to a given page within our site.

###### EXPORT VIA GRUNT

```
grunt export:compounds-related-cards
```


### Description

The related cards compound can be used to inlude a set of related cards within another pattern.


### Best Practices

- Only use one related section per page


## Schema

| Name    | Type      | Description                                                                                 | Value(s)  | Default   |
|---------|-----------|---------------------------------------------------------------------------------------------|-----------|-----------|
| title   | `String`  | The title of the related content section.                                                   |           | `Related` |
| type    | `String`  | The type of cards to be displayed using the [`compounds-cards`][compounds-cards] schema.    |           | `Related` |
| cards   | `Array`   | A set of cards using the [`compounds-cards`][compounds-cards] schema.                       |           |           |


[compounds-cards]: /patterns/40-compounds-cards-cards/40-compounds-cards-cards.html
