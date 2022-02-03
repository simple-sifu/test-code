import React, { useEffect } from 'react';
import ToggleSwitch from './toggleSwitch';
import type { airgapProps } from 'src/@types/airgap.js';

// airgap.getConsent()
// purposes:
//      Advertising: true
//      Analytics: true
//      Functional: true
//      SaleOfInfo: true
// timestamp: undefined

const ConsentStatusList: React.FC<airgapProps> = ({ airgap }) => {
  function toggleCheckBox() {
    labelArray.forEach((labelObj) => {
      const checkBoxInput = document.querySelector(
        `#${labelObj.id}`,
      ) as HTMLInputElement;
      if (checkBoxInput) {
        checkBoxInput.checked = labelObj.onFlag;
      }
    });
  }

  // wait until everythings loads before initializing
  // toggleSwitches
  useEffect(toggleCheckBox);

  interface iCheckBox {
    label: string;
    id: string;
    onFlag: boolean;
  }
  const labelArray: iCheckBox[] = [];
  const consents = airgap.getConsent().purposes;
  const purposesTypes = airgap.getPurposeTypes();
  Object.keys(consents).forEach((key) => {
    const purposeType = purposesTypes[key];
    if (purposeType.configurable && purposeType.showInConsentManager) {
      const checkBoxObj: iCheckBox = {
        label: purposeType.name,
        id: key,
        onFlag: consents[key] ? true : false,
      };
      return labelArray.push(checkBoxObj);
    }
  });

  return (
    <ul>
      {labelArray.map((obj) => (
        <li key={obj.id}>
          <ToggleSwitch id={obj.id} key={obj.id} label={obj.label} />
        </li>
      ))}
    </ul>
  );
};

export default ConsentStatusList;
