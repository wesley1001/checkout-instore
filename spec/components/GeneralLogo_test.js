import React from 'react/addons';
import GeneralLogo from 'components/GeneralLogo';

let TestUtils = React.addons.TestUtils;

describe('GeneralLogo', () => {
  let component,
      element;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(<GeneralLogo />);
    element = React.findDOMNode(component);
  });

  it('should render the element', () => {
    expect(element).toBeDefined;
  });

  it('should have an empty text', () => {
    expect(element.textContent).toBe('');
  });

  it('should not have an empty className', () => {
    expect(element.className).not.toBe('');
  });

  it('should have one nested elements', () => {
    expect(element.children.length).toBe(1);
  });
});
