exports["default"] = {
  hubot: function(api) {

    /* 
      sets the enviroment variable for the slack token
     */
    process.env.HUBOT_SLACK_TOKEN = '';
    return {
      name: 'bot',
      alias: '@bot',

      /*
        choose a hubot adapter eg for slack 
        adapterName: 'slack'
       */
      adapterName: 'slack',
      adapterPath: ''
    };
  }
};
