---
state: review
---

Buttons can be easily resized by adding any of the following size classes to the button element. These button classes will proportionately scale the button up or down in size. As a point of reference, the default button size is considered medium. A complete list of size options is given below:

- `.size-large`

  Resizes the button to be about 125% of its normal size.
  
- `.size-small`

  Resizes the button to be about 75% of its normal size.
  
- `.size-mini`

  Resizes the button to be about 65% of its normal size.
  

To include a resize button within another pattern, simply use `{{> atoms-button{:<styleModifier>} }}`, and replace the `<styleModifier>` with the preferred button size class above.