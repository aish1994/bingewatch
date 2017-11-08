'use strict';

describe('Component: LocationComponent', function () {

  // load the controller's module
  beforeEach(module('bwApp'));

  var LocationComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    LocationComponent = $componentController('location', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
