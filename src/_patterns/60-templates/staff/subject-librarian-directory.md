---

state: review
created: 05/29/2019
updated: 06/03/2019
js: false
php: false

---

## Getting Started

The subject librarian directory page is intended to provide users with an overview of all Subject Librarians available throughout the library.

###### EXPORT VIA GRUNT

```
grunt export:templates-subject-librarian-directory
```


### Description

The subject librarian directory template can be used to create a Subject Librarian Directory page.


### Best Practices

- Only ever include one main section within the template
- Only one subject librarian directory page should exist within a site


## Schema

This pattern extends [`organisms-main`][organisms-main] and uses the schemas for [`tokens-grid`][tokens-grid], [`atoms-filter-dropdown`][atoms-filter-dropdown], [`molecules-card-librarian`][molecules-card-librarian], and [`compounds-cards`][compounds-cards].


[organisms-main]: /patterns/50-organisms-main-main/50-organisms-main-main.html
[tokens-grid]: /patterns/10-tokens-10-globals-grid/10-tokens-10-globals-grid.html
[atoms-filter-dropdown]: /patterns/20-atoms-filters-filter-dropdown/20-atoms-filters-filter-dropdown.html
[molecules-card-librarian]: /patterns/30-molecules-cards-card-librarian/30-molecules-cards-card-librarian.html
[compounds-cards]: /patterns/40-compounds-cards-cards/40-compounds-cards-cards.html
