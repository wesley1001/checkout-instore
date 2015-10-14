import {expect} from 'chai';
import TestUtils from 'react-addons-test-utils';
import React from 'react';
import { findDOMNode } from 'react-dom';
import GeneralFooter from 'components/GeneralFooter';

describe('GeneralFooter', () => {
  let component,
      element;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(<GeneralFooter />);
    element = findDOMNode(component);
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
