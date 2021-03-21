# Relivant Commands

This repo was initialized using Nx and leverages React. The final app allows a user to:
- select playing agains a computer or human, or having a computer face itself
- when playing against a computer, a player can choose which turn they start playing
- try to get 4 in a row
## Storybook

- nx run ui:storybook
  - this will run the basic ui library in storybook
- nx run wrapper:storybook
  - this will run the components of the ui library in conjunction with the wrapper and all the logic needed

## Unit Testing

- nx run game-logic:test
  - it uses the jest test runner

## Run app

- nx run connect-the-tokens-game:serve
  - this spins up the app, though it's functionality can be demonstrated using storybook