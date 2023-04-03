const { JWT_SECRET } = require("./token");
const jwt = require("jsonwebtoken");

{/* As it was unclear to me whether I should use the Bearer token on the description or include an auth mechanism with real token, I added the two option and commented out the real token. Both options would work */}
const authJwt = async(req, res, next) => {
let tokenStr = req.headers["authorization"];
if (!tokenStr) {
  return res.status(401).send({
    message: "You have no access rights to perform this action. Token expected !"
  });
}

const splittedToken = tokenStr.split(' ');
if( splittedToken.length < 2) {
  return res.status(403).send({
    message: "The format of your token is not correct"
  });
}


     //Version with actual decoding
//  jwt.verify(splittedToken[1], JWT_SECRET, function (err, decoded) {
  
//     if (err){
//         return res.status(401).json({
//             message: "Unauthorized !"
//         });
//     }
//     console.log(decoded, "DECODED")
//    return  next()
//   });

// Version with the existing shared Bearer Token 
  const defaultToken = 'SkFabTZibXE1aE14ckpQUUxHc2dnQ2RzdlFRTTM2NFE2cGI4d3RQNjZmdEFITmdBQkE=';
  if( splittedToken[1] !== defaultToken ) {
    return res.status(401).send({
      message: "Unauthorized !"
    })
  } else {
    return next()
  }

};



export default authJwt
