# Gine

Gine is a HTML5 Canvas/JavaScript game engine, rebuilt for TypeScript with full type support.  
It depends upon `RxJS` for some reactive features, like the `frame()`, `tick()` and `second()` functions on your scenes.

## How to use

You will probably want to go to the `/example/` folder.

In your favorite `terminal` run: (NPM required!)

- `npm install`
- `npm start`

You will be able to watch a basic implementation of the engine running in your browser.

You can also create your own project, setup your project the way you like it, and run

- `npm init`
- `npm install gine --save`

## How to install (advanced)

If you want to tinker around with the engines internals, you may `fork` or `clone` this repository.

- `git clone https://github.com/Bjeaurn/gine`

Move to the directory, `cd gine` and run:

- `npm install`
- `npm start`

This will install the engine locally and build your own private version to tinker around with.

You could use `npm link` in this directory, and `npm link gine` in another project to link to your local build of Gine. Don't forget to relink and `npm start` when you've changed something in the engine.

Any issues fixed, features added or general improvements made? Let me know!

I'm at [twitter/@Bjeaurn](https://twitter.com/Bjeaurn), or follow the `CONTRIBUTING.md` file to learn how to make a proper pull request.
