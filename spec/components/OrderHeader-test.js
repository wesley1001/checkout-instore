import React from 'react/addons';
import OrderHeader from 'components/OrderHeader';

var TestUtils = React.addons.TestUtils;

describe('OrderHeader', () => {
  var component;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(<OrderHeader />);
  });

  it('should display the component', () => {
    expect(component).toBeDefined;
  });
});
