---

layout: pattern-detail
group: user-interface
subgroup: {{group}}
permalink: /user-interface/{{group}}/{{plid}}

title: {{capitalizeAll (replace name '-' ' ')}}{{#if variation}} - {{capitalizeAll (replace variation '-' ' ')}}{{/if}}
id: {{id}}
plid: {{plid}}
description: {{data.description}}
status: {{data.state}}

meta:
- updated: {{date 'now' 'MMMM D, YYYY'}}
  {{#if data.version}}version: {{data.version}}{{/if}}
  {{#if data.author}}author: {{data.author}}{{/if}}
  
---

{{{docs.content}}}