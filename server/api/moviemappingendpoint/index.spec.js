'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var moviemappingendpointCtrlStub = {
  index: 'moviemappingendpointCtrl.index',
  show: 'moviemappingendpointCtrl.show',
  create: 'moviemappingendpointCtrl.create',
  update: 'moviemappingendpointCtrl.update',
  destroy: 'moviemappingendpointCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var moviemappingendpointIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './moviemappingendpoint.controller': moviemappingendpointCtrlStub
});

describe('Moviemappingendpoint API Router:', function() {

  it('should return an express router instance', function() {
    expect(moviemappingendpointIndex).to.equal(routerStub);
  });

  describe('GET /api/moviemappingendpoints', function() {

    it('should route to moviemappingendpoint.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'moviemappingendpointCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/moviemappingendpoints/:id', function() {

    it('should route to moviemappingendpoint.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'moviemappingendpointCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/moviemappingendpoints', function() {

    it('should route to moviemappingendpoint.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'moviemappingendpointCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/moviemappingendpoints/:id', function() {

    it('should route to moviemappingendpoint.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'moviemappingendpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/moviemappingendpoints/:id', function() {

    it('should route to moviemappingendpoint.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'moviemappingendpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/moviemappingendpoints/:id', function() {

    it('should route to moviemappingendpoint.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'moviemappingendpointCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
