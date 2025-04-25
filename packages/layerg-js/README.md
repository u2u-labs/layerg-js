LayerG JavaScript client
========================

> JavaScript client for LayerG server written in TypeScript. For browser and React Native projects.

[LayerG](https://github.com/u2u-labs/layerg-core) is an open-source server designed to power modern games and apps. Features include user accounts, chat, social, matchmaker, realtime multiplayer, and much [more](https://layerg.xyz).

This client implements the full API and socket options with the server. It's written in TypeScript with minimal dependencies to be compatible with all modern browsers and React Native.

Full documentation is online - https://docs.layerg.xyz

## Getting Started

You'll need to setup the server and database before you can connect with the client. The simplest way is to use Docker but have a look at the [server documentation](https://github.com/u2u-labs/layerg-core#getting-started) for other options.

1. Install and run the servers. Follow these [instructions](https://docs.layerg.xyz/getting-started/install/docker-compose).

2. Import the client into your project. It's [available on NPM](https://www.npmjs.com/package/@u2u-labs/layerg-js) and can be also be added to a project with Bower or other package managers.

    ```shell
    npm install @u2u-labs/layerg-js
    ```

    You'll now see the code in the "node_modules" folder and package listed in your "package.json".

    Optionally, if you would like to use the Protocol Buffers wire format with your sockets, you can import the adapter found in this package:

    ```shell
    npm install @u2u-labs/layerg-js-protobuf
    ```

3. Use the connection credentials to build a client object.

    ```js
    import {Client} from "@u2u-labs/layerg-js";

    var useSSL = false; // Enable if server is run with an SSL certificate.
    var client = new Client("defaultkey", "127.0.0.1", "7350", useSSL);
    ```

## Usage

The client object has many methods to execute various features in the server or open realtime socket connections with the server.

### Authenticate

There's a variety of ways to authenticate and bridge traditional account to Web3 space with the server. Authentication can create a user if they don't already exist with those credentials. It's also easy to authenticate with a social profile from Facebook, Twitter, Google, Telegram, ...

### Requests

The client includes lots of builtin APIs for various features of the game server. These can be accessed with the methods which return Promise objects. It can also call custom logic as RPC functions on the server. These can also be executed with a socket object.

All requests are sent with a session object which authorizes the client.


### Source Builds

Ensure you are using Node v18>.

The codebase is multi-package monorepo written in TypeScript and can be built with [esbuild](https://github.com/evanw/esbuild). All dependencies are managed with NPM.

To build from source, first install all workspace dependencies from the repository root with `npm install`.

Then to build a specific workspace, pass the `--workspace` flag to your build command, for example:

```shell
npm run build --workspace=@u2u-labs/layerg-js
```

### Protocol Buffer Web Socket Adapter

To update the generated Typescript required for using the protocol buffer adapter, `cd` into
`packages/layerg-js-protobuf` and run the following:

```shell
npx protoc \
--plugin="./node_modules/.bin/protoc-gen-ts_proto" \
--proto_path=$GOPATH/src/github.com/u2u-labs/go-layerg-common \
--ts_proto_out=. \
--ts_proto_opt=snakeToCamel=false \
--ts_proto_opt=esModuleInterop=true \
$GOPATH/src/github.com/u2u-labs/go-layerg-common/rtapi/realtime.proto \
$GOPATH/src/github.com/u2u-labs/go-layerg-common/api/api.proto
```

### Release Process

To release onto NPM if you have access to the "@u2u-labs" organization you can use NPM.

```shell
npm run build --workspace=<workspace> && npm publish --access=public --workspace=<workspace>
```

### Generate Docs

API docs are generated with typedoc and deployed to GitHub pages.

To run typedoc:

```
npm install && npm run docs
```

### License

This project is licensed under the [Apache-2 License](https://github.com/u2u-labs/layerg-js/blob/master/LICENSE).
