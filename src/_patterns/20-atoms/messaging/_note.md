---

state: reconsideration
created: 03/04/2019
updated: 09/23/2019
js: false
php: false

---

## Getting Started

Notes are a messaging tool that helps to draw users' attention to some important information. Notes can be used to include footnote-type content within the context of other page content.

###### EXPORT VIA GRUNT

```
grunt export:atoms-note
```


### Description

The note atom can be used to include a note within another pattern. While notes can be used with a variety of content, their content should be limited to text and is most effective when used to communicate information in a few short sentences.


### Best Practices

- Avoid using images, videos, and other media within notes
- Try to limit note content to a few short sentences


## Schema

| Name      | Type        | Description                                                 | Value(s)          | Default   |
|-----------|-------------|-------------------------------------------------------------|-------------------|-----------|
| text      | `String`    | Some text content to be displayed.                          |                   |           |
| markdown  | `Boolean`   | Indicates whether the `text` should be parsed as Markdown.  | `true` or `false` | `false`   |
