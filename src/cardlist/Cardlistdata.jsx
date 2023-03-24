import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cardActions } from '_store';
import Card from "react-credit-cards-2";
import "react-credit-cards-2/es/styles-compiled.css";
import "./Cardlistdata.css";

const Cardlistdata = () => {
  const dispatch = useDispatch();
  const { cards } = useSelector(x => x.cards);
  console.log("cards", cards)
   
  useEffect(() => {
    dispatch(cardActions.getAllCard());
   }, []);
  
   //   {
  //     name: "John Smith",
  //     number: "5555 4444 3333 1111",
  //     expiry: "10/20",
  //     cvc: "737"
  //   },
  //   {
  //     name: "John Smith",
  //     number: "4111 1111 1111 1111",
  //     expiry: "10/20",
  //     cvc: "737"
  //   },
  //   {
  //     name: "John Smith",
  //     number: "3700 0000 0000 002",
  //     expiry: "10/20",
  //     cvc: "737"
  //   },
  //   {
  //     name: "John Smith",
  //     number: "5555 4444 3333 1111",
  //     expiry: "10/20",
  //     cvc: "737"
  //   },
  //   {
  //     name: "John Smith",
  //     number: "4111 1111 1111 1111",
  //     expiry: "10/20",
  //     cvc: "737"
  //   },
  //   {
  //     name: "John Smith",
  //     number: "3700 0000 0000 002",
  //     expiry: "10/20",
  //     cvc: "737"
  //   }
  // ];
 
  return (
    <div className='mainDiv'>
     <div className="tariffCards">
      {cards?.results?.map((cardData, i) => (
        <div className="cards">
          <Card
            key={i}
            name={cardData.name}
            category={cardData.category}
            number={cardData.cardNumber}
            expiry={cardData.cardExpiration}
          />
          </div>
        
      ))}
    </div>
    </div>
    
  );
};

export default Cardlistdata;
