This is a [CRAFT](https://github.com/stoyan/craft) template for my stack.

Adds Node Services boilerplate to base myCRAFT.

Includes:
* services and webClient separated at top level
* `micro` running for multiple microservices
* easy integrated development with proxy setup in parent `package.json`
* demo consumption of services with `fetch()`, which is ponyfilled by CRA

CRA date: 2017.08.14

Major additions:
* react-router v4: declarative routing
* rebass v1: out of box components built w/ styled-components
* styled-components v2: style and extend w/ frontrunner css-in-js
* react-helmet: control `<head>` from anywhere in tree
* react-snapshot: pre-render to HTML by route

Minor additions:
* static-bundle-explorer: know what is up w/ bundle sizes
* proxy in package.json: avoid annoying CORS issues in development
* Sticky footer set up (why wouldn't this be part of the design?)

This allows quick project generation for react projects w/ routing established, basic components available, css-in-js, control of meta from deep in tree, and the ability to pre-render routes.