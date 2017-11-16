'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var receiptendpointCtrlStub = {
  index: 'receiptendpointCtrl.index',
  show: 'receiptendpointCtrl.show',
  create: 'receiptendpointCtrl.create',
  update: 'receiptendpointCtrl.update',
  destroy: 'receiptendpointCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var receiptendpointIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './receiptendpoint.controller': receiptendpointCtrlStub
});

describe('Receiptendpoint API Router:', function() {

  it('should return an express router instance', function() {
    expect(receiptendpointIndex).to.equal(routerStub);
  });

  describe('GET /api/receiptendpoints', function() {

    it('should route to receiptendpoint.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'receiptendpointCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/receiptendpoints/:id', function() {

    it('should route to receiptendpoint.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'receiptendpointCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/receiptendpoints', function() {

    it('should route to receiptendpoint.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'receiptendpointCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/receiptendpoints/:id', function() {

    it('should route to receiptendpoint.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'receiptendpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/receiptendpoints/:id', function() {

    it('should route to receiptendpoint.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'receiptendpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/receiptendpoints/:id', function() {

    it('should route to receiptendpoint.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'receiptendpointCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
