# API socket chat

## Setup
Install dependencies by running `yarn install` (or `yarn`) in project root

## Run
`yarn start` - run development server on http://localhost:4001

## Usage
In order to use this API socket.io-client and connect.

After connection you will receive a `cliendId` message with your own `clientId`. You can use this information to distinguish your message from anothers'.

You will receive messages written by you or another users in `message` topic. Also historical messages will be sent this way. They are stored in `data.txt` file. Messages can be sent to the same (`message`) topic. The valid message model is:

```
{
  "message": string,
  "clientId": string
}
```
