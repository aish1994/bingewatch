'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var seatingendpointCtrlStub = {
  index: 'seatingendpointCtrl.index',
  show: 'seatingendpointCtrl.show',
  create: 'seatingendpointCtrl.create',
  update: 'seatingendpointCtrl.update',
  destroy: 'seatingendpointCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var seatingendpointIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './seatingendpoint.controller': seatingendpointCtrlStub
});

describe('Seatingendpoint API Router:', function() {

  it('should return an express router instance', function() {
    expect(seatingendpointIndex).to.equal(routerStub);
  });

  describe('GET /api/seatingendpoints', function() {

    it('should route to seatingendpoint.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'seatingendpointCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/seatingendpoints/:id', function() {

    it('should route to seatingendpoint.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'seatingendpointCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/seatingendpoints', function() {

    it('should route to seatingendpoint.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'seatingendpointCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/seatingendpoints/:id', function() {

    it('should route to seatingendpoint.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'seatingendpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/seatingendpoints/:id', function() {

    it('should route to seatingendpoint.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'seatingendpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/seatingendpoints/:id', function() {

    it('should route to seatingendpoint.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'seatingendpointCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
