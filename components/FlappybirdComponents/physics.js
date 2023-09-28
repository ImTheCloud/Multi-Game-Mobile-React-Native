import Matter from "matter-js";
import { getPipeSizePosPair } from "./utils/random";
import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

let obstacleSpeed = -3; // Vitesse de départ des obstacles
let previousScore = 0; // Score précédent

const Physics = (entities, { touches, time, dispatch }) => {
  let engine = entities.physics.engine;

  touches.filter(t => t.type === 'press').forEach(t => {
    Matter.Body.setVelocity(entities.Bird.body, {
      x: 0,
      y: -5
    });
  });

  Matter.Engine.update(engine, time.delta);

  for (let index = 1; index <= 2; index++) {
    if (entities[`ObstacleTop${index}`].body.bounds.max.x <= 50 && !entities[`ObstacleTop${index}`].point) {
      entities[`ObstacleTop${index}`].point = true;
      dispatch({ type: 'new_point' });
    }

    if (entities[`ObstacleTop${index}`].body.bounds.max.x <= 0) {
      const pipeSizePos = getPipeSizePosPair(windowWidth * 0.9);
      Matter.Body.setPosition(entities[`ObstacleTop${index}`].body, pipeSizePos.pipeTop.pos);
      Matter.Body.setPosition(entities[`ObstacleBottom${index}`].body, pipeSizePos.pipeBottom.pos);
      entities[`ObstacleTop${index}`].point = false;
    }

    Matter.Body.translate(entities[`ObstacleTop${index}`].body, { x: obstacleSpeed, y: 0 });
    Matter.Body.translate(entities[`ObstacleBottom${index}`].body, { x: obstacleSpeed, y: 0 });
  }

  Matter.Events.on(engine, 'collisionStart', (event) => {
    dispatch({ type: 'game_over' });
  });

  const currentScore = entities.Bird.point;
  if (currentScore !== previousScore) {
    // Le score a changé
    if (currentScore % 5 === 0) {
      // Le score est un multiple de 5, augmentez la vitesse
      obstacleSpeed *= 2;
    }
    previousScore = currentScore;
  }

  return entities;
};

export default Physics;
