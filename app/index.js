'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var WebappinatorGenerator = module.exports = function WebappinatorGenerator(args, options) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function installDependencies() {
        this.installDependencies({
            skipInstall: options['skip-install']
        });
    });
};

util.inherits(WebappinatorGenerator, yeoman.generators.Base);

WebappinatorGenerator.prototype.welcome = function(){
    if (!this.options['skip-welcome-message']){
        console.log('Welcome to the Webappinator Angular Generator.\n');
        console.log(this.yeoman);
    }
}

WebappinatorGenerator.prototype.promptForConfiguration = function promptForConfiguration() {
    var done = this.async();

    var prompts = [
        {
            name: 'appName',
            message: 'What name should I use for this new app?',
            default: 'New Project'
        },
        {
            type: 'confirm',
            name: 'modAngularRoute',
            message: 'Install the angular-route module?',
            default: true
        },
        {
            type: 'confirm',
            name: 'modJQuery',
            message: 'Install jQuery?',
            default: false
        }
    ];

    this.prompt(prompts, function processAnswers(answers) {
        this.appName = answers.appName;
        this.modAngularRoute = answers.modAngularRoute;
        this.modJQuery = answers.modJQuery;
        done();
    }.bind(this));
};

WebappinatorGenerator.prototype.createProjectFiles = function createProjectFiles() {
    this.template('src/_index.html', 'src/index.html', this);
    this.copy('src/css/_style.css', 'src/css/style.css');
    this.copy('src/js/_app.js', 'src/js/app.js');
    this.copy('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json', this);
    this.copy('_gitignore', '.gitignore');
    this.copy('_gitattributes', '.gitattributes');
};








