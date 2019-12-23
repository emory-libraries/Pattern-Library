---

state: complete
created: 04/26/2019
updated: 04/26/2019
js: false
php: false

---

## Getting Started

Major sections can be used to distinguish between a page's main content and some other major content.

###### EXPORT VIA GRUNT

```
grunt export:organisms-major
```


### Description

The major organism can be used to include a major section within a template.


### Best Practices

- Never include major and minor sections within the same page
- Use major sections for home pages and other section pages through the site

## Schema

| Name    | Type      | Description                                                               | Value(s)  | Default   |
|---------|-----------|---------------------------------------------------------------------------|-----------|---------------|
| heading | `String`  | The section heading, using the [`tokens-heading`][tokens-heading] schema. |           |               |
| theme   | `String`  | Indicates which theme the section should use.     | `light` or `dark` | `light`   |


## Classes

### Variations

| Class     | Description                                     |
|-----------|-------------------------------------------------|
| `-light`  | Uses the major section's **light** theme.       |
| `-dark`   | Uses the major section's **dark** theme.        |


[tokens-heading]: /patterns/10-tokens-10-globals-heading/10-tokens-10-globals-heading.html
