'use strict';

describe('Component: SeatingComponent', function () {

  // load the controller's module
  beforeEach(module('bwApp'));

  var SeatingComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    SeatingComponent = $componentController('seating', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
