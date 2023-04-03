// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------
const {checkRequestBody, db} = require("../helpers")


// POST http://localhost:3000/api/player
export default async (req, res) => {
const {name, position, playerSkills} = req.body
  const error = checkRequestBody(req.body)
  if(error){
    return res.status(400).send({
      message:error
    })
  }
  try {
    const result = await db.sequelize.transaction(async (t) => {
      const createdPlayer = await db.Player.create(
        {
          name,
          position
        },
        {transation: t}
      )

      //Skills Part
      const createdSkills = [];
      for (const skill of playerSkills) {
        const createdSkill = await db.PlayerSkill.create({
          playerId: createdPlayer.id,
          skill: skill.skill,
          value: skill.value
        }, {
          transation: t
        })
        createdSkills.push(createdSkill);
      }
      return {
        ...createdPlayer,
        playerSkills: createdSkills
      }

    })
    return res.send({...result?.dataValues, playerSkills: result.playerSkills});
  } catch(err) {
    res.status(400).send({
      message:err.toString()
    })

  }

}
