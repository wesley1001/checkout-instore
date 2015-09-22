import React from 'react/addons';
import UserInfo from 'components/UserInfo';

let TestUtils = React.addons.TestUtils;

describe('UserInfo', () => {
  let component,
      element,
      email;

  describe('given an undefined email', () => {
    beforeEach(() => {
      component = TestUtils.renderIntoDocument(<UserInfo />);
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

  describe('given an empty email', () => {
    beforeEach(() => {
      component = TestUtils.renderIntoDocument(<UserInfo email={''}/>);
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

  describe('given a user email', () => {
    beforeEach(() => {
      email = 'test@react.com';
      component = TestUtils.renderIntoDocument(
        <UserInfo email={email} />
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
      expect(element.textContent).toBe(`Email do cliente: ${email}. Está incorreto?`);
    });

    it('should have one nested elements', () => {
      expect(element.children.length).toBe(1);
    });
  });
});
