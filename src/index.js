import { create } from "ackee-tracker";
import { getCookie, setCookie } from "./cookie.js";
import { createComponent, deleteComponent } from "./component.js";
import { identifier } from "./constants.js";

var currentTracker = null;
var trackerRunning = false;

var globalServerAddress;
var globalDomainId;
var globalOptions;

const defaultOptions = {
    text: 'This site asks you to enable detailed tracking. Your data will help to enhance your user experience.',
    acceptButtonLabel: 'Accept',
    rejectButtonLabel: 'Reject',
    moreInformationLabel: 'More Information',
    moreInformationLink: "https://docs.ackee.electerious.com/#/docs/Anonymization",

    shadow: false,
    // Possible Positions: bottom-left, bottom-right
    position: 'bottom-left'
};

function startTracker() {
    if (trackerRunning) {
        stopTracker()
    }

    if (getConsentStatus() === true) {
        currentTracker = create(globalServerAddress, { detailed: true }).record(globalDomainId);
    } else {
        currentTracker = create(globalServerAddress).record(globalDomainId);
    }
    trackerRunning = true;
}

function stopTracker() {
    if (trackerRunning) {
        currentTracker.stop();
        currentTracker = null;
        trackerRunning = false;
    } else {
        console.warn("Cannot stop tracker that is not running");
    }
}

//Export Functions
function consent(serverAddress, domainId, options = {}) {
    globalServerAddress = serverAddress;
    globalDomainId = domainId;
    globalOptions = Object.assign({}, defaultOptions, options);

    if (getCookie(identifier) != "") {
        startTracker();
    } else {
        createComponent(globalOptions);
        startTracker();
    }
}

function optIn(shouldDeleteComponent = false) {
    setCookie(identifier, true, 31);
    startTracker();
    if (shouldDeleteComponent) {
        deleteComponent();
    }
}

function optOut(shouldDeleteComponent = false) {
    setCookie(identifier, false, 31);
    startTracker();

    if (shouldDeleteComponent) {
        deleteComponent();
    }
}

function getConsentStatus() {
    return (getCookie(identifier) === 'true');
}

export {
    consent,
    optIn,
    optOut,
    getConsentStatus
};