'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var locationendpointCtrlStub = {
  index: 'locationendpointCtrl.index',
  show: 'locationendpointCtrl.show',
  create: 'locationendpointCtrl.create',
  update: 'locationendpointCtrl.update',
  destroy: 'locationendpointCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var locationendpointIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './locationendpoint.controller': locationendpointCtrlStub
});

describe('Locationendpoint API Router:', function() {

  it('should return an express router instance', function() {
    expect(locationendpointIndex).to.equal(routerStub);
  });

  describe('GET /api/locationendpoints', function() {

    it('should route to locationendpoint.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'locationendpointCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/locationendpoints/:id', function() {

    it('should route to locationendpoint.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'locationendpointCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/locationendpoints', function() {

    it('should route to locationendpoint.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'locationendpointCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/locationendpoints/:id', function() {

    it('should route to locationendpoint.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'locationendpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/locationendpoints/:id', function() {

    it('should route to locationendpoint.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'locationendpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/locationendpoints/:id', function() {

    it('should route to locationendpoint.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'locationendpointCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
