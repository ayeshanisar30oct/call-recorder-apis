const register_route = (router, routes = []) => {
  routes.forEach(({ route, middlewares = [], methods = [] }) => {
    methods.forEach(({ method, handler }) => {
      if (!method || !handler) {
        return;
      }
      
      // console.log(route);
      router[method.toLowerCase()](route, ...middlewares, handler);
    });
  });
};

console.log(register_route);
module.exports = {
  register_route
};
