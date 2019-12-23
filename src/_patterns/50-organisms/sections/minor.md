---

state: complete
created: 04/26/2019
updated: 04/26/2019
js: false
php: false

---

## Getting Started

Minor sections can be used to distinguish between a page's main content and some other minor content.

###### EXPORT VIA GRUNT

```
grunt export:organisms-minor
```


### Description

The minor organism can be used to include a minor section within a template.


### Best Practices

- Never include major and minor sections within the same page
- Use minor sections for interior pages through the site

## Schema

| Name    | Type      | Description                                                               | Value(s)  | Default   |
|---------|-----------|---------------------------------------------------------------------------|-----------|---------------|
| heading | `String`  | The section heading, using the [`tokens-heading`][tokens-heading] schema. |           |               |
| icon    | `String`  | An optional ID of an icon to be displayed, using the [`tokens-icon`][tokens-icon] schema. |           |               |
| theme   | `String`  | Indicates which theme the section should use.     | `light` or `dark` | `light`   |


## Classes

### Variations

| Class     | Description                                     |
|-----------|-------------------------------------------------|
| `-light`  | Uses the minor section's **light** theme.       |
| `-dark`   | Uses the minor section's **dark** theme.        |


[tokens-heading]: /patterns/10-tokens-10-globals-heading/10-tokens-10-globals-heading.html
[tokens-icon]: /patterns/10-tokens-10-globals-icon/10-tokens-10-globals-icon.html
