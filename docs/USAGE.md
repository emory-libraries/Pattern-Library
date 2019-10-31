There are three main ways to deploy this Pattern Library across Emory Libraries' websites and/or applications. Refer to the guidelines below that pertain to your specific use case.

### Using Distributed Files
For projects where you have full control over the project's structure and wish to deploy the Pattern Library, you can deploy this Pattern Library through the use of our distributed files. These files consist of the CSS, JS, and other asset files that make up our design system, and they can be imported, included, and/or otherwise loaded directly into your website or application for immediate use. For the most recent version of our distributed files, you can refer to our [Pattern Library]({%= link.patternlibrary %}) and optionally make use of our [latest deployed release]({%= link['patternlibrary-release'] %}). Alternatively, you can utilize our [`grunt dist`](#grunt-dist) task to generate your own version of our distribution files.

### Using Source Files
For projects where you have full control over your project's structure but may not need our entire library of patterns, you can make use of our Pattern Library's source files. More specifically, you can utilize the pattern definitions directly, which can be found in `src/_patterns`. These files consist of the raw pattern files (`.hbs`) and their respective assets (`.scss`, `.js`, `.php`, etc.). To integrate our source files into your website or application, you can easily [export any of our patterns](#exporting-patterns).

### Referring to the Patterns
For all projects where you have limited to no control over the project's structure (i.e., when working with vendor products), you can deploy our Pattern Library by simply referring to our patterns and incorporating them into your website and/or application as closely as possible. *More information on best practices for using this approach, and other helpful information about our design system, please contact the LTDS web team.*
