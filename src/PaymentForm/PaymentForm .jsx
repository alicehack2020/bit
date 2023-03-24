import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css';
import { cardActionssend } from '_store';
import "./index.css"
import { useSelector, useDispatch } from 'react-redux';

 
const PaymentForm = () => {
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const dispatch = useDispatch();
  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    
    setState((prev) => ({ ...prev, [name]: value }));
  }

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  }

  const sendData = () => {
    return dispatch(cardActionssend.postCard(state));   
  }
  return (
    <div id='PaymentForm'>
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
      <form className='form' onSubmit={sendData}> 
        <input
          type="number"
          name="number"
          placeholder="Card Number"
          value={state.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="text"
          name="name"
          placeholder="card Holder name"
          value={state.name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="tel"
          name="expiry"
          placeholder="expiry date eg.11/11"
          pattern="\d\d/\d\d"
          value={state.expiry}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="tel"
          name="cvc"
          placeholder="CVC"
          value={state.cvc}
          pattern="\d{3,4}"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
         <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default PaymentForm;