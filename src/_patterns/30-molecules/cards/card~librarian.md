---

state: review

---

## Getting Started

Cards can be used to callout some relevant information and visually group similar content. Librarian cards are especially useful for inserting subject librarian information within the context of another page.

###### EXPORT VIA GRUNT

```
grunt export:molecules-card-librarian
```


### Description

The card librarian molecule can be used to include a subject librarian card within another pattern. Subject librarian cards require an image, preferably in the form of a square headshot, but will default to a generic placeholder image if none is given.


### Best Practices

- Provide a square headshot whenever applicable


## Schema

| Name      | Type      | Description                                                                                                                   | Value(s)                                | Default   |
|-----------|-----------|-------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------|-----------|
| name      | `String`  | The name of the librarian, optionally formatted with postnominals included.                                                   |                                         |           |
| title     | `String`  | The librarian's title or position.                                                                                            |                                         |           |
| library   | `String`  | The librarian's home library.                                                                                                 |                                         |           |
| href      | `String`  | A path or URL to the librarian's biography or profile page.                                                                   |                                         |           |
| target    | `String`  | Optionally indicates where the `href` hyperlink should be opened.                                                             | `_self`, `_blank`, `_parent`, or `_top` | `_self`   |
| image     | `String`  | An optional path or URL to the librarian's headshot, preferably in a square format.                                           |                                         |           |
| gender    | `String`  | Optionally indicates the librarian's gender, used to identify the placeholder avatar to be used when no `image` is given.     | `male` or `female`                      | `male`    |
| subjects  | `Array`   | A list of subject areas that the librarian specializes in.                                                                    |                                         |           |
| phone     | `Number` or `String` | The librarian's phone number to be displayed.                                                                      |                                         |           |
| email     | `String`  | The librarian's email address to be displayed.                                                                                |                                         |           |
| cv        | `String` or `Object` | An optional path or URL to the librarian's CV, or some link data for the librarian's CV, adhering to the [`atoms-link`][atoms-link] schema. |                |           |
| guides    | `String` or `Object` | An optional path or URL to the librarian's research guides, or some link data for the librarian's research guides, adhering to the [`atoms-link`][atoms-link] schema. |  |  |

[atoms-link]: /patterns/20-atoms-globals-link/20-atoms-globals-link.html
