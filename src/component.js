import { identifier } from "./constants";
var componentCreated = false;

function getComponent(globalOptions) {
    const elementMain = document.createElement("div");

    elementMain.id = identifier;
    if(globalOptions.shadow) {
        elementMain.classList.add(identifier + "-shadow");
    }
    elementMain.classList.add(identifier + "-position-" + globalOptions.position);

    const elementMainText = document.createElement("div");
    elementMainText.id = identifier + "-text";
    elementMainText.innerHTML = globalOptions.text + "<br />";

    const elementMainTextLink = document.createElement("a");
    elementMainTextLink.id = identifier + "-text-link";
    elementMainTextLink.href = globalOptions.moreInformationLink;
    elementMainTextLink.target = "_blank";
    elementMainTextLink.rel = "noopener noreferrer";
    elementMainTextLink.innerHTML = globalOptions.moreInformationLabel + "<br />";

    const elementMainButton = document.createElement("div");
    elementMainButton.id = identifier + "-button";

    const elementMainAcceptButton = document.createElement("button");
    elementMainAcceptButton.onclick = function() { AckeeTrackerOptIn.optIn(true) };
    elementMainAcceptButton.innerHTML = globalOptions.acceptButtonLabel;

    const elementMainRejectButton = document.createElement("button");
    elementMainRejectButton.onclick = function() { AckeeTrackerOptIn.optOut(true); };
    elementMainRejectButton.innerHTML = globalOptions.rejectButtonLabel;

    elementMainButton.appendChild(elementMainAcceptButton);
    elementMainButton.appendChild(elementMainRejectButton);

    elementMainText.appendChild(elementMainTextLink);
    elementMain.appendChild(elementMainText);
    elementMain.appendChild(elementMainButton);

    return elementMain;
}

function createComponent(globalOptions) {
    if (!componentCreated) {
        require("./style.min.css");

        document.body.appendChild(getComponent(globalOptions));

        componentCreated = true;
    } else {
        console.warn("Cannot create component that already exists");
    }
}

function deleteComponent() {
    if (componentCreated) {
        const component = document.getElementById(identifier)
        component.parentElement.removeChild(component);
        componentCreated = false;
    } else {
        console.warn("Cannot delete component that does not exist");
    }
}

export {
    createComponent,
    deleteComponent
}