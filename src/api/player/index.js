// ---------------------------------------------------------------------------------------------
// YOU CAN MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// YOU SHOULD NOT CHANGE THE EXPORTED VALUE OF THIS FILE
// ---------------------------------------------------------------------------------------------

import authJwt from '../auth/middleware';





export default (app) => {
  app.put(
    `/player/:id`,
    require('./update').default
  );
  app.delete(
    `/player/:id`, authJwt,
    require('./delete').default
  );
  app.get(
    `/player`,
    require('./getList').default
  );
  app.post(
    `/player`,
    require('./create').default
  );
};