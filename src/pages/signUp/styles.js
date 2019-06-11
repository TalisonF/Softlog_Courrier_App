import styled from 'styled-components';

const Container = styled.View`
  flex: 1;
  alignItems: center;
  justifyContent: center;
  backgroundColor: #f5f5f5;
`;

const Logo = styled.Image`
  height: 20%;
  marginBottom: 5px;
`;

const SuccessMessage = styled.Text`
  textAlign: center;
  color: #08a092;
  fontSize: 16px;
  marginBottom: 15px;
  marginHorizontal: 20px;
`;

const Text = styled.Text`
  textAlign: center;
  color: #1E90FF;
  fontWeight: bold;
  fontSize: 16px;
`;

const Input = styled.TextInput`
  paddingHorizontal: 20px;
  paddingVertical: 15px;
  borderRadius: 5px;
  backgroundColor: #fff;
  alignSelf: stretch;
  marginBottom: 7px;
  marginHorizontal: 20px;
  marginVertical:5px;
  fontSize: 16px;
`;

const ErrorMessage = styled.Text`
  textAlign: center;
  color: #ce2029;
  fontSize: 16px;
  marginBottom: 15px;
  marginHorizontal: 20px;
`;

const Button = styled.TouchableHighlight`
  padding: 20px;
  borderRadius: 5px;
  backgroundColor: #1E90FF;
  alignSelf: stretch;
  margin: 5px;
  marginHorizontal: 5px;
`;

const ScrollView = styled.ScrollView`
  padding: 1px;
  alignSelf: stretch;
  margin: 1px;
  marginHorizontal: 5px;
`;

const ButtonText = styled.Text`
  color: #fff;
  fontWeight: bold;
  fontSize: 16px;
  textAlign: center;
`;

const SignInLink = styled.TouchableHighlight`
  padding: 5px;
  marginTop: 10px;
  marginBottom: 10px;
`;

const SignInLinkText = styled.Text`
  color: #999;
  fontWeight: bold;
  fontSize: 16px;
  textAlign: center;
`;

export {
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
  Text
};
