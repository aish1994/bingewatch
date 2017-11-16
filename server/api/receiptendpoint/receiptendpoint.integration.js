'use strict';

var app = require('../..');
import request from 'supertest';

var newReceiptendpoint;

describe('Receiptendpoint API:', function() {

  describe('GET /api/receiptendpoints', function() {
    var receiptendpoints;

    beforeEach(function(done) {
      request(app)
        .get('/api/receiptendpoints')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          receiptendpoints = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(receiptendpoints).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/receiptendpoints', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/receiptendpoints')
        .send({
          name: 'New Receiptendpoint',
          info: 'This is the brand new receiptendpoint!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newReceiptendpoint = res.body;
          done();
        });
    });

    it('should respond with the newly created receiptendpoint', function() {
      expect(newReceiptendpoint.name).to.equal('New Receiptendpoint');
      expect(newReceiptendpoint.info).to.equal('This is the brand new receiptendpoint!!!');
    });

  });

  describe('GET /api/receiptendpoints/:id', function() {
    var receiptendpoint;

    beforeEach(function(done) {
      request(app)
        .get('/api/receiptendpoints/' + newReceiptendpoint._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          receiptendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      receiptendpoint = {};
    });

    it('should respond with the requested receiptendpoint', function() {
      expect(receiptendpoint.name).to.equal('New Receiptendpoint');
      expect(receiptendpoint.info).to.equal('This is the brand new receiptendpoint!!!');
    });

  });

  describe('PUT /api/receiptendpoints/:id', function() {
    var updatedReceiptendpoint;

    beforeEach(function(done) {
      request(app)
        .put('/api/receiptendpoints/' + newReceiptendpoint._id)
        .send({
          name: 'Updated Receiptendpoint',
          info: 'This is the updated receiptendpoint!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedReceiptendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedReceiptendpoint = {};
    });

    it('should respond with the updated receiptendpoint', function() {
      expect(updatedReceiptendpoint.name).to.equal('Updated Receiptendpoint');
      expect(updatedReceiptendpoint.info).to.equal('This is the updated receiptendpoint!!!');
    });

  });

  describe('DELETE /api/receiptendpoints/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/receiptendpoints/' + newReceiptendpoint._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when receiptendpoint does not exist', function(done) {
      request(app)
        .delete('/api/receiptendpoints/' + newReceiptendpoint._id)
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
