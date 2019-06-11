import React, { Component } from 'react';

import Map from '../../components/Map';

import api from '../../services/api';

import { Container , Button, ButtonText } from './styles';


export default class Main extends Component {
  static navigationOptions = {
    header: null,
  };

  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  }; 

  render() { 
    return(
      <Container>
        <Map/>
        
      </Container>
      ); 
  }
}

