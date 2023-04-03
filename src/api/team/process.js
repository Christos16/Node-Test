// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK

import { getQuery, isValid } from "../../queries/sqlQueries";

// ---------------------------------------------------------------------------------------------
const {db} = require("../helpers")

export default async (req, res) => {
const teamRequest = req.body;
// Checking if there is the same request multiple times to return an error
const foundDuplicateName = teamRequest.find((player, index) =>{
  return teamRequest.find((x, i)=> (x.position === player.position) && (x.mainSkill === player.mainSkill) && index !== i  )
   })
if(foundDuplicateName){
  return res.status(500).json({
    message: "You cannot send a request with the same position and skill combination multiple times"
});
}
try {
  let players = await db.sequelize.query(getQuery(teamRequest));
  players = players[0];
  const result = [];

  for (let i = 0; i < players.length; i++){
    let playerSkill = await db.PlayerSkill.findAll({
      where: {playerId: players[i].id}
    });
    playerSkill = playerSkill.map(skill => skill.dataValues);
    result.push({
      ...players[i],
      playerSkill
    })
  }

 

if(!isValid(result, teamRequest)){
  return res.status(400).send("Insufficient number of players for some positions");
}

let finalResult = [];

{/* Logic to return the number of players based on numberOfPlayers and performing the filtering on skills. This could be refactored in a cleaner version of course.  */}
for (const tr of teamRequest){
  const trPlayers = result
  .filter(x => x.position === tr.position)
  .sort((a, b) => {
    const a_skill = a.playerSkill.find(x => x.skill === tr.mainSkill)
    const b_skill = a.playerSkill.find(x => x.skill === tr.mainSkill)

    if(a_skill && b_skill) {
      return b_skill.value - a_skill.value;
    } else if(a_skill && !b_skill) {
      return 1;
    } else if(!a_skill && b_skill) {
      return -1;
    } else {
      Array.prototype.max = function() {
        return Math.max.apply(null, this);
      };

      const a_max_skill = a.playerSkill.map(x => x.value).max();
      const b_max_skill = b.playerSkill.map(x => x.value).max();

      return b_max_skill - a_max_skill;
    }
  })
  .slice(0, tr.numberOfPlayers);

  finalResult = [...finalResult, ...trPlayers]}


  // Removing duplicates based on request for multiple idential users
const filteredFinalResult = finalResult.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i)

return res.status(200).send(filteredFinalResult);

} catch(e){
return res.status(500).send(e)
}
}
