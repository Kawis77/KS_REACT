import React from 'react';

const EmptyFieldWarning = ({ value, name }) => {
  // Sprawdź, czy wartość pola jest pusta
  const divElement = document.querySelector(`#${name}`);
  if (!value) {
    if (divElement) {
      divElement.style.background = '#ffe8e7';
    }
  }else if(value){
    divElement.style.background = 'white';
  }else{
    divElement.style.background = '#ffe8e7';
  }
};

export default EmptyFieldWarning;