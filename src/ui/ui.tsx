import React from 'react';
import ReactDOM from 'react-dom';
import { config } from './config';
import { getAirgap } from './init';
import DetectOutsideClick from './components/detectOutsideClick';
import ShowDialog from './components/showDialog';
import ConsentStatusList from './components/consentStatusList';
import PurposeList from './components/purposeList';
import './ui.css';
import type { airgapProps } from 'src/@types/airgap.js';
import SelectAll, { SelectSome } from './components/selectAll';

let initialized = false;
// UI root node in DOM
let root: Element | undefined;

const setupConsentManagerUI = async (): Promise<void> => {
  console.log('Initializing Consent Manager UI...');
  const airgap = await getAirgap();

  // TODO: Setup your consent manager UI DOM here
  const App: React.FC<airgapProps> = ({ airgap }) => {
    return (
      <DetectOutsideClick>
        <div className="consentManagerContainer">
          <nav>
            <div className="navBarLeft">
              <a href="https://www.mozilla.org/en-US/">
                {' '}
                {`< ${config.learnMoreLink}`}
              </a>
            </div>
            <div className="navBarRight">
              <button type="submit" onClick={() => ShowDialog(false)}>
                X
              </button>
            </div>
          </nav>
          <section>
            <img
              src="images/icon.png"
              alt="transcend icon"
              height="120px"
              width="140px"
            />
            <h1>{config.consentManagerTitle}</h1>
            <p>{config.dialog_header_text}</p>

            <p>{config.dialog_body_text}</p>

            <p>{config.dialog_more_body_text}</p>

            <div className="toggleSwitches">
              <ConsentStatusList airgap={airgap} />
            </div>

            <p>{config.requiredDisclosuresHeader}</p>

            <div className="types">
              <PurposeList airgap={airgap} />
            </div>

            <div className="buttonGroup">
              <button
                id="savePreferences"
                type="submit"
                className="savePreferences"
                onClick={(e) => SelectSome(e, airgap)}
              >
                Save Preferences
              </button>
              <button
                id="acceptAll"
                type="submit"
                className="acceptAll"
                onClick={(e) => SelectAll(e, true, airgap)}
              >
                <b>ACCEPT</b> All
              </button>
              <button
                id="denyAll"
                type="submit"
                className="denyAll"
                onClick={(e) => SelectAll(e, false, airgap)}
              >
                <b>DENY</b> All
              </button>
            </div>
          </section>
        </div>
      </DetectOutsideClick>
    );
  };

  root = document.createElement('div');
  root.className = 'ConsentManager';
  ReactDOM.render(
    <React.StrictMode>
      <App airgap={airgap} />
    </React.StrictMode>,
    root,
  );
  document.body.firstElementChild?.before(root);
  // END: TODO: Setup your consent manager UI DOM here

  initialized = true;
  console.log('Consent Manager UI initialized');
};

const showConsentManagerUI = async () => {
  const airgap = await getAirgap();
  console.log('Current consent:', airgap.getConsent());

  // TODO: Display your consent manager UI here
};

export const showConsentManager = async () => {
  console.log('transcend.showConsentManager() called');
  if (!initialized) {
    await setupConsentManagerUI();
  }
  ShowDialog(true);
  await showConsentManagerUI();
};
