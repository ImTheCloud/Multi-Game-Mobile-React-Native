import Matter from "matter-js";
import { getPipeSizePosPair } from "./utils/random";
import { Dimensions } from 'react-native'
const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const Physics = (entities, { touches, time, dispatch }) => {
    let engine = entities.physics.engine
    touches.filter(t => t.type === 'press')
        .forEach(t => {
            Matter.Body.setVelocity(entities.Bird.body, {
                x: 0,
                y: -5
            })
        })
        
    Matter.Engine.update(engine, time.delta)
    for (let index = 1; index <= 2; index++) {
        if (entities[`ObstacleTop${index}`].body.bounds.max.x <= 50 && !entities[`ObstacleTop${index}`].point) {
            entities[`ObstacleTop${index}`].point = true
            dispatch({ type: 'new_point' })
        }
        if (entities[`ObstacleTop${index}`].body.bounds.max.x <= 0) {
          const pipeSizePos = getPipeSizePosPair(windowWidth * 0.9);
          Matter.Body.setPosition(entities[`ObstacleTop${index}`].body, pipeSizePos.pipeTop.pos)
          Matter.Body.setPosition(entities[`ObstacleBottom${index}`].body, pipeSizePos.pipeBottom.pos)
          entities[`ObstacleTop${index}`].point = false
      }
        const speed = -3 
            //- time.delta / 10 - time.current / 100000; // Adjust the coefficient as needed
        Matter.Body.translate(entities[`ObstacleTop${index}`].body, { x: speed, y: 0 });
        Matter.Body.translate(entities[`ObstacleBottom${index}`].body, { x: speed, y: 0 });

        // Log the speed for debugging
        console.log(`Obstacle ${index} Speed: ${speed}`);

  }
  Matter.Events.on(engine, 'collisionStart', (event) => {
      dispatch({ type: 'game_over' })
  })
  return entities;
}
export default Physics