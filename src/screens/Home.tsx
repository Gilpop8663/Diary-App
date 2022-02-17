import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../styles/colors';
const Container = styled.View`
  flex: 1;
  padding: 100px 50px 0px 50px;
  background-color: ${colors.bgColor};
`;

const Title = styled.Text`
  color: ${colors.textColor};
  font-size: 38px;
  margin-bottom: 100px;
`;

const Btn = styled.TouchableOpacity`
  position: absolute;
  right: 50px;
  bottom: 50px;
  width: 80px;
  height: 80px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.btnColor};
  border-radius: 40px;
  elevation: 5;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
`;

export default function Home({ navigation: { navigate } }) {
  return (
    <Container>
      <Title>My journal</Title>
      <Btn onPress={() => navigate('Write')}>
        <Ionicons name="add" color="white" size={40} />
      </Btn>
    </Container>
  );
}