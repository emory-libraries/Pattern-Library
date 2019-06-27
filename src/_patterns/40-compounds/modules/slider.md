---

state: review
created: 06/11/2019
updated: 06/12/2019
js: true
php: false

---

## Getting Started

Sliders are a handy orgainzational tool that can be used to feature a collection of like content in a way that users are able to interact with.

###### EXPORT VIA GRUNT

```
grunt export:compounds-slider
```


### Description

The slider compound can be used to insert a slider into another pattern. Sliders are made up of one or more [`molecules-slide`][molecules-slide] slides.


### Best Practices

- Only use like content within a single slider


## Schema

| Name        | Type        | Description                                                           | Value(s)              | Default           |
|-------------|-------------|-----------------------------------------------------------------------|-----------------------|-------------------|
| id          | `String`    | An optional unique ID for the slider.                                 |                       | *auto-generated*  |
| arrows      | `Boolean`   | Indicates whether a previous and next arrow should be displayed.      | `true` or `false`     | `true`            |
| slides      | `Array`     | A set of slides that should be included within the slider.            |                       |                   |
| slides.`n`  | `Object`    | A slide using the [`molecules-slide`][molecules-slide] schema.        |                       |                   |


[molecules-slide]: /patterns/30-molecules-modules-slide/30-molecules-modules-slide.html
