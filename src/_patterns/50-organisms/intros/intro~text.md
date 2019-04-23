---

state: review
created: 04/05/2019
updated: 04/23/2019
js: false
php: false

---

## Getting Started

Intros identify the purpose of a page and help to give users an idea of what type of content they may find within the page's context.

###### EXPORT VIA GRUNT

```
grunt export:organisms-intro-text
```


### Description

The intro text organism can be used to include a default text introduction within another pattern. Text intros are made up of a title and subtitle along with an optional context.


### Best Practices

- Only ever use one intro per page


## Schema

| Name      | Type      | Description                                                                             | Value(s)  | Default   |
|-----------|-----------|-----------------------------------------------------------------------------------------|-----------|-----------|
| context   | `String`  | The context or category of the page.                                                    |           |           |
| title     | `String`  | The title of the page, using the schema for [`tokens-heading`][tokens-heading].         |           |           |
| subtitle  | `String`  | The subtitle of the page, using the schema for [`tokens-text`][tokens-text].            |           |           |


[tokens-heading]: /patterns/10-tokens-10-globals-heading/10-tokens-10-globals-heading.html
[tokens-text]: /patterns/10-tokens-10-globals-text/10-tokens-10-globals-text.html
