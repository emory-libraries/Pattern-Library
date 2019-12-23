---

state: complete
created: 05/28/2019
updated: 05/28/2019
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

The intro bio organism can be used to include a bio introduction within another pattern. Bio intros used to introduce a person in their bio page and are made up of a title (the person's name), subtitle (the person's job title), link (the person's email), and optional thumbnail (the person's headshot).


### Best Practices

- Only ever use one intro per page


## Schema

| Name      | Type      | Description                                                                             | Value(s)  | Default   |
|-----------|-----------|-----------------------------------------------------------------------------------------|-----------|-----------|
| thumbnail | `String`  | An optional link to the person's headshot with square dimensions. This will be displayed as a `150x150` image.                                 |           |           |
| name      | `String`  | The name of the person the bio page is about. This is the title of the page, using the schema for [`tokens-heading`][tokens-heading].         |           |           |
| title     | `String`  | The person's job title. This is the subtitle of the page, using the schema for [`tokens-heading`][tokens-heading].            |               |           |
| email     | `String`  | The person's email. This is a link, using the schema for [`atoms-link`][atoms-link].            |               |           |


[tokens-heading]: /patterns/10-tokens-10-globals-heading/10-tokens-10-globals-heading.html
[atoms-link]: /patterns/20-atoms-globals-link/20-atoms-globals-link.html
