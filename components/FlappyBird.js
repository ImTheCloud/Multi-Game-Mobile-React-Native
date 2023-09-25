import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class FlappyBird extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birdBottom: 100,
      birdLeft: 50,
      gravity: 3,
      isGameOver: false,
      obstacleLeft: screenWidth,
      obstacleWidth: 50,
      gapHeight: 200, // Espace entre les obstacles
    };
  }

  componentDidMount() {
    this.birdInterval = setInterval(this.fall, 30);
    this.obstacleInterval = setInterval(this.moveObstacle, 30);
  }

  componentWillUnmount() {
    clearInterval(this.birdInterval);
    clearInterval(this.obstacleInterval);
  }

  fall = () => {
    if (!this.state.isGameOver) {
      const newBottom = this.state.birdBottom - this.state.gravity;
      if (newBottom > 0) {
        this.setState({ birdBottom: newBottom });
      } else {
        this.gameOver();
      }
    }
  };

  jump = () => {
    if (!this.state.isGameOver) {
      this.setState({ birdBottom: this.state.birdBottom + 50 });
    }
  };

  moveObstacle = () => {
    if (!this.state.isGameOver) {
      let newObstacleLeft = this.state.obstacleLeft - 5; // Ajustez la vitesse de déplacement ici
      if (newObstacleLeft < -this.state.obstacleWidth) {
        // Réinitialisez l'obstacle lorsqu'il sort de l'écran
        newObstacleLeft = screenWidth;
      }
      this.setState({ obstacleLeft: newObstacleLeft });
    }
  };

  checkCollision = () => {
    const { birdBottom, birdLeft, obstacleLeft, gapHeight } = this.state;
    if (
      birdBottom < gapHeight / 2 ||
      birdBottom > screenHeight - gapHeight / 2 ||
      (birdLeft + 50 > obstacleLeft &&
        birdLeft < obstacleLeft + this.state.obstacleWidth)
    ) {
      this.gameOver();
    }
  };

  handleScreenPress = () => {
    this.jump();
  };

  gameOver = () => {
    clearInterval(this.birdInterval);
    clearInterval(this.obstacleInterval);
    this.setState({ isGameOver: true });
  };

  restartGame = () => {
    this.setState({
      birdBottom: 100,
      isGameOver: false,
      obstacleLeft: screenWidth,
    });
    this.birdInterval = setInterval(this.fall, 30);
    this.obstacleInterval = setInterval(this.moveObstacle, 30);
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.handleScreenPress}>
        <View style={styles.container}>
          <View style={[styles.bird, { bottom: this.state.birdBottom, left: this.state.birdLeft }]}></View>
          <View
            style={[
              styles.obstacle,
              { left: this.state.obstacleLeft, width: this.state.obstacleWidth },
              { top: 0, height: this.state.birdBottom - this.state.gapHeight / 2 },
            ]}
          ></View>
          <View
            style={[
              styles.obstacle,
              { left: this.state.obstacleLeft, width: this.state.obstacleWidth },
              { bottom: 0, height: screenHeight - this.state.birdBottom - this.state.gapHeight / 2 },
            ]}
          ></View>
          {this.state.isGameOver ? (
            <TouchableOpacity style={styles.restartButton} onPress={this.restartGame}>
              <Text style={styles.gameOverText}>Game Over - Restart</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
    position: 'relative',
  },
  bird: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: 'red',
  },
  obstacle: {
    position: 'absolute',
    backgroundColor: 'green',
  },
  restartButton: {
    position: 'absolute',
    top: screenHeight / 2 - 18,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FlappyBird;
