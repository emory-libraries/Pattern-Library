---

state: review
created: 03/11/2019
updated: 03/18/2019
js: false
php: false

---

## Getting Started

Cards can be used to callout some relevant information and visually group similar content. Contact cards are especially useful for inserting contact information within the context of another page.

###### EXPORT VIA GRUNT

```
grunt export:molecules-card-contact
```


### Description

The card contact molecule can be used to include a contact card within another pattern. Contact cards require an image, preferably in the form of a square headshot, but will default to a generic placeholder image if none is given.


### Best Practices

- Provide a square headshot whenever applicable


## Schema

| Name    | Type      | Description | Value(s)  | Default   |
|---------|-----------|-------------|-----------|-----------|
| name    | `String`  | The name of the contact, optionally formatted with postnominals included.                   |           |           |
| title   | `String`  | The contact's title or position, optionally including their division separated by a comma.  |           |           |
| email   | `String`  | The contact's email address.                                                                |           |           |
| href    | `String`  | A path or URL to the contact's biography or profile page.                                   |           |           |
| target  | `String`  | Optionally indicates where the `href` hyperlink should be opened.                           | `_self`, `_blank`, `_parent`, or `_top` | `_self`   |
| image   | `String`  | An optional path or URL to the contact's headshot, preferably in a square format.           |           |           |
| gender  | `String`  | Optionally indicates the contact's gender, used to identify the placeholder avatar to be used when no `image` is given.  | `male` or `female`  | `male`  |
