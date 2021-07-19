import { create } from "ackee-tracker";
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

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

//Export Functions
function consent(serverAddress, domainId, options = {}) {
    globalServerAddress = serverAddress;
    globalDomainId = domainId;
    globalOptions = Object.assign({}, defaultOptions, options);

    if (localStorage.getItem(identifier) != null) {
        const savedTime = new Date(parseInt(localStorage.getItem(identifier + "-time")));
        if (savedTime > new Date()) {
            startTracker();
        } else {
            localStorage.removeItem('consent-axkeg5u7');
            createComponent(globalOptions);
            startTracker();
        }
    } else {
        createComponent(globalOptions);
        startTracker();
    }
    localStorage.setItem(identifier + "-time", addDays(new Date(), 31).getTime())
}

function optIn(shouldDeleteComponent = false) {
    localStorage.setItem(identifier, true);
    startTracker();
    if (shouldDeleteComponent) {
        deleteComponent();
    }
}

function optOut(shouldDeleteComponent = false) {
    localStorage.setItem(identifier, false);
    startTracker();

    if (shouldDeleteComponent) {
        deleteComponent();
    }
}

function getConsentStatus() {
    return (localStorage.getItem(identifier) === 'true');
}

export {
    consent,
    optIn,
    optOut,
    getConsentStatus
};