import React, { Component } from 'react';
import MapView from 'react-native-maps';
import Search from '../Search'
import Directions from '../Directions'
import { View } from 'react-native';

export default class Map extends Component {
    state = {
        region: null,
        destination: null,
    }
    async componentDidMount() {
        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) => {
            this.setState({
              region: {
                latitude,
                longitude,
                latitudeDelta: 0.0143,
                longitudeDelta: 0.0134
              }
            }
            );
          }, //sucesso
          () => {}, //erro
          {
            timeout: 100000,
            enableHighAccuracy: true,
            maximumAge: 300000,
          }
        );
      }
    handleLocationSelected = (data, { geometry }) => {
        const {
          location: { lat: latitude, lng: longitude }
        } = geometry;
    
        this.setState({
          destination: {
            latitude,
            longitude,
            title: data.structured_formatting.main_text
          }
        });
      };

    render() {
        const { region, destination } = this.state
        return ( 
            <View style={{ flex: 1}}> 
                <MapView 
                    ref ={el => this.mapView = el}
                    style={{flex: 1}}
                    region= {region}
                    showsUserLocation
                    loadingEnabled
                >
                    { destination && (
                        console.log(destination, region),
                        <Directions
                            origin={region} 
                            destination={destination}
                            onReady = {result =>{
                               this.mapView.fitToCoordinates(result.coordinates);
                            }}
                        ></Directions>
                    )}
                </MapView>
                <Search onLocationSelected={this.handleLocationSelected}/>
            </View>
        );
    }
}
