# Internet Button Playground

The repository contains code used to create [Internet Button](https://store.particle.io/products/internet-button) projects.

## Projects

This repository is structure to hold multiple project that can switched between buttons.

### Five Thirty Eight Election Odds Displayer:

This project from 2016 illuminated the LEDs at random. Each time an LED turned on it had a variable percentage chance of being blue or red.

![Gif of internet button illuminating LEDs in sequence in blue or red.](https://raw.githubusercontent.com/stevector/internet-button-playground/e3140c7b876f8c8ea715441e7e397741c05e7603/documentation/images/538.gif)

Watch this [YouTube Video](https://www.youtube.com/watch?v=ujS55u_myBg) from [@fauxalgore](https://github.com/fauxalgore) for a full explanation.

The source code used in this video is in `button_fte`.

### GitHub Status Reporter

This project displays the commit statuses of the default branch of a set of repos.

![Picture of internet button](https://raw.githubusercontent.com/stevector/internet-button-playground/64ca909a44d291400613668117435c3545ed1c01/documentation/images/ci-display-print.jpg)

The LEDs light up after button 2 is pressed.

![A looping gif showing the button light up after button 2 is pressed. It turns off after button 1 is pressed.](https://raw.githubusercontent.com/stevector/internet-button-playground/64ca909a44d291400613668117435c3545ed1c01/documentation/images/button-press.gif)

It only takes one or two seconds but a lot happens in that time. There are six main steps.

#### 1. The button sends an event to the Particle Cloud

The firmware  at `button/src/IbOmni.ino` publishes many events to the Particle Cloud. This event, [the pressing of button 2](https://github.com/stevector/internet-button-playground/blob/315cb6d5e9ec59e1ecf33497a2a90b981b619b30/button/src/IbOmni.ino#L107), has a [Particle webhook](https://docs.particle.io/reference/device-cloud/webhooks/) connected to it.

![Diagram 0](https://raw.githubusercontent.com/stevector/internet-button-playground/64ca909a44d291400613668117435c3545ed1c01/documentation/images/CI_diplay_diagram0.jpg)

#### The Particle Cloud is pre-configured to hit a Google Cloud Function

The Particle Cloud can GET or POST to arbitrary URLs in response to events.
The URL in this case is a Google Cloud function.
The JavaScript code for the Google Cloud Function is stored in `gcp-serverless/ci-status-reporter`.

![Diagram 1](https://raw.githubusercontent.com/stevector/internet-button-playground/64ca909a44d291400613668117435c3545ed1c01/documentation/images/CI_diplay_diagram1.jpg)

#### Hitting the GitHub GraphQL API to search for the commit statuses

The JavaScript running on Google Cloud (stored in `gcp-serverless/ci-status-reporter`) then uses the [graphql-got](https://www.npmjs.com/package/graphql-got) library to ask GitHub for the respostory statuses.

![Diagram 2](https://raw.githubusercontent.com/stevector/internet-button-playground/64ca909a44d291400613668117435c3545ed1c01/documentation/images/CI_diplay_diagram2.jpg)

#### GraphQL responds with deeply nested JSON

The response from GitHub looks something like this (but with 11 nodes instead of 1):

```
{
  "search": {
    "edges": [
      {
        "node": {
          "nameWithOwner": "stevector/nerdologues-d8",
          "defaultBranchRef": {
            "target": {
              "status": {
                "state": "SUCCESS"
              }
            }
          }
        }
      }
    ]
  }
}
```

![Diagram 3](https://raw.githubusercontent.com/stevector/internet-button-playground/64ca909a44d291400613668117435c3545ed1c01/documentation/images/CI_diplay_diagram3.jpg)

#### The response is flattened and sent back to the Particle Cloud

The Google Cloud Function uses [got](https://www.npmjs.com/package/got) to send a POST to `https://api.particle.io/v1/devices/' + deviceId + '/circleCi'`.
In that URL `deviceId` is a unique identifier for the button to be illuminated and `circleCi` is the name of the function to call on the button.
The body of the POST contains the a pattern like `g,r,g,g,g,g,g,g,g,g,g,` to be parsed by the button.

![Diagram 4](https://raw.githubusercontent.com/stevector/internet-button-playground/64ca909a44d291400613668117435c3545ed1c01/documentation/images/CI_diplay_diagram4.jpg)

#### The Particle Cloud calls a function on the button

The function [`circleCi`](https://github.com/stevector/internet-button-playground/blob/bd152047d8685e69e63d6b8f1e573f1ed57d7f72/button/src/IbOmni.ino#L231) parses the string of comma-separated `r`s and `g`s.

![Diagram 5](https://raw.githubusercontent.com/stevector/internet-button-playground/64ca909a44d291400613668117435c3545ed1c01/documentation/images/CI_diplay_diagram5.jpg)

