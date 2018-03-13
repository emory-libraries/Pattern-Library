# Pattern Library - Node Version

This is the Node version of Emory Libraries' Pattern Library.

## Prerequisites

This Pattern Lab instance requires the use of [Node.js][Node.js] for core processiong and [npm][npm] for mangement of project dependencies. Additionally, this instance also uses [Grunt][Grunt] as a taskrunner and to interface with the core library. It's also highly recommended that you use [git][git] for installation and version control.

## Installation

Prior to installation, please ensure that all prerequistites have been met. To install this project on your system, you will need to follow the instructions below:

  1. Download and unzip the compressed version of this respository, or use `git` to locally clone this repository
    
  ```
  git clone https://github.com/emory-libraries/pattern-library-node.git
  ```
  
  2. Open a terminal window and `cd` to your local respositories working directory, then run the following commands
  
  ```
  npm install
  grunt init
  ```
  
## Getting Started

If you have successfully completed installation, the Pattern Library should now be loaded on your system and ready to use. To get help with how to manage, build, and deploy patterns, please refer to Pattern Lab's [documentation][Pattern Lab]. 

## Developers

For developers using this Pattern Library, all changes should take place in the `source/` directory. In addition, Grunt has been preloaded with some helpful commands. You can find more information on each available command below:

- `grunt`

  Executing the default `grunt` command will initialize development mode. See `grunt dev` for more details.
  
- `grunt init`

  This command will initialize the Pattern Library on a fresh installation of this package. Executing this command will build the `public/` directory on your system by running `grunt build` as well as pull in standard dependencies and components that are needed in order to make Pattern Lab accessible via `localhost`.
  
- `grunt build`

  This command is intended to simulate a production build. Executing this command will build the `public/` directory of the Pattern Library, compiling all patterns, stylesheets, scripts, and more. In addition, any custom user interface will be applied. The `public/` directory is accessible via `localhost`.

- `grunt dev`

  This command will initiate development mode for the Pattern Library. This includes instantiating the `public/` directory, then broadcasting it to a local server available at `localhost:3000`, where any changes made to the Pattern Library should be reflected in real-time. Note, this live browser synchronization relies on a `watch` script, which is also executed and activated when the `grunt dev` command is invoked. The `watch` script will continue to run in the console window until exited with `CTRL+C` or closing the console window.
  
  > It's worth noting that, while the `watch` script will attempt to account for all changes that take place within the `source/` directory, newly created and/or deleted files are not synced automatically. If adding/deleting patterns, stylesheets, or anything else while running `grunt dev`, the `grunt dev` command will need to be canceled then restarted in order to account for any changes to the file structure.

- `grunt release`

  This command will run the `build` command and push a tagged release to GitHub. It will also deploy a copy to the live pattern library located at https://template.library.emory.edu/styleguide/patternlibrary/releases/[tag] while also generating a symlink to the latest release at https://template.library.emory.edu/styleguide/patternlibrary/current.

[Node.js]: nodejs.org
[npm]: npmjs.com
[Grunt]: gruntjs.com
[git]: git-scm.com
[Pattern Lab]: patternlab.io/docs
