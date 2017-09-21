---
state: complete
---

By default, all text, links, and icons sitewide are displayed as a dark foreground on top of a light background. Use any of these foreground classes to change the foreground color. The standard syntax for a foreground class is `.color-<name>`.

For better accessibility when using these classes, be sure to contrast the background against the foreground. This is not done automatically although a corresponding contrast class is given in an attempt to help identify a contrasting light or dark background. This contrast class can be applied by using `.color-<name>-contrast` on the same element.

While we've attempted to present contrasting foreground and background combinations according to accessibility requirements, we're not claiming to be perfect. In order to ensure that your web document is accessibility compliant, please double check that all colors are properly contrasted according to [WebAIM Color Contrast](http://webaim.org/resources/contrastchecker) standards.