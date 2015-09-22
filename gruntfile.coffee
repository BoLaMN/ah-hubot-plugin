grunt = require 'grunt'

process.env.ACTIONHERO_CONFIG = './actionhero/config'

module.exports = (grunt) ->

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.initConfig

    coffee:
      dist:
        options: 
          bare: true
        expand: true
        cwd: 'src'
        src: [ '*.coffee', '**/*.coffee' ]
        dest: './dist/'
        ext: '.js'

      dev:
        options: 
          bare: true
        expand: true
        cwd: 'src'
        src: [ '*.coffee', '**/*.coffee' ]
        dest: './actionhero/'
        ext: '.js'

    watch: 
      coffee: 
        files: ['src/*.coffee', 'src/**/*.coffee'], tasks: ['coffee']

  colors = 
    trace: 'magenta'
    input: 'grey'
    verbose: 'cyan'
    prompt: 'grey'
    debug: 'blue'
    info: 'green'
    data: 'grey'
    help: 'cyan'
    warn: 'yellow'
    error: 'red'

  grunt.registerTask 'dist', (env) ->
    grunt.task.run 'coffee:dist'

  grunt.registerTask 'actionhero', ->
    require('actionhero/grunt') grunt

    actionHero = (api, actionhero) ->

      api.log = (message, severity) ->
        if typeof severity is 'function'
          severity = 'info'

        severity ?= 'info'

        if severity is 'notice'
          severity = 'warn'

        args = [severity, message]
        args.push.apply args, Array::slice.call arguments, 2
        api.logger.log.apply api.logger, args

        grunt.log.writeln api.utils.sqlDateTime() + ' - ' + severity[colors[severity]] + ': ' + message

      actionhero.start (err, apiFromCallback) ->
        if err
          console.log err
        
        api = apiFromCallback

        return

    grunt.startActionhero actionHero

    return 

  grunt.registerTask 'dev', ['coffee:dev', 'actionhero', 'watch']