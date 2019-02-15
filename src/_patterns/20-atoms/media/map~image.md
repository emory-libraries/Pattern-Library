---

state: review

---

## Getting Started

Maps are used to show the location of a place. Maps can be a useful tool for helping users locate buildings, offices, libraries, events, and more both on-campus and off-campus.

###### EXPORT VIA GRUNT

```
grunt export:atoms-map-image
```


### Description

The map image atom can be used to insert a still map image into another pattern. Maps images rely on a map ID that cooresponds to a given screenshot within our image library.


### Best Practices

- Only use one map per page to avoid visual clutter
- Resize maps accordingly to fit your use case


## Schema

| Name        | Type          | Description                                                                                           | Value(s)            | Default   |
|-------------|---------------|-------------------------------------------------------------------------------------------------------|---------------------|-----------|
| id          | `String`      | The ID of the map image to display.                                                                   | `business`, `health`, `law`, `music`, `oxford`, `rose`, `theology`, or `woodruff` |           |
| scale        | `Percentage` | The map image's zoom level, where `100%` is the default.                                              | >=`100%`             | `100%`      |


## Classes

### Variations

| Class       | Description                                                                                                   |
|-------------|---------------------------------------------------------------------------------------------------------------|
| `-h-fixed`  | Inidicates that map's the height is fixed rather than a percentage of its width, applied to the `.map-frame`. |
| `-image`    | Inidicates that map is an image.                                                                              |
