// Initialize the deploy method for publishing things to the web server via webdav.
module.exports = function() {

  // Make the task async.
  const done = this.async();

  // Load dependencies.
  const webdav = require('webdav').createClient;
  const inquirer = require('inquirer');
  const chalk = require('chalk');
  const glob = require('glob').sync;
  const path = require('path');
  const progress = require('cli-progress');
  const grunt = require('grunt');
  const fs = require('fs-extra');
  const _ = require('lodash');

  // Get the package's data.
  const package = require(path.resolve('./package.json'));

  // Get the dist folder root.
  const root = path.resolve('./dist', package.version);

  // Always deploy the latest dist based on the package's version number.
  const files = glob(path.join(root, '**/*'), {
    nodir: true
  });

  // Initialize webdav credentials.
  let username, password, host, dest;

  // Initialize a promise that should only resolve one credentials are detected.
  const credentials = new Promise((resolve, reject) => {

    // Try to load the secret.json file if available.
    try {

      // Attempt to load the secret JSON file.
      const secret = require(path.resolve('./secret.json'));

      // Extract the webdav credentials from the secret file.
      username = secret.webdav.username;
      password = secret.webdav.password;
      dest = secret.webdav.path;
      host = secret.webdav.host || 'https://files.web.emory.edu/site/LibraryWeb/';

      // If a username and/or password was missing, then throw an error.
      if( _.isNil(username) || username === '' ) throw new Error('Username is required');
      if( _.isNil(password) || password === '' ) throw new Error('Password is required');
      if( _.isNil(dest) || dest === '' ) throw new Error('Path is required');

      // Resolve the promise.
      resolve();

    }

    // Otherwise, require that the user supply their webdav credentials.
    catch(error) {

      inquirer.prompt([
        {
          type: 'input',
          name: 'username',
          message: 'Provide your WebDAV username.',
          validate: (value) => !_.isNil(value) && value !== '' ? true : chalk.red('Username is required.')
        },
        {
          type: 'password',
          name: 'password',
          message: 'Provide your WebDAV password.',
          validate: (value) => !_.isNil(value) && value !== '' ? true : chalk.red('Password is required.'),
          mask: '*'
        },
        {
          type: 'input',
          name: 'host',
          message: 'Provide the WebDAV host.',
          validate: (value) => !_.isNil(value) && value !== '' ? true : chalk.red('Host is required.'),
          default: 'https://files.web.emory.edu/site/LibraryWeb/'
        },
        {
          type: 'input',
          name: 'path',
          message: 'Provide the WebDAV path.',
          validate: (value) => !_.isNil(value) && value !== '' ? true : chalk.red('Path is required.')
        },
        {
          type: 'confirm',
          name: 'confirm',
          message: chalk.bold('Do you wish to continue?')
        }
      ]).then((answers) => {

        // If a confirmation was not given, then reject the promise.
        if( !answers.confirm ) reject();

        // Save the webdav credentials.
        username = answers.username;
        password = answers.password;
        host = answers.host;
        dest = answers.path;

        // Resolve the promise.
        resolve();

      });

    }

  });

  // Wait for credentials to be given.
  credentials.then(() => {

    // Initialize the webdav client.
    const client = webdav(host, {username, password});

    // Initialize a progress bar.
    const status = new progress.SingleBar({}, progress.Presets.shades_classic);

    // Initialize the progress bar's initial value.
    status.start(files.length, 0);

    // Capture a set of promises for the file uploads.
    const uploads = [];

    // Capture any errors that occur during upload.
    const errors = [];

    // Capture the names of files that are uploaded without issues.
    const success = [];

    // Upload all files to the webdav host.
    _.each(files, (file, i) => {

      // Get the relative path of the file.
      const src = file.replace(root, '');

      // Get the file's extension.
      const ext = path.extname(file);

      // Get the file's contents as a buffer.
      const contents = fs.readFileSync(file);

      // Start uploading the file.
      const upload = client.putFileContents(path.join(dest, src), contents, {
        maxContentLength: 1024 ** 3
      }).then(() => {

        // Save the file that was uploaded successfully.
        success.push(src);

      }).catch((error) => {

        // If an error occurred, then capture the file that threw an error, then continue.
        errors.push(src);

      }).finally(() => {

        // Update the progress bar to indicate that the file was handled.
        status.increment();

      });

      // Save the upload.
      uploads.push(upload);

    });

    // Wait for all uploads to finish.
    Promise.all(uploads).then(() => {

      // Stop the progress bar once all uploads have completed.
      status.stop();

      // Indicate that the deploy completed successfully without any issues.
      grunt.log.ok('WebDAV deploy was completed successfully.');

      // Exit the grunt task.
      done();

    }).catch((error) => {

      // Stop the progress bar once an error occurs.
      status.stop();

      // Indicate that nothing was deployed.
      grunt.log.error('WebDAV deploy was not completed due to a connection error.', error);

      // Exit the grunt task.
      done();

    });

  }).catch((error) => {

    // Indicate that nothing was deployed.
    grunt.log.error('WebDAV deploy was not completed due to invalid credentials.');

    // Exit the grunt task.
    done();

  });

};
