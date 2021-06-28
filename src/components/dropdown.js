import { CurrencyContainerStylesMixin, CurrencyWithLogo } from './currency';
import { INITIAL_CURRENCY_AMOUNT } from '../constants';
import React from 'react';
import styled from 'styled-components';

const StyledUl = styled.ul`
  /* TODO: refactor dropdownIsActive dynamic styles */
  visibility: ${({ dropdownIsActive }) => (dropdownIsActive ? 'visible' : 'hidden')};
  opacity: ${({ dropdownIsActive }) => (dropdownIsActive ? '1' : '0')};
  ${({ dropdownIsActive }) => !dropdownIsActive && 'top: 100%'};
  list-style-type: none;

  li {
    display: block;
    button {
      ${CurrencyContainerStylesMixin}
      margin: 0;
      padding-left: 0.5rem;
    }
  }

  // copied some styles from Uphold.com to match look and feel
  transition: opacity 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95) 0s,
    transform 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95) 0s, visibility 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95) 0s;
  background-color: rgb(255, 255, 255);
  border-radius: 1.25rem;
  box-shadow: rgb(60 74 91 / 40%) 0px 1rem 1rem;
  flex-direction: column;
  padding: 0 0 0.5rem 0;
  position: absolute;
  margin: 0.5rem 0.75rem 0 0;
  right: 0;

  @media screen and (max-width: 480px) {
    position: fixed;
    top: 0;
    left: 0;
    margin: 0;
    max-height: 100vh;
    overflow: scroll;

    li {
      display: inline;
    }
  }
`;
const CurrencyListItem = ({
  code,
  logoImageUrl,
  isCurrentCurrency,
  setCurrentCurrency,
  setDropdownIsActive,
  setCurrencyAmount,
}) => (
  <li key={code}>
    <button
      onClick={(e) => {
        e.preventDefault();

        // TODO: need more safety so these are never invoked when undefined
        if (!isCurrentCurrency) {
          setCurrentCurrency(code);
          setCurrencyAmount(INITIAL_CURRENCY_AMOUNT);
        }

        setDropdownIsActive(false);
      }}
    >
      <CurrencyWithLogo currentCurrency={code} logoImageUrl={logoImageUrl} />
    </button>
  </li>
);

const Dropdown = ({
  setCurrencyAmount,
  setDropdownIsActive,
  dropdownIsActive,
  assets,
  currentCurrency,
  setCurrentCurrency,
}) => {
  // TODO: refactor, there's probably a more consise/idiomatic way push current currency to the top
  const currentCurrencylogoImageUrl = assets?.[currentCurrency]?.image;

  return (
    <StyledUl dropdownIsActive={dropdownIsActive}>
      <CurrencyListItem
        code={currentCurrency}
        dropdownIsActive={dropdownIsActive}
        isCurrentCurrency
        key={currentCurrency}
        logoImageUrl={currentCurrencylogoImageUrl}
        setDropdownIsActive={setDropdownIsActive}
      />
      {Object.keys(assets).map((currentKey) => {
        const { code } = assets[currentKey];
        const logoImageUrl = assets?.[code]?.image;

        return currentCurrency !== code ? (
          <CurrencyListItem
            code={code}
            dropdownIsActive={dropdownIsActive}
            key={code}
            logoImageUrl={logoImageUrl}
            setCurrencyAmount={setCurrencyAmount}
            setCurrentCurrency={setCurrentCurrency}
            setDropdownIsActive={setDropdownIsActive}
          />
        ) : null;
      })}
    </StyledUl>
  );
};

export default Dropdown;
