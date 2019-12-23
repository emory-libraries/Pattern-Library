---

state: complete
created: 06/03/2019
updated: 06/03/2019
js: false
php: false

---

## Getting Started

The staff directory page is intended to provide users with an overview of all staff members working within the library.

###### EXPORT VIA GRUNT

```
grunt export:templates-staff-directory
```


### Description

The staff directory template can be used to create a Staff Directory page.


### Best Practices

- Only ever include one main section within the template
- Only one staff directory page should exist within a site


## Schema

This pattern extends [`organisms-main`][organisms-main] and uses the schemas for [`tokens-grid`][tokens-grid], [`atoms-filter-search`][atoms-filter-search], [`molecules-card-staff`][molecules-card-staff], and [`compounds-cards`][compounds-cards].

[organisms-main]: /patterns/50-organisms-main-main/50-organisms-main-main.html
[tokens-grid]: /patterns/10-tokens-10-globals-grid/10-tokens-10-globals-grid.html
[atoms-filter-search]: /patterns/20-atoms-filters-filter-search/20-atoms-filters-filter-search.html
[molecules-card-staff]: /patterns/30-molecules-cards-card-staff/30-molecules-cards-card-staff.html
[compounds-cards]: /patterns/40-compounds-cards-cards/40-compounds-cards-cards.html
