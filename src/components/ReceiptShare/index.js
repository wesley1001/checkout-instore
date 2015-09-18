import React from 'react';
import {Link} from 'react-router';

export default class ShareReceipt extends React.Component {
  render() {
    return (
      <form className="ReceiptShare component">
        <h2>Enviar comprovantes para</h2>
        <div className="form-group">
          <label htmlFor="email" className="hide">Email</label>
          <input type="email" className="form-control input-lg" id="email" placeholder="Email"/>
        </div>
        <button type="submit" className="btn btn-success btn-block btn-lg">Enviar</button>
        <br/>
        <Link className="btn btn-link" to="instore_authentication">Ignorar envio e iniciar novo pagamento</Link>
      </form>
    );
  }
}
