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
      expect(element.textContent).toBe('');
    });

    it('should not have an empty className', () => {
      expect(element.className).not.toBe('');
    });

    it('should not have any nested elements', () => {
      expect(element.children.length).toBe(0);
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
      expect(element.className).not.toBe('');
    });

    it('should display the error message', () => {
      expect(element.textContent).toBe('error');
    });

    it('should have one nested elements', () => {
      expect(element.children.length).toBe(1);
    });
  });
});
