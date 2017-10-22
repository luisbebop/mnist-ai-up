# mnist-ai-up

AI that recognizes handwriteen digits (MNIST) using Javascript and AWS lambda. The idea is based on [this tutorial](https://github.com/llSourcell/how_to_deploy_a_keras_model_to_production).

It uses [Neataptic](https://github.com/wagenaartje/neataptic) to train the network and [AWS lambda](https://aws.amazon.com/lambda/) to serve the API endpoint.

[Live demo](https://xzr0dc9xba.execute-api.us-west-2.amazonaws.com/development/mnist.html)

## Setup

```
$ npm install
```

## Train new model

```
$ node mnist-train.js
```

## Deploy

Install [Up](https://github.com/apex/up) 

```
$ up
```

## Notes

The `build` hook in `up.json` simply runs `make`, which ensures that the `./node-v8.4.0-linux-x64` binary is downloaded and present, Make is used so that this process only happens once.

```json
{
  "hooks": {
    "build": "make"
  }
}
```

The `proxy.command` script is run inside Lambda to start your server. You can think of this as `npm start`, however you'd likely want `npm start` to be `node app.js` for local development. Defining `proxy.command` is strictly for running in production.

```json
{
  "proxy": {
    "command": "./node-v8.7.0-linux-x64/bin/node app.js"
  }
}
```

Also note that `./node-v8.7.0-linux-x64` is placed in .gitignore so it's not checked into GIT. Up will ignore these by default, so we negate it with `!node-v8.7.0-linux-x64` in .upignore.