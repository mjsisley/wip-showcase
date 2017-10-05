At the outset, we are going to attempt to use `micro`. It should provide better performance. I will run tests after getting our first service together. Porting to something more traditional (like `express`) will be quick if it is determined that it is needed.

To manage the multiple services, it would be nice to use `micro-cluster`... but it is throwing an error and not worth hunting down at the moment.

Instead... for development purposes the root `package.json` will handle proxying to the various services, and each service will run on a different pre-determined port.

For production purposes... we will likely use a separate subdomain and have the routing entirely separate. We will need to proxy to the various services in that situation... but we will hold off on that step for now. 