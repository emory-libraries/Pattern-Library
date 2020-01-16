Components.register('hours-regular', {

  props: {
    hours: {
      type: Object,
      required: true
    },
    format: {
      type: Object,
      default() {
        return {
          date: [
            'MM-DD-YYYY'
          ],
          time: [
            'HH:mm A',
            'H:mm A',
            'HH:m A',
            'H:m A'
          ]
        };
      }
    }
  },

  data() {
    return {
      selected: {
        semester: null,
        location: null
      },
      scroll: {
        area: null,
        distance: 120,
        position: 0,
        min: 0,
        max: 720,
        steps: 7,
        index: 0,
        speed: 250
      }
    };
  },

  methods: {

    // Determine if the given semester data matches the selected semester's data.
    isSelectedSemester( semester ) {

      // Compare the semester data for a match.
      return _.isEqual(this.selected.semester, semester);

    },

    // Determine if the given location data matches the selected location's data.
    isSelectedLocation( location ) {

      // Compare the location data for a match.
      return _.isEqual(this.selected.location, location);

    },

    // Scroll to the desired position within the scroll area based on the given index.
    scrollTo( index ) {

      // Get the scroll distance, min, and max.
      const distance = this.scroll.distance;
      const min = this.scroll.min;
      const max = this.scroll.max;

      // Determine if the index is valid.
      index = index < this.scroll.steps ? index < this.scroll.min ? 0 : index : this.scroll.steps - 1;

      // Calculate the targeted scroll position based on the given index.
      const position = this.scroll.distance * index;

      // Update the new scroll position of the scroll area.
      this.scroll.area.animate({scrollLeft: position}, this.scroll.speed);

    },

    // Monitor the scroll area's scroll events.
    scrollMonitor() {

      // Get the scroll position of the scroll area.
      this.scroll.position = this.scroll.area.scrollLeft();

      // Determine the scroll area's index position.
      this.scroll.index = Math.floor(this.scroll.position / this.scroll.distance);

    }

  },

  mounted() {

    // Capture the scrollable area.
    this.scroll.area = $(this.$el).find('.hours-preview-hours');

  },

  computed: {

    // Get data for the selected semester.
    semester() {

      // Find data for the given semester.
      return _.find(this.hours.grouped.semesters, this.selected.semester);

    },

    // Create array of unique semesters by name and year
    uniqueSemesters() {
      let uniqueSemesterName = '';
      let semesterNamesArray = [];
      let semestersArray = [];

      this.hours.semesters.forEach(function(semester) {
        uniqueSemesterName = semester.name + ' '+ semester.year;

        if (semesterNamesArray.indexOf(uniqueSemesterName) === -1) {
          semesterNamesArray.push(uniqueSemesterName);
          semestersArray.push(semester);
        }
      });
      return semestersArray;

    },

    // Get data for the selected location.
    location() {

      // Find data for the given location based on the active semester.
      return _.find(this.semester.hours, {location: this.selected.location});

    },

    // Get the schedule of regular hours for the selected semester and library.
    schedule() {

      // Get the current location.
      const location = this.location;

      // If no hours data was found for the active location then return an empty schedule.
      if( !location ) return [];

      // Get the localized order of weekdays.
      const weekdays = this.hours.weekdays;

      // Extract the location's building schedule.
      const building = {
        name: 'Building Hours',
        hours: _.sortBy(_.values(location.building.hours), (day) => weekdays.indexOf(day.weekday))
      };

      // Extract the location's services schedule.
      const services = _.map(location.services, (service) => ({
        name: service.name,
        hours: _.sortBy(_.values(service.hours), (day) => weekdays.indexOf(day.weekday))
      }));

      // Return the location's schedule, composed of building and services hours.
      return [building, ...services];

    }

  }

});
