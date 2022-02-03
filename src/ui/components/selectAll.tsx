import type React from 'react';
import type { AirgapAPI } from 'src/@types/airgap.js';

export function SelectAll(
  event: React.SyntheticEvent,
  allow: boolean,
  airgap: AirgapAPI,
) {
  var textInputs = document.querySelectorAll('input[type=checkbox]');
  textInputs.forEach((input) => {
    const response = allow
      ? airgap.optIn(event.nativeEvent)
      : airgap.optOut(event.nativeEvent);
    if (response) {
      console.log(`User successfully ${allow ? 'opted In' : 'opted Out'} !!!!`);
      const definedInput = input as HTMLInputElement;
      definedInput.checked = allow;
    } else {
      console.log(
        `airgap failed to execute method for ${
          allow ? 'opted In' : 'opted Out'
        }`,
      );
    }
  });
}

type TrackingConsent = {
  /** Consent to tracking for functional purposes */
  Functional?: boolean;
  /** Consent to tracking for advertising purposes */
  Advertising?: boolean;
  /** Consent to tracking for marketing and analytic purposes */
  Analytics?: boolean;
  /** Consent to tracking for essential purposes */
  Essential?: true;
  /** Unknown (unable to be consented) */
  Unknown?: false;
};

export function SelectSome(event: React.SyntheticEvent, airgap: AirgapAPI) {
  var textInputs = document.querySelectorAll('input[type=checkbox]');
  const trackingConsent: TrackingConsent = {
    Functional: false,
    Advertising: false,
    Analytics: false,
  };

  textInputs.forEach((input) => {
    const definedInput = input as HTMLInputElement;
    switch (definedInput.name) {
      case 'Functional':
        trackingConsent.Functional = definedInput.checked;
        break;
      case 'Advertising':
        trackingConsent.Advertising = definedInput.checked;
        break;
      case 'Analytics':
        trackingConsent.Analytics = definedInput.checked;
        break;
      default:
        console.log(`Could not find ${definedInput}.`);
    }
  });
  const response = airgap.setConsent(event.nativeEvent, trackingConsent);
  if (response) {
    console.log(
      `User successfully saved preferences with ${JSON.stringify(
        trackingConsent,
      )} !!!!`,
    );
  } else {
    console.log(
      `User failed to save preferences with ${JSON.stringify(
        trackingConsent,
      )} !!!!`,
    );
  }
}

export default SelectAll;
