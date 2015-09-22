require 'coffee-script/register'
{ Robot } = require 'hubot'

module.exports =
  loadPriority: 900
  startPriority: 900
  stopPriority: 900

  initialize: (api, next) ->

    class ActionHeroHubot extends Robot
      constructor: (api) ->
        @config = api.config.hubot

        super @config.adapterPath, @config.adapterName, false, @config.name, @config.alias

        log = (msg, severity) -> 
          api.log 'hubot: ' + msg.toLowerCase(), severity
          return 

        @logger = {}

        levels = [ 'warning', 'error', 'debug', 'info' ]

        for level in levels
          @logger[level] = (msg) ->
            log msg, level
            return

        @channels = []

        @adapter.on 'connected', =>
          for userId, user of @brain.users()
            if user.name is api.hubot.name 
              api.log 'hubot: storing ' + @config.adapterName + ' bots user id ' + user.id
              api.hubot.id = user.id

          for channelId, channel of @adapter.client.channels
            @channels.push channel.name

          api.log 'hubot: found channels ' + @channels.join ', '

          return 

      say: (channel, msg, callback) -> 
        if channel in @channels 
          @send room: channel, msg 
          callback()
        else callback channel + 'was not found in the channels'

        return 

    api.hubot = new ActionHeroHubot api

    next()

    return 

  start: (api, next) ->
    api.hubot.run()
    next()
    return 

  stop: (api, next) ->
    api.hubot.shutdown()
    next()
    return
