<div align="center">

# ackee-tracker-consent
A script that creates a Consent banner to activate detailed tracking on Ackee. Just include it on your site to track and you are good to go!
<br />
![Consent Banner](https://raw.githubusercontent.com/ItzYanick/ackee-tracker-consent/main/exampleScreenshot.png)
</div>

[![Node.js Package](https://github.com/ItzYanick/ackee-tracker-consent/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/ItzYanick/ackee-tracker-consent/actions/workflows/npm-publish.yml)

## 📖 Table of Content
- [🚀 Installation](#-installation)
- [⚙️ API](#-api)
- [🔧 Options](#-options)

## 🚀 Installation
```html
<script src="https://cdn.jsdelivr.net/npm/ackee-tracker-consent@1.1.0/dist/ackee-tracker-consent.min.js"></script>

<script>
    AckeeTrackerOptIn.consent('https://ackee.example.com', 'hd11f820-68a1-11e6-8047-79c0c2d9bce0')
</script>
```


## ⚙️ API

### .consent(serverAddress, domainId, options)

Initialize the consent. Will create a `ackee-tracker` instance automatically.

Be sure to assign your instance to a variable. Tracking a visit or event is only possible with an instance.

Examples:

```js
AckeeTrackerOptIn.consent('https://ackee.example.com', 'hd11f820-68a1-11e6-8047-79c0c2d9bce0')
```

```js
AckeeTrackerOptIn.consent('https://ackee.example.com', 
                        'hd11f820-68a1-11e6-8047-79c0c2d9bce0',
                        {
                            acceptButtonLabel: 'Accept',
                            rejectButtonLabel: 'Reject'
                        })
```

Parameters:

- `serverAddress` `{String}` An URL that points to your [Ackee](https://github.com/electerious/Ackee) installation. The `serverAddress` property must not end with a slash.
- `domainId` `{String}` Id of the domain.
- `options` `{?Object}` An object of [options](#-options).

### .optIn(shouldDeleteComponent)

Opts-In for detailed tracking

Examples:

```js
AckeeTrackerOptIn.optIn()
```

```js
AckeeTrackerOptIn.optIn(true)
```

Parameters:

- `shouldDeleteComponent` `{?Boolean}` Should delete the consent banner component from the site. This is a internal-only variable and is only being used for the buttons in the banner itself. Therefore the `shouldDeleteComponent` property defaults to `false`

### .optOut(shouldDeleteComponent)

Opts-Out for detailed tracking

Examples:

```js
AckeeTrackerOptIn.optOut()
```

```js
AckeeTrackerOptIn.optOut(true)
```

Parameters:

- `shouldDeleteComponent` `{?Boolean}` Should delete the consent banner component from the site. This is a internal-only variable and is only being used for the buttons in the banner itself. Therefore the `shouldDeleteComponent` property defaults to `false`

## 🔧 Options

The option-object can include the following properties:

```js
{
    text: 'This site asks you to enable detailed tracking. Your data will help to enhance your user experience.',
    acceptButtonLabel: 'Accept',
    rejectButtonLabel: 'Reject',
    moreInformationLabel: 'More Information',
    moreInformationLink: "https://docs.ackee.electerious.com/#/docs/Anonymization",

    // Activates Shadow if set to true
    shadow: false,
    // Possible Positions: bottom-left, bottom-right
    position: 'bottom-left'
}
```