import type { ConsentManagerConfig } from 'src/@types/airgap.js';

export const airgapInit = window.airgap;
export const transcendInit = window.transcend;

export const consentManagerConfigDefaults = {
  learnMoreLink: 'Learn more in our Privacy Center',
  closeButtonAriaLabel: 'Close modal',
  primaryButtonLabel: 'Save Preferences',
  bottomCloseButtonAriaLabel: 'Close this dialog window',
  bottomCloseButtonLabel: 'Close',
  requiredDisclosuresHeader:
    'We also collect information for the following purposes:',

  company: null,
  companyURL: null,
  consentManagerTitle: 'You control your data.',
};

const transcendConfig = transcendInit?.consentManagerConfig;

if (!transcendConfig || Object.keys(transcendConfig).length === 0) {
  console.error(
    'Consent manager config missing! Make sure transcend.consentManagerConfig is set correctly.\ntranscend.consentManagerConfig =',
    transcendConfig,
  );
}

const config: ConsentManagerConfig = {
  ...consentManagerConfigDefaults,
  ...transcendConfig,
};

config.dialog_header_text =
  config.dialog_header_text ||
  `${config.company || 'Our'} products are designed to protect your privacy.`;

config.dialog_body_text = `We won't collect data about you for advertising, analytics, or other non-essential things unless you give us permission to.`;
config.dialog_more_body_text = `You can change your preferences at any time from this window or from our Privacy Center.`;
config.prefsHeader =
  config.prefsHeader ||
  `Choose how ${config.company || 'we'} may collect and use data about you`;
config.RequiredByLaw =
  'We share relevant information with [government agency here] as pursuant to [jurisdiction] law.';
config.Parkinsons_Cursor_Tracking = `We share your cursor movement with an NGO dedicated to curing Parkinson's Disease.`;
config.GovernmentRequiredDataCollection = 'Government-required data collection';
config.CursorTracking = 'Cursor Tracking';
export { config };
