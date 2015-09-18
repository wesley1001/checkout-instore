/**
 *    @checkConnection
 *    class MyComponent extends React.Component {
 *
 *    }
 */

require('offline-js/js/offline');
require('offline-js/js/ui');
require('offline-js/js/reconnect');
import './offline-dark.css';
import './offline-pt-br.css';
import './offline-pt-br-indicator.css';

function checkConnection(target) {
  target.annotated = true;
}

export default checkConnection;
