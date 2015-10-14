import {expect} from 'chai';
import React from 'react/addons';
import { findDOMNode } from 'react-dom';
import OrderHeader from 'components/OrderHeader';

let TestUtils = React.addons.TestUtils;

describe('OrderHeader', () => {
  let component,
      element;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(<OrderHeader />);
    element = findDOMNode(component);
  });

  it('should render the element', () => {
    expect(element).toBeDefined;
  });

  it('should not have an empty text', () => {
    expect(element.textContent).not.to.be.empty;
  });

  it('should not have an empty className', () => {
    expect(element.className).not.to.be.empty;
  });

  it('should have two nested elements', () => {
    expect(element.children.length).to.equal(2);
  });
});
