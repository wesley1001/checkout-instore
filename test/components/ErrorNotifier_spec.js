import {expect} from 'chai';
import React from 'react/addons';
import ErrorNotifier from 'components/ErrorNotifier';

let TestUtils = React.addons.TestUtils;

describe('ErrorNotifier', () => {
  let component,
      element;

  describe('given empty message', () => {
    beforeEach(() => {
      component = TestUtils.renderIntoDocument(<ErrorNotifier />);
      element = React.findDOMNode(component);
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

    it('should not have any nested elements', () => {
      expect(element.children.length).to.equal(0);
    });
  });

  describe('given a error message', () => {
    beforeEach(() => {
      component = TestUtils.renderIntoDocument(
        <ErrorNotifier message={'error'} />
      );
      element = React.findDOMNode(component);
    });

    it('should render the element', () => {
      expect(element).toBeDefined;
    });

    it('should not have an empty className', () => {
      expect(element.className).not.to.be.empty;
    });

    it('should display the error message', () => {
      expect(element.textContent).to.equal('error');
    });

    it('should have one nested elements', () => {
      expect(element.children.length).to.equal(1);
    });
  });
});
