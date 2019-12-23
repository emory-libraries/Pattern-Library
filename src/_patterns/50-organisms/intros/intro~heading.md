---

state: complete
created: 04/26/2019
updated: 04/26/2019
js: false
php: false

---

## Getting Started

Intros identify the purpose of a page and help to give users an idea of what type of content they may find within the page's context.

###### EXPORT VIA GRUNT

```
grunt export:organisms-intro-heading
```


### Description

The intro heading organism can be used to include a heading introduction within another pattern. Heading intros are made up of a title with a stylized rule.


### Best Practices

- Only ever use one intro per page


## Schema

| Name      | Type      | Description                                                                             | Value(s)  | Default   |
|-----------|-----------|-----------------------------------------------------------------------------------------|-----------|-----------|
| title     | `String`  | The title of the page, using the schema for [`tokens-heading`][tokens-heading].         |           |           |


[tokens-heading]: /patterns/10-tokens-10-globals-heading/10-tokens-10-globals-heading.html
