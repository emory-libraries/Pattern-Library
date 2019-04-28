---

state: review
created: 04/26/2019
updated: 04/28/2019
js: false
php: false

---

## Getting Started

The service directory page is intended to provide users with an overview of all library services available to them.

###### EXPORT VIA GRUNT

```
grunt export:templates-service-directory
```


### Description

The service directory template can be used to create an **service directory page**.


### Best Practices

- Only ever include one main section within the template
- Only one service directory page should exist within a site


## Schema

This pattern extends [`organisms-main`][organisms-main] and uses the schemas for [`tokens-grid`][tokens-grid], [`atoms-filter-search`][atoms-filter-search], [`molecules-card-button`][molecules-card-button], and [`compounds-accordion`][compounds-accordion].

[organisms-main]: /patterns/50-organisms-main-main/50-organisms-main-main.html
[tokens-grid]: /patterns/10-tokens-10-globals-grid/10-tokens-10-globals-grid.html
[atoms-filter-search]: /patterns/20-atoms-filters-filter-search/20-atoms-filters-filter-search.html
[molecules-card-button]: /patterns/30-molecules-cards-card-button/30-molecules-cards-card-button.html
[compounds-accordion]: /patterns/40-compounds-modules-accordion/40-compounds-modules-accordion.html
