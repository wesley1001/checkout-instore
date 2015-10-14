import {expect} from 'chai';
import TestUtils from 'react-addons-test-utils';
import React from 'react';
import { findDOMNode } from 'react-dom';
import GeneralLogo from 'components/GeneralLogo';

describe('GeneralLogo', () => {
  let component,
      element;

  beforeEach(() => {
    component = TestUtils.renderIntoDocument(<GeneralLogo />);
    element = findDOMNode(component);
  });

  it('should render the element', () => {
    expect(element).toBeDefined;
  });

  it('should have an empty text', () => {
    expect(element.textContent).to.be.empty;
  });

  it('should not have an empty className', () => {
    expect(element.className).not.to.be.empty;
  });

  it('should have one nested elements', () => {
    expect(element.children.length).to.equal(1);
  });
});
