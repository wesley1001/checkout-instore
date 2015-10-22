import {expect} from 'chai';
import TestUtils from 'react-addons-test-utils';
import React from 'react';
import { findDOMNode } from 'react-dom';
import UserInfo from 'components/UserInfo';

describe('UserInfo', () => {
  let component,
      element,
      email;

  describe('given an undefined email', () => {
    beforeEach(() => {
      component = TestUtils.renderIntoDocument(<UserInfo />);
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

    it('should not have any nested elements', () => {
      expect(element.children.length).to.equal(0);
    });
  });

  describe('given an empty email', () => {
    beforeEach(() => {
      component = TestUtils.renderIntoDocument(<UserInfo email={''}/>);
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

    it('should not have any nested elements', () => {
      expect(element.children.length).to.equal(0);
    });
  });

  describe('given a user email', () => {
    beforeEach(() => {
      email = 'test@react.com';
      component = TestUtils.renderIntoDocument(
        <UserInfo email={email} />
      );
      element = findDOMNode(component);
    });

    it('should render the element', () => {
      expect(element).toBeDefined;
    });

    it('should not have an empty className', () => {
      expect(element.className).not.to.be.empty;
    });

    it('should display the error message', () => {
      expect(element.textContent).to.equal(`Email do cliente: ${email}. Está incorreto?`);
    });

    it('should have one nested elements', () => {
      expect(element.children.length).to.equal(1);
    });
  });
});
