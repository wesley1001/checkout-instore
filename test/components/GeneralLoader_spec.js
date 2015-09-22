import React from 'react/addons';
import GeneralLoader from 'components/GeneralLoader';

let TestUtils = React.addons.TestUtils;

describe('GeneralLoader', () => {
  let component,
      element;

  describe('given empty loading status', () => {
    beforeEach(() => {
      component = TestUtils.renderIntoDocument(<GeneralLoader />);
      element = React.findDOMNode(component);
    });

    it('should render the element', () => {
      expect(element).toBeDefined;
    });

    it('should not have an empty className', () => {
      expect(element.className).not.toBe('');
    });

    it('should not have any nested elements', () => {
      expect(element.children.length).toBe(0);
    });
  });

  describe('given a negative loading status', () => {
    beforeEach(() => {
      component = TestUtils.renderIntoDocument(
        <GeneralLoader loading={false} />
      );
      element = React.findDOMNode(component);
    });

    it('should render the element', () => {
      expect(element).toBeDefined;
    });

    it('should not have an empty className', () => {
      expect(element.className).not.toBe('');
    });

    it('should have one nested elements', () => {
      expect(element.children.length).toBe(0);
    });
  });

  describe('given a positive loading status', () => {
    beforeEach(() => {
      component = TestUtils.renderIntoDocument(
        <GeneralLoader loading={true} />
      );
      element = React.findDOMNode(component);
    });

    it('should render the element', () => {
      expect(element).toBeDefined;
    });

    it('should not have an empty className', () => {
      expect(element.className).not.toBe('');
    });

    it('should have one nested elements', () => {
      expect(element.children.length).toBe(1);
    });
  });
});
