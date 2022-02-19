import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../styles/colors';
import { FlatList, LayoutAnimation, TouchableOpacity } from 'react-native';
import { useDB } from '../hooks/useDB';
import { feelingSchemaProps } from '../utils/interface';
import { AdMobBanner } from 'expo-ads-admob';
const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 100px 30px 0px 30px;
  background-color: ${colors.bgColor};
`;

const Title = styled.Text`
  color: ${colors.textColor};
  font-size: 38px;
  margin-bottom: 100px;
  width: 100%;
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
  z-index: 5;
  box-shadow: 1px 1px 3px rgba(41, 30, 95, 0.2);
`;

const Record = styled.View`
  background-color: ${colors.cardColor};
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  border-radius: 10px;
`;

const Emotion = styled.Text`
  font-size: 24px;
  margin-right: 10px;
`;
const Message = styled.Text`
  font-size: 18px;
`;
const Separator = styled.View`
  height: 10px;
`;

export default function Home({ navigation: { navigate } }: any) {
  const realm: any = useDB();
  const [feelings, setFeelings] = useState<feelingSchemaProps | any>([]);
  useEffect(() => {
    feelings.addListener((feelings, changes) => {
      LayoutAnimation.spring();
      setFeelings(feelings.sorted('_id', true));
    });
    return () => {
      feelings.removeAllListeners();
    };
  }, []);
  const onPress = (id: number) => {
    realm.write(() => {
      const feeling = realm.objectForPrimaryKey('Feelings', id);
      realm.delete(feeling);
    });
  };
  return (
    <Container>
      <Title>My journal</Title>
      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-3940256099942544/6300978111"
      />
      <FlatList
        style={{ marginVertical: 50, width: '100%' }}
        data={feelings}
        contentContainerStyle={{ paddingVertical: 10 }}
        ItemSeparatorComponent={Separator}
        keyExtractor={(feelings) => feelings._id + ''}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPress(item._id)}>
            <Record>
              <Emotion>{item.emotion}</Emotion>
              <Message>{item.message}</Message>
            </Record>
          </TouchableOpacity>
        )}
      />
      <Btn onPress={() => navigate('Write')}>
        <Ionicons name="add" color="white" size={40} />
      </Btn>
    </Container>
  );
}
