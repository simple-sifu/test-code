import React, { FC } from 'react';
import './ToggleSwitch.css';

export interface toggleProps {
  label: string;
  id: string;
}

const ToggleSwitch: FC<toggleProps> = ({ label, id }) => {
  return (
    <div className="container">
      <div className="toggle-switch">
        <input
          type="checkbox"
          className="checkbox"
          name={id}
          id={id}
          key={id}
        />
        <label className="label" htmlFor={id}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>{' '}
      {label}
    </div>
  );
};

export default ToggleSwitch;
