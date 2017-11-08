'use strict';

var app = require('../..');
import request from 'supertest';

var newLocationendpoint;

describe('Locationendpoint API:', function() {

  describe('GET /api/locationendpoints', function() {
    var locationendpoints;

    beforeEach(function(done) {
      request(app)
        .get('/api/locationendpoints')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          locationendpoints = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(locationendpoints).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/locationendpoints', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/locationendpoints')
        .send({
          name: 'New Locationendpoint',
          info: 'This is the brand new locationendpoint!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newLocationendpoint = res.body;
          done();
        });
    });

    it('should respond with the newly created locationendpoint', function() {
      expect(newLocationendpoint.name).to.equal('New Locationendpoint');
      expect(newLocationendpoint.info).to.equal('This is the brand new locationendpoint!!!');
    });

  });

  describe('GET /api/locationendpoints/:id', function() {
    var locationendpoint;

    beforeEach(function(done) {
      request(app)
        .get('/api/locationendpoints/' + newLocationendpoint._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          locationendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      locationendpoint = {};
    });

    it('should respond with the requested locationendpoint', function() {
      expect(locationendpoint.name).to.equal('New Locationendpoint');
      expect(locationendpoint.info).to.equal('This is the brand new locationendpoint!!!');
    });

  });

  describe('PUT /api/locationendpoints/:id', function() {
    var updatedLocationendpoint;

    beforeEach(function(done) {
      request(app)
        .put('/api/locationendpoints/' + newLocationendpoint._id)
        .send({
          name: 'Updated Locationendpoint',
          info: 'This is the updated locationendpoint!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedLocationendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedLocationendpoint = {};
    });

    it('should respond with the updated locationendpoint', function() {
      expect(updatedLocationendpoint.name).to.equal('Updated Locationendpoint');
      expect(updatedLocationendpoint.info).to.equal('This is the updated locationendpoint!!!');
    });

  });

  describe('DELETE /api/locationendpoints/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/locationendpoints/' + newLocationendpoint._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when locationendpoint does not exist', function(done) {
      request(app)
        .delete('/api/locationendpoints/' + newLocationendpoint._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
