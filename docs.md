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
