import React from 'react';
import type { airgapProps } from 'src/@types/airgap.js';

// airgap.getPurposeTypes()
//
// Advertising:
//      configurable: true
//      defaultConsent: "AutoGDPR"
//      description: "Helps us and others serve ads relevant to you."
//      essential: false
//      name: "Targeting / Advertising"
//      showInConsentManager: true
// Analytics:
//      configurable: true
//      defaultConsent: "AutoGDPR"
//      description: "Help us learn how our site is used and how it performs."
//      essential: false
//      name: "Analytics + Performance"
//      showInConsentManager: true

export const PurposeList: React.FC<airgapProps> = ({ airgap }) => {
  interface iPurpose {
    label: string;
    id: string;
    description: string;
  }
  const purposeArray: iPurpose[] = [];

  const purposesTypes = airgap.getPurposeTypes();

  Object.keys(purposesTypes).forEach((key) => {
    const purposeType = purposesTypes[key];
    if (!purposeType.configurable && purposeType.showInConsentManager) {
      const purposeTypeObj: iPurpose = {
        label: purposeType.name,
        id: key,
        description: purposeType.description,
      };
      return purposeArray.push(purposeTypeObj);
    }
  });

  return (
    <ul>
      {purposeArray.map((obj) => (
        <li key={obj.id} id={obj.id}>
          <b>{obj.label}:</b> {obj.description}
        </li>
      ))}
    </ul>
  );
};

export default PurposeList;
