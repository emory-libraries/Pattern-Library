---

state: review
created: 06/13/2019
updated: 06/14/2019
js: false
php: false

---

## Getting Started

The exhibitions gallery page provides users with an overview of all current and past exhibitions.

###### EXPORT VIA GRUNT

```
grunt export:templates-gallery
```


### Description

The gallery template can be used to create an Exhibition Gallery page.


### Best Practices

- Only ever include one main section within the template
- Major section colors should alternate between a dark and light theme
- Only one exhibition gallery page should exist within a site


## Schema

This pattern extends [`organisms-main`][organisms-main] and [`organisms-major`][organisms-major] and uses the schemas for [`tokens-reveal`][tokens-reveal], [`compounds-cards`][compounds-cards], and [`compounds-tiles`][compounds-tiles].

[organisms-main]: /patterns/50-organisms-sections-main/50-organisms-sections-main.html
[organisms-major]: /patterns/50-organisms-sections-major/50-organisms-sections-major.html
[tokens-reveal]: /patterns/10-tokens-10-globals-reveal/10-tokens-10-globals-reveal.html
[compounds-cards]: /patterns/40-compounds-cards-cards/40-compounds-cards-cards.html
[compounds-tiles]: /patterns/40-compounds-tiles-tiles/40-compounds-tiles-tiles.html
