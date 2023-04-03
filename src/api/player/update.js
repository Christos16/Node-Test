// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------
const {checkUpdateRequest, db} = require("../helpers")

export default async (req, res) => {
      const playerId = parseInt(req.params.id);
      const {name, position, playerSkills} = req.body;
      //Checking that only the correct position or playerSkills are being added or updated
      const error = checkUpdateRequest(req.body)
      if(error){
        return res.status(400).send({
          message:error
        })
      }
      try {
        const result = await db.sequelize.transaction(async (t) => {
          const updatedPlayer = await db.Player.update(
            {
              name,
              position,
            },
            { where: { id: playerId } },
            { transaction: t }
          );
    
          const deletedSkills = await db.PlayerSkill.destroy({
            where: { playerId },
          });
    
          const createdSkills = [];
          for (const skill of playerSkills) {
            const createdSkill = await db.PlayerSkill.create(
              {
                playerId: playerId,
                skill: skill.skill,
                value: skill.value,
              },
              { transaction: t }
            );
            createdSkills.push(createdSkill);
          }
    
          const player = await db.Player.findByPk(playerId);
    
          return {
            ...player.dataValues,
            playerSkills: createdSkills,
          };
        });
    
        return res.send(result);
      } catch(err) {
        res.status(400).send({
          message:err.toString()
        })
      }
}
