'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var WebappinatorGenerator = module.exports = function WebappinatorGenerator(args, options) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({
            skipInstall: options['skip-install']
        });
    });
};

util.inherits(WebappinatorGenerator, yeoman.generators.Base);

WebappinatorGenerator.prototype.welcome = function(){
    if (!this.options['skip-welcome-message']){
        this.log(yosay());
        this.log(chalk.yellow('Welcome to the Webappinator Web App Generator.\n'));
    }
}

WebappinatorGenerator.prototype.askForAppName = function askForAppName() {
    var done = this.async();

    this.prompt([{
        name: 'appName',
        message: 'What is the new app name?',
        default: 'MyApp'
    }], function(props){
        this.appName = props.appName;
        done();
    }.bind(this));
};

WebappinatorGenerator.prototype.askForModules = function askForModules() {
    var done = this.async();

    var prompts = [{
        type: 'checkbox',
        name: 'modules',
        message: 'Which modules shall I include?',
        choices: [
            {
                value: 'modAngularRoute',
                name: 'angular-route.js',
                checked: true
            }, {
                value: 'modAngularAnimate',
                name: 'angular-animate.js',
                checked: false
            }, {
                value: 'modAngularCookies',
                name: 'angular-cookies.js',
                checked: false
            }, {
                value: 'modAngularResource',
                name: 'angular-resource.js',
                checked: false
            }, {
                value: 'modAngularSanitize',
                name: 'angular-sanitize.js',
                checked: false
            }, {
                value: 'modJQuery',
                name: 'jQuery',
                checked: false
            }
        ]
    }];

    this.prompt(prompts, function(props){
        var hasModule = function(mod) { return props.modules.indexOf(mod) !== -1; };
        this.modAngularRoute = hasModule('modAngularRoute');
        this.modAngularAnimate = hasModule('modAngularAnimate');
        this.modAngularCookies = hasModule('modAngularCookies');
        this.modAngularResource = hasModule('modAngularResource');
        this.modAngularSanitize = hasModule('modAngularSanitize');
        this.modJQuery = hasModule('modJQuery');
        done();
    }.bind(this));
};

WebappinatorGenerator.prototype.createProjectFiles = function createProjectFiles() {
    this.template('dist/_index.html', 'dist/index.html', this);
    this.mkdir('dist/images');
    this.copy('dist/styles/_style.css', 'dist/styles/style.css');
    this.mkdir('dist/scripts/controllers');
    this.mkdir('dist/scripts/directives');
    this.mkdir('dist/scripts/services');
    this.copy('dist/scripts/_app.js', 'dist/scripts/app.js');
    this.copy('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json', this);
    this.copy('_gitignore', '.gitignore');
    this.copy('_gitattributes', '.gitattributes');
};
