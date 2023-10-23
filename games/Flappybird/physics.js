import Matter from "matter-js";
import { getPipeSizePosPair } from "./utils/random";
import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Physics = (entities, { touches, time, dispatch, currentPoints, prevPoints }) => {
    let engine = entities.physics.engine;
    let birdYVelocity = -5; // Default value
    let speed = -3; // Default speed

    if (currentPoints >= 3) {
        if (currentPoints >= 6) {
            // Increase speed when currentPoints is 6 or more
            speed -= 2; // Decrease speed by 2
        } else {
            // Increase speed when currentPoints is 3, 4, or 5
            speed -= 1; // Decrease speed by 1
        }
    }

    touches.filter(t => t.type === 'press').forEach(t => {
        Matter.Body.setVelocity(entities.Bird.body, {
            x: 0,
            y: birdYVelocity,
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
        Matter.Body.translate(entities[`ObstacleTop${index}`].body, { x: speed, y: 0 });
        Matter.Body.translate(entities[`ObstacleBottom${index}`].body, { x: speed, y: 0 });
    }

    Matter.Events.on(engine, 'collisionStart', (event) => {
        dispatch({ type: 'game_over' });
    });

    return entities;
};

export default Physics;
