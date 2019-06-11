import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StatusBar } from 'react-native';

import api from '../../services/api';
import { StackActions, NavigationActions } from 'react-navigation';

import {
  Container,
  Logo,
  SuccessMessage,
  Input,
  ErrorMessage,
  Button,
  ButtonText,
  SignInLink,
  SignInLinkText,
  ScrollView,
  Text,
} from './styles';

export default class SignUp extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
      goBack: PropTypes.func,
    }).isRequired,
  };

  handleBackToLoginPress = () => {
    this.props.navigation.goBack();
  };

  state = {
    username: '',
    last_name : '',
    document : '',
    email: '',
    password: '',
    phone: '',
    zip: '',
    address: '',
    number: '',
    complement: 'NA',
    district: '',
    city: '',
    state: '',
    error: '',
    success: '',
  };

  handleZipChange = async (zip) => {
    this.setState({zip});
    if(zip.length > 7){
      try {
        let dados = await api.get('api/v1/zip/' + zip);
        if (dados.data.error){
          this.setState({ error: 'CEP não encontrado' });  
        }
        this.setState({ 
            zip : dados.data.address.zip,
            address : dados.data.address.address,
            city: dados.data.address.city,
            state: dados.data.address.state,
            district: dados.data.address.district,
        }); 
        if(dados.data.address.complement !== ''){
          this.setState({ complement : dados.data.address.complement});  
        }else {
          this.setState({ complement : 'NA'});    
        }
      } catch (_err) {
        this.setState({ error: 'Erro ao consultar o CEP!' });
      } 
    }
  };

  handleSignUpPress = async () => {
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      this.setState({ error: 'Preencha todos os campos para continuar!' }, () => false);
    } else {
      try {
        let dados = await api.post('api/v1/courier', {
          first_name: this.state.username,
          last_name: this.state.last_name,
          document: this.state.document,
          email: this.state.email,
          password: this.state.password,
          phone: this.state.phone,
          address: { 
            zip : this.state.zip,
            address: this.state.address,
            type: 1,
            number: this.state.number,
            complement: this.state.complement,
            district: this.state.district,
            city: this.state.city,
            state: this.state.state
          } 
        });

        this.setState({ success: 'Usuario Criado com sucesso!' , error: '' });

        setTimeout(this.goToLogin, 2500);
      } catch (_err) {
        this.setState({ error: 'Houve um problema com o cadastro, verifique os dados preenchidos!' });
      }
    }
  };

  goToLogin = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'SignIn' }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <Container>
        <StatusBar hidden />
        <Logo source={require('../../images/softlog.png')} resizeMode="contain" />
        {this.state.success.length !== 0 && <SuccessMessage>{this.state.success}</SuccessMessage>}
        <ScrollView >
        <Text>Dados Pessoais</Text>
        <Input
          placeholder="Primeiro nome"
          value={this.state.username}
          onChangeText={(username) => this.setState({username})}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Segundo nome"
          value={this.state.last_name}
          onChangeText={(last_name) => this.setState({last_name})}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="CPF"
          value={this.state.document}
          onChangeText={(document) => this.setState({document})}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text>Contato</Text>
        <Input
          placeholder="Telefone"
          value={this.state.phone}
          onChangeText={(phone) => this.setState({phone})}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Endereço de e-mail"
          value={this.state.email}
          onChangeText={(email) => this.setState({email})}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text>Endereço</Text>
        <Input
          placeholder="CEP"
          value={this.state.zip}
          onChangeText={this.handleZipChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Endereço"
          value={this.state.address}
          onChangeText={(address) => this.setState({address})}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Bairro"
          value={this.state.district}
          onChangeText={(district) => this.setState({district})}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Número"
          value={this.state.number}
          onChangeText={(number) => this.setState( {number})}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Complemento"
          value={this.state.complement}
          onChangeText={(complement) => this.setState({complement})}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Input
          placeholder="Cidade"
          value={this.state.city}
          onChangeText={(city) => this.setState({city})}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Estado"
          value={this.state.state}
          onChangeText={(state) => this.setState({state})}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text>Senha</Text>
        <Input
          placeholder="Senha"
          value={this.state.password}
          onChangeText={(password) => this.setState({password})}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
        </ScrollView>
    
        {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}
        <Button onPress={this.handleSignUpPress}>
          <ButtonText>Criar conta</ButtonText>
        </Button>
        <SignInLink onPress={this.handleBackToLoginPress}>
          <SignInLinkText>Voltar ao login</SignInLinkText>
        </SignInLink>
      </Container>
    );
  }
}
