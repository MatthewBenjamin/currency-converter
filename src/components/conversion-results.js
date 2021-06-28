import { CurrencyContainerStylesMixin, CurrencyWithLogo } from './currency';
import { INITIAL_CURRENCY_AMOUNT } from '../constants';
import React from 'react';
import styled from 'styled-components';

const StyledUl = styled.ul`
  list-style-type: none;
  max-width: 450px;
  margin: 1rem auto;
  padding: 0;
  ${({ showResults }) => (showResults ? 'display: block' : 'display: none')};

  li {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
`;
const StyledCurrencyContainer = styled.span`
  ${CurrencyContainerStylesMixin}
  margin: 0;
  cursor: unset;
`;

const StyledSpanConvertedAmount = styled.span`
  color: rgb(46, 57, 73);
  margin-left: 1rem;
  font-size: 1.5rem;
`;

const PromptStyledP = styled.p`
  && {
    font-size: 1.25rem;
  }
  ${({ showResults }) => (!showResults ? 'display: block' : 'display: none')};
`;

const ConversionResults = ({ currencyAmount, conversionResults, assets }) => {
  // TODO: fix bug for zero values that aren't INITIAL_CURRENCY_AMOUNT, i.e. 00.00
  const showResults = currencyAmount !== INITIAL_CURRENCY_AMOUNT;

  return (
    <div>
      <PromptStyledP showResults={showResults}>Enter an amount to check the rates</PromptStyledP>
      <StyledUl showResults={showResults}>
        {conversionResults.map(({ convertedAmount, codeForTradingPair }) => {
          const logoImageUrl = assets?.[codeForTradingPair]?.image;

          return (
            <li key={codeForTradingPair}>
              <StyledSpanConvertedAmount>{convertedAmount}</StyledSpanConvertedAmount>
              <StyledCurrencyContainer>
                <CurrencyWithLogo currentCurrency={codeForTradingPair} logoImageUrl={logoImageUrl} />
              </StyledCurrencyContainer>
            </li>
          );
        })}
      </StyledUl>
    </div>
  );
};

export default ConversionResults;
