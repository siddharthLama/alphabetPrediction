import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PickImage from './screens/camera';
import React from 'react';

export default class app extends React.Component {
render() {
  return (<PickImage/>)
}
}
