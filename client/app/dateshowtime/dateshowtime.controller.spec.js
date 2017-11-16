'use strict';

describe('Component: DateshowtimeComponent', function () {

  // load the controller's module
  beforeEach(module('bwApp'));

  var DateshowtimeComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    DateshowtimeComponent = $componentController('dateshowtime', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
