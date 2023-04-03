





export const getQuery = (teamRequest) => {
    const positions = teamRequest.map(player => `SELECT * FROM Players WHERE position = "${player.position}" `);
    return positions.join(' UNION ')
}

export const isValid = (players, teamReq) => {
    if(players.length < 1)
        return false;

        for (const tr of teamReq){
            let playersPosition = players.filter(player => player.position === tr.position);

            if(playersPosition.length < tr.numberOfPlayers){
return false
            }
        }
        return true
    
}

