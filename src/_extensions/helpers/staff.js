// Load dependencies.
const _ = require('lodash');
const formats = require('./format.js');

// Export helpers.
module.exports = {

  // Get the sidebar sections and their content.
  getSidebar( context, options ) {

    // Initialize the sidebar section data.
    const sections = [];

    // Initialize a helper for generating a new section.
    class Section {
      constructor( options = {} ) {
        this.content = _.compact([...(options.content || [])]);
        this.button = _.isPlainObject(options.button) ? options.button : null;
        this.links = _.compact([...(options.links || [])]);
        this.icon = options.icon || false;
        this.title = options.title || null;
      }
    }

    // Extract contact information from the context for the first section.
    if( context.phone || context.fax || context.libcal ) sections.push(new Section({
      title: 'Contact Information',
      content: [
        context.phone ? `P: ${formats.formatPhone(context.phone, '000-000-0000')}` : null,
        context.fax ? `F: ${formats.formatPhone(context.fax, '000-000-0000')}` : null,
      ],
      button: context.libcal ? {
        href: context.libcal,
        label: 'Schedule an Appointment'
      } : null
    }));

    // Extract mailing address information from the context for the next section.
    if( context.address ) sections.push(new Section({
      title: 'Mailing Address',
      content: [
        context.address.name,
        context.address.street,
        (context.address.city ? `${context.address.city}, ` : '') +
        (context.address.state ? `${context.address.state} ` : '') +
        (context.address.zip ? `${context.address.zip}` : '')
      ]
    }));

    // Extract subject area information from the context for the next section.
    if( context.subjects ) sections.push(new Section({
      title: 'Areas of Expertise',
      links: _.map(context.subjects, (subject) => ({
        href: `/services/subject-librarians?subject=${_.replace(subject, ' ', '+')}`,
        label: subject
      }))
    }));

    // Extract research guides information from the context for the next section.
    if( context.guides ) sections.push(new Section({
      title: 'Research Help',
      links: [{
        href: context.guides,
        label: 'View Research Guides'
      }]
    }));

    // Extract download links information from the context for the last section.
    if( context.cv ) sections.push(new Section({
      title: 'Related Downloads',
      links: [{
        href: context.cv,
        label: 'Curriculum Vitae (CV)',
        icon: 'material-picture_as_pdf'
      }]
    }));

    // Return the sections data.
    return sections;

  }

};
