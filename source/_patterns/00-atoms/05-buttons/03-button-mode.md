---
state: complete
---

Buttons have two modes: enabled or disabled. By default, all buttons are enabled. To toggle a button's disabled mode, use the `.disabled` class. For proper semantics, disabled buttons and button inputs, not button links, should also be given the `disabled` attribute. To include a disabled button within another pattern, use `{{> atoms-button{:<styleModifier>}(disabled: true{, ...}) }}`.