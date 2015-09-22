exports.action = {
  name: 'hubot',
  description: 'Posts a message to a hubot channel.',
  inputs: {
    channel: {
      required: true
    },
    msg: {
      required: true
    }
  },
  run: function(api, data, next) {
    var channel, msg, ref;
    ref = data.params, channel = ref.channel, msg = ref.msg;
    api.hubot.say(channel, msg, function(err) {
      if (err) {
        next(err);
      } else {
        next();
      }
    });
  }
};
