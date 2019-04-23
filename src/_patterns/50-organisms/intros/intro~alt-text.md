---

state: construction
created: 04/08/2019
updated: 04/23/2019
js: false
php: false

---

## Getting Started

Insert a sentence or two identifying what the **intro (alternative text)** pattern is and what purpose it serves.

###### EXPORT VIA GRUNT

```
grunt export:organisms-intro-alternative-text
```


### Description

The intro alt text organism can be used to include an alternate text introduction within another pattern. Alternate text intros are made up of a title and subtitle.


### Best Practices

- Only ever use one intro per page


## Schema

| Name      | Type      | Description                                                                             | Value(s)  | Default   |
|-----------|-----------|-----------------------------------------------------------------------------------------|-----------|-----------|
| title     | `String`  | The title of the page, using the schema for [`tokens-heading`][tokens-heading].         |           |           |
| subtitle  | `String`  | The subtitle of the page, using the schema for [`tokens-text`][tokens-text].            |           |           |


[tokens-heading]: /patterns/10-tokens-10-globals-heading/10-tokens-10-globals-heading.html
[tokens-text]: /patterns/10-tokens-10-globals-text/10-tokens-10-globals-text.html
