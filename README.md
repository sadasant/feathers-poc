# Feathers Proof Of Concept

This repo is indented to be used as a proof of concept for an API that
has the following features:

- Uses [FeathersJS](https://feathersjs.com), _an open source REST and realtime API layer for modern applications_.
- Uses [Mongoose](http://mongoosejs.com), an _elegant mongodb object modeling for node.js_.
- Uses [Contexture](), _a tool for running the Contexture DSL, which is primarily about abstracting queries/filters and results/aggregrations_.
- Uses [SocketIO](https://socket.io), which _enables real-time bidirectional event-based communication_.
- Where all the available services can be reached through websockets
  (see [`master/setup/socketio.js`](https://github.com/sadasant/feathers-poc/blob/master/setup/socketio.js)).
- Where messages are sent in real time either to everyone, or to a
  specific channel available for all the users within the same
  company
  (see [`master/setup/socketio.js`](https://github.com/sadasant/feathers-poc/blob/master/setup/socketio.js)).
- Where there is more than one hook that catches every incoming request
  (see [`master/setup/socketio.js`](https://github.com/sadasant/feathers-poc/tree/master/hooks)).
- Where there's a custom service that does something not super REST-y
  but follows [featherss recommendstions on the
  subject](https://docs.feathersjs.com/faq/readme.html#how-do-i-create-custom-methods)
  (the service is the only one we have besides the models, so [this
  one](https://github.com/sadasant/feathers-poc/blob/master/services/search/index.js)).
- Where authentication happens using `jwt` tokens and not sessions
  (see [here](https://github.com/sadasant/feathers-poc/blob/master/setup/auth.js)).
- Where `passwords` are encrypted (see
  [here](https://github.com/sadasant/feathers-poc/blob/master/models/user/index.js#L16-L23)).
- Where `passwords` are ommited from the response bodies (see
  [here](https://github.com/sadasant/feathers-poc/blob/master/setup/auth.js#L34-L39)).
- Where every service endpoint is paginated (see
  [here](https://github.com/sadasant/feathers-poc/blob/master/models/user/index.js#L26)).
- That can be fully tested without having to use a web browser (I find
  this extremely satisfying).
- That uses the latest version of `babel` with the latest available
  features for ES+.
- Where every file is auto-formatted by [prettier](http://prettier.io).

## How to Use this Repo

To use this repo, simply clone it, install it's dependencies and then
run both the server and a pair of clients to see them talking in real
time. Instructions follow:

1. To clone the repo: `git clone git@github.com:sadasant/feathers-poc.git`.
2. To install it's dependencies: `npm install`.
3. To run the server: `npm start`. This will attempt to initialize a web server on the port 1337.
4. To run a common user: `npm run poc`. You'll need to do this on a separate terminal.
5. To run an admin user: `npm run poc admin`. You'll need to do this on a separate terminal.

Once you have the **server**, and at least two active **users**,
you'll be able to see them _talking_ with each other.

## How do the users talk?

The _talkig_ is simply an infinite loop, where every 5 seconds each user
will try to send a message to the server. The message will contain the
current `date`, and every other message will be scoped to the
_company-specific channel_
(code [here](https://github.com/sadasant/feathers-poc/blob/master/poc/index.js#L16-L48)).
So, messages that belong to the _common_ company won't be received by
users belonging to the _admins_ company, and viceversa. However,
public messages (messages without a `company` property) will be
received by all parties.

- Here is where the users subscribe to the public and company-specific
  channels:
  https://github.com/sadasant/feathers-poc/blob/master/setup/socketio.js#L11-L20
- Here is where things get published to the specific channels:
  https://github.com/sadasant/feathers-poc/blob/master/setup/socketio.js#L21-L30

This idea is taken from this comment:
https://github.com/feathersjs/feathers/issues/786#issuecomment-358029481

## How can we debug what's being sent over websockets?

Thanks to [SocketIO's documentation](https://socket.io/docs/logging-and-debugging), we
know that this can be done by exposing the environment variable
`DEBUG=*` before starting the `poc` scripts. For example, with:
`DEBUG=* npm run poc`. The output is verbose, so I recmmend doing:
`DEBUG=* npm run poc > output 2>&1` then inspecting the `output` file
after waiting ten or fifteen seconds.

## Are you sure the `poc` code runs in the browser?

**YES!** But don't believe me, you can try it yourself. Here are the instructions:

1. Make sure the server is running: `npm start`.
2. Build the `poc` files and start a static web server with `npm run web`.
3. Click here: <http://localhost:3000>

Done! You should be able to see it live and kicking. Here's a
screenshot:

[![](https://i.imgur.com/EepRTPf.png)](https://i.imgur.com/EepRTPf.png)

## Why did you do this?

I did this as a form of _boilerplate_ for working with these tools,
but I don't recommend this to be a boilerplate, because some of the
decissions I took are a bit oppininated.

Here's a quick list of the oppinionated decissions:

1. I'm running everything through `babel-node`. Why? Because if we're
at the point where we babelify all of the client, we better simply
allow ourselves to reuse code 😃
2. In Feathers, Models are services, but I'm separating them in
folders (see `models/` and `services/`). The only difference is that
`models` have to be wrapped in `feathers-mongoose`, see:
https://github.com/sadasant/feathers-poc/blob/master/models/index.js#L5
3. I'm using a simple little thing I'm calling
[mapFolders](https://github.com/sadasant/feathers-poc/blob/master/utils/mapFolders.js)
which seemed simpler to me than using stuff like
[node-require-all](https://github.com/felixge/node-require-all) or
[directory-metagen](https://github.com/smartprocure/directory-metagen).
4. I'm using `lodash`. Not as functional and safe as
[other alternatives](https://github.com/stoeffel/awesome-fp-js).

## I don't care! I want to use this!

Alright, if you want to use this, **keep in mind the following**:

1. Again, I'm running everything through `babel-node`.
2. This repo has `0` unit tests.
3. I'm trying to create the users I use to run the tests when the
server starts:
https://github.com/sadasant/feathers-poc/blob/master/models/user/index.js#L30-L45
4. The concept of a `company` is just a String property in each user.
5. The values I use for `createdAt` on the messages have the type Number
   because of a bug in contexture-mongo:
   https://github.com/sadasant/feathers-poc/blob/master/models/message/index.js#L12
6. The `hooks` are empty (see
[here](https://github.com/sadasant/feathers-poc/blob/master/hooks/activities/index.js)
and
[here](https://github.com/sadasant/feathers-poc/blob/master/hooks/channels/index.js)).

## Roadmap

If this continues to be useful to me or more people, I might:

- Make proper integration tests that wake up the users within the same
  framework, so we don't have to run three separate terminals to test
  this.
- Write unit tests for the utils I have, which are basically only:
  [mapFolders](https://github.com/sadasant/feathers-poc/blob/master/utils/mapFolders.js).
- Build a load test, where we could see how many users and channels we can
  have until things get slow.

## License

```
/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <sadasant@gmail.com> wrote this file.  As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return.   Daniel Rodríguez
 * ----------------------------------------------------------------------------
 */

         .:.      .:.         .:.
       _oOoOo   _oOoOo       oOoOo_
      [_|||||  [_|||||       |||||_]
        |||||    |||||       |||||
  jgs   ~~~~~    ~~~~~       ~~~~~

ASCII art from: http://www.geocities.ws/SoHo/7373/food.html (ugh, geocities ಠ_ಠ)
(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ Mr. jgs, thank you for the ASCII beers, whoever you are.
```
