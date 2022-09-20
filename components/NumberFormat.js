import React from 'react';
import NumberFormat from 'react-number-format';
import { Text } from 'react-native';

export function RNNumberFormat({ value }) {
  return (
    <NumberFormat
      value={value}
      displayType={'text'}
      thousandSeparator='.'
      decimalSeparator=','
      prefix={'Rp. '}
      renderText={formattedValue => <Text>{formattedValue}</Text>} // <--- Don't forget this!
    />
  );
}

export function RNNumberFormatBold({ value }) {
    return (
      <NumberFormat
        value={value}
        displayType={'text'}
        thousandSeparator='.'
        decimalSeparator=','
        prefix={'Rp. '}
        renderText={formattedValue => <Text style={{fontWeight:'bold'}}>{formattedValue}</Text>} // <--- Don't forget this!
      />
    );
  }

  export function RNNumberFormatBuyList({ value }) {
    return (
      <NumberFormat
        value={value}
        displayType={'text'}
        thousandSeparator='.'
        decimalSeparator=','
        prefix={'Rp. '}
        renderText={formattedValue => <Text style={{flex:1.5,alignSelf:'center'}}>{formattedValue}</Text>} // <--- Don't forget this!
      />
    );
  }

  export function RNNumberFormatCurrency({ value }) {
    return (
      <NumberFormat
        value={value}
        displayType={'text'}
        thousandSeparator='.'
        decimalSeparator=','
        prefix={'Rp. '}
        renderText={formattedValue => <Text style={{fontSize:25}}>{formattedValue}</Text>} // <--- Don't forget this!
      />
    );
  }