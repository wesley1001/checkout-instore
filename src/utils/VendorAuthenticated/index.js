/**
 *    @vendorAuthenticated
 *    class MyComponent extends React.Component {
 *
 *    }
 */

import React from 'react';
import { keys, assign } from 'lodash';
import VendorStore from 'stores/VendorStore';

function vendorAuthenticated(target) {
  return function decorator(Component) {
    class VendorAuthenticatedComponent extends React.Component {
      constructor(props) {
        super(props);

        this.state = {
          vendor: VendorStore.getState()
        }
      }

      componentWillMount() {
        if(this.state.vendor.get('vtexIdLogged') && this.state.vendor.get('vendorId') === undefined) {
          this.props.history.pushState(null, '/vendorLogin');
        }
      }

      render() {
        return (
          <div className="authenticated-component">
            <Component />
          </div>
        );
      }
    }

    return VendorAuthenticatedComponent;
  };
}

export default vendorAuthenticated;
