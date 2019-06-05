---

state: review
created: 04/22/2019
updated: 04/22/2019
js: false
php: false

---

## Getting Started

Cards can be used to callout some relevant information and visually group similar content.

###### EXPORT VIA GRUNT

```
grunt export:compounds-cards
```


### Description

The cards compound can be used to include a set of cards within another pattern. This cards pattern enables the arrangement of a set of cards into a grid layout.


### Best Practices

- Only use one type of card within a card grid


## Schema

| Name            | Type        | Description                                                                                 | Value(s)  | Default   |
|-----------------|-------------|---------------------------------------------------------------------------------------------|-----------|-----------|
| type            | `String`    | The type of cards to be displayed within the card grid, which takes precedence over `cards.n.type`. Refer to the cards section under molecules for all available card types.  | `action`, `contact`, `librarian`, `library-aid`, `library-guide`, `listing`, or `multimedia`  |           |
| cards           | `Array`    | A set of cards to be displayed.                                                              |           |           |
| cards.`n`       | `Object`   | Some card configurations using the appropriate schema based on `cards.n.type` or `type`.     |           |           |
| cards.`n`.type  | `String`   | Alternatively, the type of card to be displayed, can be used instead of `type`.              |           |           |

