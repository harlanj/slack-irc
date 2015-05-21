/* jshint expr: true */
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var createBots = require('../lib/helpers').createBots;
var Bot = require('../lib/bot');
var ConfigurationError = require('../lib/errors').ConfigurationError;

chai.should();
chai.use(sinonChai);

describe('Create Bots', function() {

  var config;

  before(function() {
    this.connectStub = sinon.stub();
    Bot.prototype.connect = this.connectStub;
    config = require(process.cwd() + '/test/fixtures/test-config.json');
  });

  afterEach(function() {
    config = null;
    this.connectStub.reset();
  });

  it('should work when given an array of configs', function() {
    config = require(process.cwd() + '/test/fixtures/test-config.json');
    var bots = createBots(config);
    bots.length.should.equal(2);
    this.connectStub.should.have.been.called;
  });

  it('should work when given an object as a config file', function() {
    config = require(process.cwd() + '/test/fixtures/single-test-config.json');
    var bots = createBots(config);
    bots.length.should.equal(1);
    this.connectStub.should.have.been.called;
  });

  it('should throw a configuration error if any fields are missing', function() {
    config = require(process.cwd() + '/test/fixtures/bad-config.json');
    function wrap() {
      createBots(config);
    }

    (wrap).should.throw(ConfigurationError, 'Missing configuration field nickname');
  });

  it('should throw if a configuration file is neither an object or an array', function() {
    config = require(process.cwd() + '/test/fixtures/string-config.json');

    function wrap() {
      createBots(config);
    }

    (wrap).should.throw(ConfigurationError);
  });
});
