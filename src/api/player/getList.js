// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------

import Player from "../../db/model/player";
import PlayerSkill from "../../db/model/playerSkill";
const {db} = require("../helpers")

// Get List of Players
// GET http://localhost:3000/api/player/
export default async (req, res) => {
  try {
    const players = await Player.findAll({
      include: [{model: db.PlayerSkill }]
  });


  return res.json(
    players
  );

  } catch(err){
    console.log(err, "ERROR")
    res.status(400).send({
      message: err.string()
    })
  }

}


