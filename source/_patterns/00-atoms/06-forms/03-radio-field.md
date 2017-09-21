---
state: complete
---

Radios utilize `input[type="radio"]` and can either have one of two states: checked (truthy) or not checked (falsy). Unlike checkboxes, however, radios are typically falsy by default and only allow the user to toggle the truthy state; unless multiple radios are given within the same radio button group, the user is prohibited from toggling the radio's falsy state once its truthy state has been set. Use radios to indicate Boolean values that are codepenedent on other input options.