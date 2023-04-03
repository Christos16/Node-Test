

{/* As it was unclear to me whether I should use the Bearer token showed on the project or just add an authication with Jwt so I create this file to demonstrate both ways */}
export default (app) => {
    app.post(
      `/auth`,
      require('./token').default
    );
  };