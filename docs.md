# text to explain the different tech one can use

1. Editor config
    * by including the file .editorconfig we can specify how we want our
        editor to behave
    * go to editorconfig.org
    * require a plugin on vscode

2. js package management
    * bower was the popular manager
    * npm the most popular now (recommended)
    * jspm

3. how to check node modules for security purpose
    * retire.js
    * node security platform: npm now have security check so no need to check it manually

4. web servers
      * node.js: http-server (ultra simple)
      * live server
      * express: comprehensive, highly configurable, production grade, can run it everywhere
        * koa
        * hapi
        are alternatives to express
      * budo
      * webpack
      * browsersync: dedicated ip, great for device testing

5. set up our server
    * lets use express
    * make a directory buildScripts
    * inside we create a file that we will run wiht node to launch our server

6. sharing work in progress
    * localtunnel: easily share your work on your local machine
        * to install it: npm i localtunnel -g
        * start your app
        * it --port 3000
    * ngrok: require some additional work
        * go in the directory with the ngrok binary
        * ./ngrok http 80 (you can use whatever port number your site is running at)
    * now: quickly deploy app to the cloud
        * npm i now -g
        * create start script
        * now
    * surge: only support static files
        * npm i surge -g
        * surge

7. tools for automation
   * Grunt: orginal , large plugin ecosystem
   * Gulp: in-memory streams, don't write to disk so is more fast than grunt
   * npm scripts: declared in package.json (recommended), leverage you os command line (recommended)
       * we are going to use "scripts" in our package.json
       * npm start = npm run start (npm doesn't require to use run for start and test)
       * if i use the prefix pre it will run before the script with the name after pre
           * "prestart" will run before "start" by convention
           * it also uses post to run after
       * npm concurrent tasks:
           * "start": "npm-run-all --parallel firsttask secondtask",
           * "firsttask": ...
           * "secondtask": ...

8. Transpiling
   * babel: modern, standard-based js, use modern js and transpile it to es5, latest -> es5
       * babel config: .babelrc (recommended) or package.json
           * .babelrc in the root of the project
           * package.json in "babel"
           * to transpile latest js to es5 we have to use babel-node instead of node
   * typescript
   * elm

9. Bundling
   * use es6 modules
       * select a bundler
           * require js
           * browserify original, bundle npm packages for the web
           * webpack can handle much more than just js, built-in hot reload
           * rollup tree shaking, reduce the weight of the bundle, quite new
           * jspm system js used, universal module loader
   * configure webpack
       * webpack.config.js at the root
       * dev mode: webpack.config.dev.js
       * we then configure express to serve our bundle
       * we go in srcServer.js, import webpack and our webpack config file
       * to add a file to our bundle we need to add a line importing the file
       * in index.js the entry point of our bundler.js
       * the code will be transpiled in es5

10. how to debug the transpiled code: sourcemaps
    * make use see the source code of in es6 in the console
    * there are multiple kind of sourcemaps: in this demo we use inline-source-map
    * we write the word "debugger" where we want our breakpoint to be

11. Linting
    * use for consistency, avoiding mistakes
    * linters:
        * jslint
        * jshint
        * eslint (recommended)
    * configuring eslint:
        * config format: eslintrc or package.json
    * choosing between warnings and errors: warnings don't break the build but errors do
    * which plugins ? to enhance eslint (for react, angular, etc)
    * eslint standard rules to not start from scratch
    * eslint doesn't watch files on save: use eslint-watch
    * eslint doesn't support experimental features: use babel-eslint
    * why eslint in build process:
        * one place to check
        * protects the integration to not accept linting error
    * in package.json we're going to add "lint" script
    * eslint-watch so we have to specify it in package.json
    * lint:watch make the eslint run send info to eslint-watch

12. Testing
    * unit testing: testing one thing
        * frameworks:
          * mocha (recommended)
          * jasmine
          * tape
          * qunit
          * ava
          * jest (for react)
    * integration testing
    * ui testing
    * jest come with assertion built in, mocha on the other hand doesnt have it
        * assert(2+2).equal(4)
        * on mocha we'll use chai for assertions
    * helper library
        * simulate the dom
        * run dom-related test without browser
    * where to run our test
        * headless browser: without user interface
            * phantomjs (ok)
        * browser
            * karma, testem
        * in memory dom:
            * jsdom (ok)
    * where to put the tests
        * under the file to test
    * running tests each time you hit save
    * unit test vs integration test
        * test a small unit vs test multiples units
        * often single function vs involves opening the browser, clicking on ui, etc.
        * fast vs slow
        * run on save vs run on demand
    * we setup our tests with testSetup in buildScripts
    * we add the script in package.json
    * and we add file.test.js or .spec.js to the files in src

13. Continuous integration
    * not breaking the build process
    * catches mistakes quickly
    * ci server:
        * run automated builds
        * runs tests
        * automate deployment
    * ci servers:
        * travis ci: hosted, runs on linux
        * jenkins: hosted by ourselves
        * appveyor: windows
    * travis-ci:
        * sign in with your github account
        * choose the repository to use
        * add .travis.yml in your root
    * appveyor is the same as travis-ci
        * we add appveyor.yml in the root

14. HTTP calls
    * node: http request
    * browser: xmlhttprequest, jquery, framework based, fetch
    * node and browser: isomorphic-fetch, xhr, superagent, axios
    * why centralize api calls:
        * configure all calls
        * handle preloader logic
        * handle errors
    * setup fetch
        * we go in the buildScripts directory and use get

15. mocking http
    * unit testing
    * instant response
    * rapid prototype
    * work offline
    * Nock
    * static json: can't change data
    * create dev webserver
        * api-mock
        * json server: can change data
        * json schema faker

    * mock api makes working with fake data easy

    * Our plan for mocking api
        1. Declare our schema:
              * json schema faker (json-schema.org) use the repl online to learn how
              * the generated data looks like
        2. Generate random data:
              * faker.js
              * chance.js
              * randexp.js
        3. Serve data via api
              * json server
    * Demo
        * we create a mock data schema where we define the kind of data we want
        * we then make it that generate the data from generateMockData that will
        * go in src/api/db.json
        * we then write a script in package.json to start our mock api server
        * we need to generate new data each time we start our app so we can test edge cases
        * we need to tell our app to ask the mock api for data
        * we create the baseUrl.js in the src/api directory so that the app knows
          * if we are in development or prod
        * we create baseUrl to define whether we are in dev mode or prod and we change
          * userApi to take that into account
        * we can even manipulate data: deleting and adding records
        * we change userApi to add functionality for deleting
        * we go in index.js for ui change
        * Summary
            * node: http, request
            * browser: xhr, fetch, jquery
            * node and browser: isomorphic fetch, xhr, superAgent, axios
            * mocking http calls:
                * nock, hard coded json
                * custom webserver: json-server, json schema faker, express, browserSync

16. Project structure
    * why a demo app?
        * some people learn by example
        * framework usage
        * testing
        * mock api
        * automated deployment
        * coding standards
        * interactive example that shows how everything work
    * project structure tips
        * js belongs in a .js file
        * pull data from database and use it in your js
        * don't generate js code, generate json used by js
        * organize by feature instead of type (mvc)
        * extract logic in plain old javascript (pojos)
            * no framework specific logic
            * if you can use js for logic for you can change the framework you use
            * down the line
            * pure js logic easy to test functions avoid putting logic in framework specific files

17. Production build
    * Minification
        * shortens variable and functions names
        * removes comments
        * remove whitespaces and new lines
        * dead code elimination/tree-shaking
        * debug via sourcemaps
    * lets make a copy of webpack.config.dev.js
        * lets change devtool to source-map
        * we change the output path to dist(distribution)
        * we are going to add plugins
            * uglifyjs
            * dedubplugin
    * we then create build.js in buildScripts directory
    * lets create distServer that show us locally the app that we gonna have in prod
        * we copy what is in srcServer and change a few things
        * remove webpack
        * add support to express for support of static files
        * we add compression (jsup??)

    * we then change baseUrl in src/api
    * after that we can start the app
    * if we want to see the mockapi in use we add `?useMockApi=true` to the url
