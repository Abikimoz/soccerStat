import React from 'react';
import { TailSpin } from 'react-loader-spinner';

export const Loader = ({ color = "#00BFFF", size = 80 }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
      <TailSpin color={color} height={size} width={size} />
    </div>
  );
};
