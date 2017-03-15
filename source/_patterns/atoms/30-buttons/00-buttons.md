---
title: Button Styles
---
These styles apply to states and context of the buttons (e.g. - default, primary, success, etc. as well as a disabled). It's important to note when to use a <code>button</code> element and when to use a <code>a</code> element. Short version: Use buttons when submitting a form and links for everything else.

<code>.btn</code> contains the base button styles. The following classes alter the button colors.

<code>
<pre>
.btn-primary
.btn-info
.btn-success
.btn-warning
.btn-danger
.btn-disabled (or disabled attribute if &lt;button&gt; instead of &lt;a&gt;)
</pre>
</code>
The disabled button style is applied to any button that has the <code>disabled</code> boolean attribute.
