import React, { useState, useRef } from 'react';
import { View, StyleSheet, PanResponder, Text, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function DrawingGame() {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState('');
  const panResponder = useRef(null);

  const handleTouchMove = (e, gestureState) => {
    const { moveX, moveY } = gestureState;
    const newPath = currentPath + ` L${moveX} ${moveY}`;
    setCurrentPath(newPath);
  };

  const handleTouchStart = (e, gestureState) => {
    const { moveX, moveY } = gestureState;
    const newPath = `M${moveX} ${moveY}`;
    setCurrentPath(newPath);
  };

  const handleTouchEnd = () => {
    if (currentPath) {
      setPaths([...paths, currentPath]);
    }
    setCurrentPath('');
  };

  const clearCanvas = () => {
    setPaths([]);
  };

  panResponder.current = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: handleTouchStart,
    onPanResponderMove: handleTouchMove,
    onPanResponderRelease: handleTouchEnd,
    onPanResponderTerminate: handleTouchEnd,
  });

  return (
    <View style={styles.container}>
      <Svg width={300} height={300} {...panResponder.panHandlers}>
        {paths.map((path, index) => (
          <Path key={index} d={path} stroke="#000" strokeWidth={2} />
        ))}
        {currentPath && <Path d={currentPath} stroke="#000" strokeWidth={2} />}
      </Svg>
      <TouchableOpacity style={styles.clearButton} onPress={clearCanvas}>
        <Text style={{ color: 'white' }}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
});
