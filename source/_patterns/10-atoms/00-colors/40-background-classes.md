---
state: complete
---

By default, all text, links, and icons sitewide are displayed as a dark foreground on top of a light background. Use any of these color classes to change the background color. The standard syntax for a background class is `.color-<name>-bg`.

For better accessibility when using these classes, be sure to contrast the background against the foreground. As a starting point, these styles will automatically attempt to contrast the background for you. If you do not see this contrast by default, it could be due to foreground variations on nested elements. You can apply the contrast class `.color-<name>-bg-contrast` where deviation occurs to enforce color contrasting.

While we've attempted to present contrasting foreground and background combinations according to accessibility requirements, we're not claiming to be perfect. In order to ensure that your web document is accessibility compliant, please double check that all colors are properly contrasted according to [WebAIM Color Contrast](http://webaim.org/resources/contrastchecker) standards.