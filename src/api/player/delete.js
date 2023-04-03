// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------
const {db} = require("../helpers")


export default async (req, res) => {
const playerId = parseInt(req.params.id)

try {
  const result = await db.sequelize.transaction(async(t) =>{
    const deletedPlayer = await db.Player.destroy({
      where: {id: playerId}
    })


    const deletedSkills = await db.PlayerSkill.destroy({
      where: {playerId}
    });

    return {
      ...deletedPlayer,
      ...deletedSkills
    }

  })

  return res.send({message: "Player succesfully deleted"})
} catch(error) {
  return res.status(400).send(error)
}


}
