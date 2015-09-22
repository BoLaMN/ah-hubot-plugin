var Robot,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

require('coffee-script/register');

Robot = require('hubot').Robot;

module.exports = {
  loadPriority: 900,
  startPriority: 900,
  stopPriority: 900,
  initialize: function(api, next) {
    var ActionHeroHubot;
    ActionHeroHubot = (function(superClass) {
      extend(ActionHeroHubot, superClass);

      function ActionHeroHubot(api) {
        var i, len, level, levels, log;
        this.config = api.config.hubot;
        ActionHeroHubot.__super__.constructor.call(this, this.config.adapterPath, this.config.adapterName, false, this.config.name, this.config.alias);
        log = function(msg, severity) {
          api.log('hubot: ' + msg.toLowerCase(), severity);
        };
        this.logger = {};
        levels = ['warning', 'error', 'debug', 'info'];
        for (i = 0, len = levels.length; i < len; i++) {
          level = levels[i];
          this.logger[level] = function(msg) {
            log(msg, level);
          };
        }
        this.channels = [];
        this.adapter.on('connected', (function(_this) {
          return function() {
            var channel, channelId, ref, ref1, user, userId;
            ref = _this.brain.users();
            for (userId in ref) {
              user = ref[userId];
              if (user.name === api.hubot.name) {
                api.log('hubot: storing ' + _this.config.adapterName + ' bots user id ' + user.id);
                api.hubot.id = user.id;
              }
            }
            ref1 = _this.adapter.client.channels;
            for (channelId in ref1) {
              channel = ref1[channelId];
              _this.channels.push(channel.name);
            }
            api.log('hubot: found channels ' + _this.channels.join(', '));
          };
        })(this));
      }

      ActionHeroHubot.prototype.say = function(channel, msg, callback) {
        if (indexOf.call(this.channels, channel) >= 0) {
          this.send({
            room: channel
          }, msg);
          callback();
        } else {
          callback(channel + 'was not found in the channels');
        }
      };

      return ActionHeroHubot;

    })(Robot);
    api.hubot = new ActionHeroHubot(api);
    next();
  },
  start: function(api, next) {
    api.hubot.run();
    next();
  },
  stop: function(api, next) {
    api.hubot.shutdown();
    next();
  }
};
