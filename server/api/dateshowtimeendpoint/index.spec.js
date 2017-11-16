'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var dateshowtimeendpointCtrlStub = {
  index: 'dateshowtimeendpointCtrl.index',
  show: 'dateshowtimeendpointCtrl.show',
  create: 'dateshowtimeendpointCtrl.create',
  update: 'dateshowtimeendpointCtrl.update',
  destroy: 'dateshowtimeendpointCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var dateshowtimeendpointIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './dateshowtimeendpoint.controller': dateshowtimeendpointCtrlStub
});

describe('Dateshowtimeendpoint API Router:', function() {

  it('should return an express router instance', function() {
    expect(dateshowtimeendpointIndex).to.equal(routerStub);
  });

  describe('GET /api/dateshowtimeendpoints', function() {

    it('should route to dateshowtimeendpoint.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'dateshowtimeendpointCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/dateshowtimeendpoints/:id', function() {

    it('should route to dateshowtimeendpoint.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'dateshowtimeendpointCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/dateshowtimeendpoints', function() {

    it('should route to dateshowtimeendpoint.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'dateshowtimeendpointCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/dateshowtimeendpoints/:id', function() {

    it('should route to dateshowtimeendpoint.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'dateshowtimeendpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/dateshowtimeendpoints/:id', function() {

    it('should route to dateshowtimeendpoint.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'dateshowtimeendpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/dateshowtimeendpoints/:id', function() {

    it('should route to dateshowtimeendpoint.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'dateshowtimeendpointCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
