module.exports = (plop) => {

  // Load dependencies.
  const fs = require('fs');
  const _ = require('lodash');
  const plconfig = require('./patternlab-config.json');

  // Configures generators.
  const config = {

    // Define global configurations.
    padding: 2,
    regex: {
      variation: () => /~(.+)$/,
      order: () => new RegExp(`^\\d{${config.padding}}-`)
    },
    order: {
      min: 00,
      max: 99
    },

    // Define configurations for the pattern group generator.
    group: {},

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

  // Extend lodash.
  _.slugify = (text) => {

    // Initialize helpers.
    let variations;

    // Extract any variations from the pattern string.
    if( (variations = text.match(config.regex.variation())) ) {

      variations = '~' + _.kebabCase(_.trimStart(variations[0], '~'));

    } else { variations = ''; }

    // Get the pattern slug.
    let pattern = _.kebabCase(text.replace(config.regex.variation(), ''));

    // Return the slug.
    return `${pattern}${variations}`;

  };
  _.unslugify = (slug) => {

    // Initialize helpers.
    let variations;

    // Remove any digits from the start of the slug.
    slug = slug.replace(config.regex.order(), '');

    // Wrap any variations at the end of the slug in parentheses.
    if( (variations = slug.match(config.regex.variation())) ) {

      variations = ' (' + _.startCase(_.trimStart(variations[0], '~')) + ')';

    } else { variations = ''; }

    // Get the title.
    let title = _.startCase(slug.replace(config.regex.variation(), ''));

    // Return the title.
    return `${title}${variations}`;

  };
  _.isset = (value) => !_.isNil(value) && value !== '';

  // Define new helpers.
  plop.setHelper('unslugify', (slug) => _.unslugify(slug));

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
        name: 'pattern',
        message: "What is the pattern group's name?",
        filter: ( input ) => _.slugify(input)
      },
      {
        type: 'list',
        name: 'group',
        message: "What is the pattern group's atomic group?",
        choices: Object.keys(config.pattern.groups),
        default: Object.keys(config.pattern.groups)[0]
      },
      {
        type: 'input',
        name: 'order',
        message: "What is the pattern group's order number? (optional)",
        validate( input, answers ) {

          // Allow non-answers.
          if( !_.isset(input) ) return true;

          // Otherwise, throw an error for values that fall outside the min and max order numbers.
          if( +input < config.order.min || +input > config.order.max ) {

            return `Please enter a number between ${config.order.min} - ${config.order.max}.`;

          }

          // Otherwise, assume the value is valid.
          return true;

        }
      },
    ],
    actions(data) {

      // Get the order prefix.
      data.prefix = _.isset(data.order) ? _.padStart(data.order, config.padding, '0') + '-' : '';

      // Extract atomic number.
      data.atomic = _.padStart(config.pattern.groups[data.group], config.padding, '0');

      // Determine the pattern group's name.
      data.name = plop.renderString('{{prefix}}{{pattern}}', data);

      // Determine the pattern group's path.
      data.path = plop.renderString('src/_patterns/{{atomic}}-{{group}}/{{name}}', data);

      // Initialize actions.
      const actions = [];

      // 1. Create the new pattern group's folder.
      actions.push({
        type: 'mkdir',
        path: data.path,
        data
      });

      // 2. Create the new pattern group's MD file.
      actions.push({
        type: 'add',
        path: '{{path}}.md',
        templateFile: 'templates/group/group.md',
        data
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
        message: "What is the pattern's name?",
        filter: ( input ) => _.slugify(input)
      },
      {
        type: 'list',
        name: 'group',
        message: "What is the pattern's atomic group?",
        choices: Object.keys(config.pattern.groups),
        default: Object.keys(config.pattern.groups)[0]
      },
      {
        type: 'list',
        name: 'subgroup',
        message: "Does the pattern belong to a pattern group?",
        choices( answers ) {

          // Initialize choices.
          const choices = ['none'];

          // Extract atomic number.
          const atomic = _.padStart(config.pattern.groups[answers.group], config.padding, '0');

          // Get the list of pattern groups, if any.
          const groups = fs.readdirSync(`src/_patterns/${atomic}-${answers.group}`).filter((file) => fs.statSync(`src/_patterns/${atomic}-${answers.group}/${file}`).isDirectory());

          // Return choices.
          return choices.concat(groups);

        },
        default: 'none',
        filter: ( input ) => input == 'none' ? false : input
      },
      {
        type: 'input',
        name: 'order',
        message: "What is the pattern's order number? (optional)",
        validate( input, answers ) {

          // Allow non-answers.
          if( !_.isset(input) ) return true;

          // Otherwise, throw an error for values that fall outside the min and max order numbers.
          if( +input < config.order.min || +input > config.order.max ) {

            return `Please enter a number between ${config.order.min} - ${config.order.max}.`;

          }

          // Otherwise, assume the value is valid.
          return true;

        }
      },
      {
        type: 'confirm',
        name: 'js',
        message: "Will this pattern use JS?",
        default: false
      }
    ],
    actions(data) {

      // Get the order prefix.
      data.prefix = _.isset(data.order) ? _.padStart(data.order, config.padding, '0') + '-' : '';

      // Extract atomic number.
      data.atomic = _.padStart(config.pattern.groups[data.group], config.padding, '0');

      // Determine the pattern's directory.
      data.path = plop.renderString('src/_patterns/{{atomic}}-{{group}}' + (data.subgroup ? '/{{subgroup}}' : ''), data);

      // Determine the pattern's name.
      data.name = plop.renderString('{{prefix}}{{pattern}}', data);

      // Initialize actions.
      const actions = [];

      // 1. Create the new pattern's HBS file.
      actions.push({
        type: 'add',
        path: `{{path}}/{{name}}.${plconfig.patternExtension}`,
        templateFile: `templates/pattern/pattern.${plconfig.patternExtension}`,
        data
      });

      // 2. Create the new pattern's JSON file.
      actions.push({
        type: 'add',
        path: '{{path}}/{{name}}.json',
        templateFile: 'templates/pattern/pattern.json',
        data
      });

      // 3. Create the new pattern's MD file.
      actions.push({
        type: 'add',
        path: '{{path}}/{{name}}.md',
        templateFile: 'templates/pattern/pattern.md',
        data
      });

      // 4. Create the new pattern's SCSS file.
      actions.push({
        type: 'add',
        path: '{{path}}/{{name}}.scss',
        templateFile: 'templates/pattern/pattern.scss',
        data
      });

      // 5. Create the new pattern's JS file.
      if( data.js ) actions.push({
        type: 'add',
        path: '{{path}}/{{name}}.js',
        templateFile: 'templates/pattern/pattern.js',
        data
      });

      // Generate.
      return actions;

    }
  });

};
