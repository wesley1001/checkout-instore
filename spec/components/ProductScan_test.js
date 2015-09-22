import React from 'react/addons';
import ProductScan from 'components/ProductScan';

let TestUtils = React.addons.TestUtils;

describe('ProductScan', () => {
  let component,
      element;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(<ProductScan />);
    element = React.findDOMNode(component);
  });

  it('should render the element', () => {
    expect(element).toBeDefined;
  });

  it('should not have an empty text', () => {
    expect(element.textContent).not.toBe('');
  });

  it('should not have an empty className', () => {
    expect(element.className).not.toBe('');
  });

  it('should have two nested elements', () => {
    expect(element.children.length).toBe(2);
  });
});
