import {expect} from 'chai';
import React from 'react/addons';
import GeneralFooter from 'components/GeneralFooter';

let TestUtils = React.addons.TestUtils;

describe('GeneralFooter', () => {
  let component,
      element;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(<GeneralFooter />);
    element = React.findDOMNode(component);
  });

  it('should render the element', () => {
    expect(element).toBeDefined;
  });

  it('should have an empty text', () => {
    expect(element.textContent).to.be.empty;
  });

  it('should not have an empty className', () => {
    expect(element.className).not.be.empty;
  });

  it('should not have any nested elements', () => {
    expect(element.children.length).to.equal(0);
  });
});
