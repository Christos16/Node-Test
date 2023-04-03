import database from "../db/model/index"
import sequelize from '../db';
const { Sequelize } = require('sequelize');

let db = {...database}

db.sequelize = sequelize;
db.Sequelize = Sequelize;


const positionTypes = ['defender', 'midfielder', 'forward'];
const skillTypes = ['defense', 'attack', 'speed', 'strength', 'stamina']
const skillValueRange = [0, 100];

const checkRequestBody = (body) => {
    const {name, position, playerSkills} = body;
    let error = null;
    if(!name || name.length ===0){
        error = 'Please provide a name';
    } else if(!position || !positionTypes.includes(position)){
        error = "Please provide valid position";
    } else {
        
        if(!playerSkills || !Array.isArray(playerSkills) || playerSkills.length === 0){
        error = "Please provide valid playerSkills"
    } else {
        for(let i = 0; i < playerSkills.length; i++){
            const item = playerSkills[i];
            if(!item.skill || !skillTypes?.includes(item.skill)){
                error = `Please provide the valid skill in field in ${i}th player skill`;
                break;
            } 
            else if(!item.value || item.value < skillValueRange[0] || item.value > skillValueRange[1]){
                error = `Please provide the valid value field in ${id}th player skill`;
            }
        
        }
    }
}
return error;
}

const checkUpdateRequest = (body) => {
    const {name, position, playerSkills} = body;
    let error = null;
    if(!name || name.length ===0){
        error = 'Please provide a name';
    } else if(!position || !positionTypes.includes(position)){
        error = "Please provide valid position";
    } else {
        if(playerSkills && !Array.isArray(playerSkills) && playerSkills.length === 0){
            error = "Please provide valid playerSkills"
        } else if(playerSkills && Array.isArray(playerSkills) && playerSkills.length > 0) {
            for(let i = 0; i < playerSkills.length; i++){
                const item = playerSkills[i];
                if(!item.skill || !skillTypes?.includes(item.skill)){
                    error = `Please provide the valid skill in field in ${i}th player skill`;
                    break;
                } 
                else if(!item.value || item.value < skillValueRange[0] || item.value > skillValueRange[1]){
                    error = `Please provide the valid value field in ${id}th player skill`;
                }
            }
        }
}
return error;
}



module.exports = {
    checkRequestBody,
    db,
    checkUpdateRequest
}