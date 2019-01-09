module.exports = (plop) => {

  // Load dependencies.
  const slugify = require('slugify');
  const fs = require('fs');
  const _ = require('lodash');

  // Configures generators.
  const config = {

    // Define configurations for the pattern generator.
    pattern: {
      groups: {
        meta: 00,
        tokens: 10,
        atoms: 20,
        molecules: 30,
        compounds: 40,
        organisms: 50,
        templates: 60
      }
    }

  };

  // Define an action type for creating new directories.
  plop.setActionType('mkdir', (answers, config, plop) => {

    // Get the path.
    const path = plop.renderString(config.path, answers);

    // Make the directory.
    fs.mkdirSync(path);

    // Return the new path.
    return path;

  });

  // Build generator for pattern groups.
  plop.setGenerator('group', {
    description: 'Creates a new pattern group',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Name of the pattern group',
        filter: ( input ) => slugify(input)
      },
      {
        type: 'list',
        name: 'group',
        message: "The pattern group's atomic group",
        choices: Object.keys(config.pattern.groups),
        default: Object.keys(config.pattern.groups)[0]
      }
    ],
    actions(data) {

      // Extract atomic number.
      const atomicNumber = _.padStart(config.pattern.groups[data.group], 2, '0');

      // Initialize actions.
      const actions = [];

      // 1. Create the new pattern group's folder.
      actions.push({
        type: 'mkdir',
        path: `src/_patterns/${atomicNumber}-{{group}}/{{name}}`
      });

      // 2. Create the new pattern group's MD file.
      actions.push({
        type: 'add',
        path: `src/_patterns/${atomicNumber}-{{group}}/{{name}}.md`,
        templateFile: 'templates/group/group.md'
      });

      // Generate.
      return actions;

    }
  });

  // Build generator for patterns.
  plop.setGenerator('pattern', {
    description: 'Creates a new pattern',
    prompts: [
      {
        type: 'input',
        name: 'pattern',
        message: 'Name of the pattern',
        filter: ( input ) => slugify(input)
      },
      {
        type: 'list',
        name: 'group',
        message: "The pattern's atomic group",
        choices: Object.keys(config.pattern.groups),
        default: Object.keys(config.pattern.groups)[0]
      },
      {
        type: 'confirm',
        name: 'js',
        message: "Will this component use JS?",
        default: false
      }
    ],
    actions(data) {

      // Extract atomic number.
      const atomicNumber = _.padStart(config.pattern.groups[data.group], 2, '0');

      // Initialize actions.
      const actions = [];

      // 1. Create the new pattern's HBS file.
      actions.push({
        type: 'add',
        path: `src/_patterns/${atomicNumber}-{{group}}/{{pattern}}.handlebars`,
        templateFile: 'templates/pattern/pattern.handlebars'
      });

      // 2. Create the new pattern's JSON file.
      actions.push({
        type: 'add',
        path: `src/_patterns/${atomicNumber}-{{group}}/{{pattern}}.json`,
        templateFile: 'templates/pattern/pattern.json'
      });

      // 3. Create the new pattern's MD file.
      actions.push({
        type: 'add',
        path: `src/_patterns/${atomicNumber}-{{group}}/{{pattern}}.md`,
        templateFile: 'templates/pattern/pattern.md'
      });

      // 4. Create the new pattern's SCSS file.
      actions.push({
        type: 'add',
        path: `src/_patterns/${atomicNumber}-{{group}}/{{pattern}}.scss`,
        templateFile: 'templates/pattern/pattern.scss'
      });

      // 5. Create the new pattern's JS file.
      if( data.js ) actions.push({
        type: 'add',
        path: `src/_patterns/${atomicNumber}-{{group}}/{{pattern}}.js`,
        templateFile: 'templates/pattern/pattern.js'
      });

      // Generate.
      return actions;

    }
  });

};
