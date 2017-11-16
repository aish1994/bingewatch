'use strict';

var app = require('../..');
import request from 'supertest';

var newSeatingendpoint;

describe('Seatingendpoint API:', function() {

  describe('GET /api/seatingendpoints', function() {
    var seatingendpoints;

    beforeEach(function(done) {
      request(app)
        .get('/api/seatingendpoints')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          seatingendpoints = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(seatingendpoints).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/seatingendpoints', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/seatingendpoints')
        .send({
          name: 'New Seatingendpoint',
          info: 'This is the brand new seatingendpoint!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newSeatingendpoint = res.body;
          done();
        });
    });

    it('should respond with the newly created seatingendpoint', function() {
      expect(newSeatingendpoint.name).to.equal('New Seatingendpoint');
      expect(newSeatingendpoint.info).to.equal('This is the brand new seatingendpoint!!!');
    });

  });

  describe('GET /api/seatingendpoints/:id', function() {
    var seatingendpoint;

    beforeEach(function(done) {
      request(app)
        .get('/api/seatingendpoints/' + newSeatingendpoint._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          seatingendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      seatingendpoint = {};
    });

    it('should respond with the requested seatingendpoint', function() {
      expect(seatingendpoint.name).to.equal('New Seatingendpoint');
      expect(seatingendpoint.info).to.equal('This is the brand new seatingendpoint!!!');
    });

  });

  describe('PUT /api/seatingendpoints/:id', function() {
    var updatedSeatingendpoint;

    beforeEach(function(done) {
      request(app)
        .put('/api/seatingendpoints/' + newSeatingendpoint._id)
        .send({
          name: 'Updated Seatingendpoint',
          info: 'This is the updated seatingendpoint!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSeatingendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSeatingendpoint = {};
    });

    it('should respond with the updated seatingendpoint', function() {
      expect(updatedSeatingendpoint.name).to.equal('Updated Seatingendpoint');
      expect(updatedSeatingendpoint.info).to.equal('This is the updated seatingendpoint!!!');
    });

  });

  describe('DELETE /api/seatingendpoints/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/seatingendpoints/' + newSeatingendpoint._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when seatingendpoint does not exist', function(done) {
      request(app)
        .delete('/api/seatingendpoints/' + newSeatingendpoint._id)
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
