---
state: review
---

Button icons can be positioned in a variety of ways using icon style modifiers applied to the button element. By default, icons are positioned to the left of any button text (`.icon-left`). A complete list of positioning options is given below:

- `.icon-left`

  Positions the icon to the left of the button text. This is the default. Use `{{> atoms-button{:<styleModifier>}(icon: '<iconID>'{, ...}) }}` to include an icon button with `.icon-left` positioning within another pattern.
  
- `.icon-right`

  Positions the icon to the right of the button text. Use `{{> atoms-button{:<styleModifier>}(icon: '<iconID>', iconRight: true{, ...}) }}` to include an icon button with `.icon-right` positioning within another pattern.
  
- `.icon-block-left`

  Positions the icon to the left of the button text with a block around the icon. Use `{{> atoms-button{:<styleModifier>}(icon: '<iconID>', iconBlock: true{, ...}) }}` to include an icon button with `.icon-block-left` positioning within another pattern.
  
- `.icon-block-right`

  Positions the icon to the right of the button text with a block around the icon. Use `{{> atoms-button{:<styleModifier>}(icon: '<iconID>', iconBlock: true, iconRight: true{, ...}) }}` to include an icon button with `.icon-block-right` positioning within another pattern.