import { useState, useEffect, useCallback } from "react"; 
import Big from 'big.js';
import debounce from 'lodash.debounce'
import { INITIAL_CURRENCY_AMOUNT } from "../constants";

const usePerformDebouncedConversionCalculation = (currencyAmount, tradingPairs) => {
  // console.log('usePerformDebouncedConversionCalculation')
  const [conversionResults, setConversionResults] = useState([])

  const calculateNewConvertedValues = (currencyAmount, tradingPairs, setConversionResults) => {
    // console.log('calculateNewConvertedValues')
    if (currencyAmount !== INITIAL_CURRENCY_AMOUNT) {
      const bigJsCurrencyAmount = new Big(currencyAmount)
      const newConversionResults = tradingPairs.map(({ codeForTradingPair, ask }) => {
        const convertedAmount = bigJsCurrencyAmount.times(ask).round(2).toString()
    
        return {
          convertedAmount,
          codeForTradingPair
        }
      })
    
      setConversionResults(newConversionResults)
    } else {
      setConversionResults([])
    }
  }


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedCalculateNewConvertedValues = useCallback(debounce(calculateNewConvertedValues, 500), [])

  useEffect(() => {
    debouncedCalculateNewConvertedValues(currencyAmount, tradingPairs, setConversionResults)
  }, [currencyAmount, tradingPairs, debouncedCalculateNewConvertedValues])

  return conversionResults
}

export default usePerformDebouncedConversionCalculation
