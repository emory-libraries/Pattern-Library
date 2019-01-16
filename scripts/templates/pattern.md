---

layout: pattern-detail
group: user-interface
subgroup: {{group}}
permalink: /user-interface/{{group}}/{{name}}

title: {{capitalizeAll name}}
description: {{data.description}}
status: {{data.state}}


variations:
- title: Default
  description: {{data.description}}
  class:
  group: {{group}}
  subgroup: {{subgroup}}
  name: {{name}}
{{#forOwn variations}}
- title: {{capitalizeAll @key}}
  description: {{data.description}}
  class: {{data.class}}
  group: {{../group}}
  subgroup: {{../subgroup}}
  name: {{../name}}-{{@key}}
{{/forOwn}}
  
usage:
{{#if data.usage}}{{#forEach data.usage}}
- title: {{title}}
  description: {{description}}
{{/forEach}}{{/if}}


classes:
{{#if data.classes}}{{#forEach data.classes}}
- name: {{name}}
  description: {{description}}
  {{#if required}}required: {{required}}{{/if}}
  {{#if modifier}}modifier: {{modifier}}{{/if}}
  {{#if recommended}}recommended: {{recommended}}{{/if}}
{{/forEach}}{{/if}}

meta:
- updated: {{date 'now' 'MMMM D, YYYY'}}
  {{#if data.version}}version: {{data.version}}{{/if}}
  {{#if data.author}}author: {{data.author}}{{/if}}
  
---
