exports.action =
  name: 'hubot'
  description: 'Posts a message to a hubot channel.'

  inputs: 
    channel: required: true
    msg: required: true 

  run: (api, data, next) ->
    { channel, msg } = data.params

    api.hubot.say channel, msg, (err) ->
      if err 
        next err 
      else 
        next()
 
      return
    return