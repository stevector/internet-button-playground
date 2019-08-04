# Internet Button Playground

The repository contains code used to create Internet Button projects.

## Projects:

### GitHub Status Reporter

This project displays the commit statuses of the default branch of a set of repos.

![Picture of internet button](https://raw.githubusercontent.com/stevector/internet-button-playground/64ca909a44d291400613668117435c3545ed1c01/documentation/images/ci-display-print.jpg)

The LEDs light up after button 2 is pressed.

![A looping gif showing the button light up after button 2 is pressed. It turns off after button 1 is pressed.](https://raw.githubusercontent.com/stevector/internet-button-playground/64ca909a44d291400613668117435c3545ed1c01/documentation/images/button-press.gif)


#### The button sends an event to the Particle Cloud

![Diagram 0](https://raw.githubusercontent.com/stevector/internet-button-playground/64ca909a44d291400613668117435c3545ed1c01/documentation/images/CI_diplay_diagram0.jpg)

#### The Particle Cloud is pre-configured to hit a Google Cloud Function

![Diagram 1](https://raw.githubusercontent.com/stevector/internet-button-playground/64ca909a44d291400613668117435c3545ed1c01/documentation/images/CI_diplay_diagram1.jpg)

#### Hitting the GitHub GraphQL API

![Diagram 2](https://raw.githubusercontent.com/stevector/internet-button-playground/64ca909a44d291400613668117435c3545ed1c01/documentation/images/CI_diplay_diagram2.jpg)

#### Hitting the GitHub GraphQL API

![Diagram 3](https://raw.githubusercontent.com/stevector/internet-button-playground/64ca909a44d291400613668117435c3545ed1c01/documentation/images/CI_diplay_diagram3.jpg)

#### The response is flattened and sent back to the Particle Cloud

![Diagram 4](https://raw.githubusercontent.com/stevector/internet-button-playground/64ca909a44d291400613668117435c3545ed1c01/documentation/images/CI_diplay_diagram4.jpg)

#### The Particle Cloud calls a function on the button

![Diagram 5](https://raw.githubusercontent.com/stevector/internet-button-playground/64ca909a44d291400613668117435c3545ed1c01/documentation/images/CI_diplay_diagram5.jpg)

