import * as ackeeTracker from "ackee-tracker";
import { getCookie, setCookie } from "./cookie.js";
import { createComponent, deleteComponent } from "./component.js";

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

    if (getCookie("consent-axkeg5u7") == "true") {
        currentTracker = ackeeTracker.create(globalServerAddress, { detailed: true }).record(globalDomainId);
    } else {
        currentTracker = ackeeTracker.create(globalServerAddress).record(globalDomainId);
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

    if (getCookie("consent-axkeg5u7") != "") {
        startTracker();
    } else {
        createComponent(globalOptions);
        startTracker();
    }
}

function optIn(shouldDeleteComponent = false) {
    setCookie("consent-axkeg5u7", true, 31);
    startTracker();
    if (shouldDeleteComponent) {
        deleteComponent();
    }
}

function optOut(shouldDeleteComponent = false) {
    setCookie("consent-axkeg5u7", false, 31);
    startTracker();

    if (shouldDeleteComponent) {
        deleteComponent();
    }
}

export {
    consent,
    optIn,
    optOut
};