import React from 'react';
import './OrderTable.scss';
import { useTranslation } from 'react-i18next';

function OrderTable(props) {
  const [_] = useTranslation();
  return (
    <table className="OrderTable">
      <tbody>
      <tr>
        <th>{_('Name')}:</th>
        <td><h2>{props.name}</h2></td>
      </tr>
      <tr>
        <th>{_('Address')}:</th>
        <td>{props.street}<br/>{props.zipcity}</td>
      </tr>
      <tr>
        <th>{_('Products')}:</th>
        <td>
          {props.products.map(e =>
            <div className="OrderTable-product" key={e.name}>
              {e.quantity} x {e.name}
              <span className="OrderTable-price">{e.price.toFixed(2)}€</span>
            </div>)}
        </td>
      </tr>
      <tr>
        <th><h2>{_('Total')}</h2></th>
        <td className="OrderTable-total">
          <h2>{props.products.reduce((prev, current) => prev.price + current.price).toFixed(2)}€</h2>
          <p>{_('incl. 19% VAT')}</p>
        </td>
      </tr>
      </tbody>
    </table>
  );
}

export default OrderTable;
