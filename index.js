module.exports = function(config) {
  if (!config) throw new Error('You must specify initilization configuration');

  return require('./lib/helpers').createBot(config);
};
