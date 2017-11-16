'use strict';

var app = require('../..');
import request from 'supertest';

var newDateshowtimeendpoint;

describe('Dateshowtimeendpoint API:', function() {

  describe('GET /api/dateshowtimeendpoints', function() {
    var dateshowtimeendpoints;

    beforeEach(function(done) {
      request(app)
        .get('/api/dateshowtimeendpoints')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          dateshowtimeendpoints = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(dateshowtimeendpoints).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/dateshowtimeendpoints', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/dateshowtimeendpoints')
        .send({
          name: 'New Dateshowtimeendpoint',
          info: 'This is the brand new dateshowtimeendpoint!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newDateshowtimeendpoint = res.body;
          done();
        });
    });

    it('should respond with the newly created dateshowtimeendpoint', function() {
      expect(newDateshowtimeendpoint.name).to.equal('New Dateshowtimeendpoint');
      expect(newDateshowtimeendpoint.info).to.equal('This is the brand new dateshowtimeendpoint!!!');
    });

  });

  describe('GET /api/dateshowtimeendpoints/:id', function() {
    var dateshowtimeendpoint;

    beforeEach(function(done) {
      request(app)
        .get('/api/dateshowtimeendpoints/' + newDateshowtimeendpoint._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          dateshowtimeendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      dateshowtimeendpoint = {};
    });

    it('should respond with the requested dateshowtimeendpoint', function() {
      expect(dateshowtimeendpoint.name).to.equal('New Dateshowtimeendpoint');
      expect(dateshowtimeendpoint.info).to.equal('This is the brand new dateshowtimeendpoint!!!');
    });

  });

  describe('PUT /api/dateshowtimeendpoints/:id', function() {
    var updatedDateshowtimeendpoint;

    beforeEach(function(done) {
      request(app)
        .put('/api/dateshowtimeendpoints/' + newDateshowtimeendpoint._id)
        .send({
          name: 'Updated Dateshowtimeendpoint',
          info: 'This is the updated dateshowtimeendpoint!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedDateshowtimeendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDateshowtimeendpoint = {};
    });

    it('should respond with the updated dateshowtimeendpoint', function() {
      expect(updatedDateshowtimeendpoint.name).to.equal('Updated Dateshowtimeendpoint');
      expect(updatedDateshowtimeendpoint.info).to.equal('This is the updated dateshowtimeendpoint!!!');
    });

  });

  describe('DELETE /api/dateshowtimeendpoints/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/dateshowtimeendpoints/' + newDateshowtimeendpoint._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when dateshowtimeendpoint does not exist', function(done) {
      request(app)
        .delete('/api/dateshowtimeendpoints/' + newDateshowtimeendpoint._id)
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
