/**
 *    @vtexIdAuthenticated
 *    class MyComponent extends React.Component {
 *
 *    }
 */

import React from 'react';
import { keys, assign } from 'lodash';
import VendorStore from 'stores/VendorStore';

function vtexIdAuthenticated(target) {
  return function decorator(Component) {
    class VtexIdAuthenticatedComponent extends React.Component {
      constructor(props) {
        super(props);

        this.state = {
          vendor: VendorStore.getState()
        }
      }

      componentWillMount() {
        if(!this.state.vendor.get('vtexIdLogged')) {
          this.props.history.pushState(null, '/vtex/auth');
        }
      }

      render() {
        return (
          <div className="vtexid-authenticated-component">
            <Component />
          </div>
        );
      }
    }

    return VtexIdAuthenticatedComponent;
  };
}

export default vtexIdAuthenticated;
