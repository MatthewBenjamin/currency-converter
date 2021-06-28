import { CurrencyContainerStylesMixin, CurrencyWithLogo } from './currency';
import Dropdown from './dropdown';
import React, { useState } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  margin: 0 auto;
  width: 450px;
  background: rgb(245, 249, 252);
  height: 60px;
  border: 0px rgb(104, 119, 141);
  border-radius: 8px;
  position: relative;
  max-width: 100%;

  input {
    width: 200px;
    flex-grow: 1;
    background-color: transparent;
    border: none;
    color: ${({
      theme: {
        colors: { number },
      },
    }) => number};
    font-size: 2rem;
    outline: none;
    padding-left: 1rem;
  }

  button {
    ${CurrencyContainerStylesMixin}
  }
`;

const InputBox = ({ currencyAmount, setCurrencyAmount, assets, currentCurrency, setCurrentCurrency }) => {
  const [dropdownIsActive, setDropdownIsActive] = useState(false);
  const handleOnChangeWithInputValidation = (e) => {
    e.preventDefault();
    // replace chars that are NOT: negative sign, decimal, digit
    // https://stackoverflow.com/a/9409894
    const newInputValue = e.target.value.replace(/[^\d.-]/g, '');

    // check if input is still valid (could have double decimals, negative signs, etc)
    // TODO: more robust regex check above would probably make this check obsolete
    if (!Number.isNaN(Number(newInputValue))) {
      setCurrencyAmount(newInputValue);
    }
  };

  const logoImageUrl = assets?.[currentCurrency]?.image;

  return (
    <StyledDiv>
      {/* TODO: add <label></label> for accessibility */}
      <input
        name="currency-amount"
        onChange={handleOnChangeWithInputValidation}
        placeholder="0.00"
        value={currencyAmount}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          setDropdownIsActive(!dropdownIsActive);
        }}
      >
        <CurrencyWithLogo currentCurrency={currentCurrency} logoImageUrl={logoImageUrl} showDropdownIcon />
      </button>
      <Dropdown
        assets={assets}
        currentCurrency={currentCurrency}
        dropdownIsActive={dropdownIsActive}
        setCurrencyAmount={setCurrencyAmount}
        setCurrentCurrency={setCurrentCurrency}
        setDropdownIsActive={setDropdownIsActive}
      />
    </StyledDiv>
  );
};

export default InputBox;
