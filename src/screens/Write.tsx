import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { useDB } from '../hooks/useDB';
import colors from '../styles/colors';
import { feelingSchemaProps } from '../utils/interface';

const Container = styled.View`
  flex: 1;
  background-color: ${colors.bgColor};
  padding: 0 30px;
`;

const Title = styled.Text`
  color: ${colors.textColor};
  margin: 50px 0px;
  text-align: center;
  font-size: 28px;
  font-weight: 500;
`;

const TextInput = styled.TextInput`
  background-color: white;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 18px;
  box-shadow: 1px 1px 3px rgba(41, 30, 95, 0.2);
`;

const Btn = styled.TouchableOpacity`
  width: 100%;
  margin-top: 20px;
  background-color: ${colors.btnColor};
  padding: 10px 20px;
  border-radius: 20px;
  align-items: center;
  box-shadow: 1px 1px 3px rgba(41, 30, 95, 0.2);
`;

const BtnText = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 18px;
`;

const Emotions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Emotion = styled.TouchableOpacity<{ selected: boolean }>`
  background-color: white;
  box-shadow: 1px 1px 3px rgba(41, 30, 95, 0.2);
  padding: 10px;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${({ selected }) =>
    selected ? 'rgba(41, 30, 95, 1);' : 'transparent'};
`;
const EmotionText = styled.Text``;

const emotions = ['😀', '😷', '😍', '🙄', '😥', '🤐', '😡'];

export default function Write({ navigaton: { goBack } }: any) {
  const realm: feelingSchemaProps | any = useDB();
  const [selectedEmotion, setEmotion] = useState('');
  const [feelings, setFeelings] = useState('');
  const onChangeText = (text: string) => {
    setFeelings(text);
  };
  const onEmotionPress = (emotion: string) => {
    setEmotion(emotion);
  };
  const onSubmit = () => {
    if (selectedEmotion === '' || feelings === '') {
      return Alert.alert('Please complete form.');
    }
    realm.write(() => {
      realm.create('Feeling', {
        _id: Date.now(),
        emotion: selectedEmotion,
        message: feelings,
      });
    });
    goBack();
  };
  console.log(selectedEmotion, feelings);
  return (
    <Container>
      <Title>How do you feel now?</Title>
      <Emotions>
        {emotions.map((item, index) => (
          <Emotion
            selected={item === selectedEmotion}
            onPress={() => onEmotionPress(item)}
            key={index}
          >
            <EmotionText>{item}</EmotionText>
          </Emotion>
        ))}
      </Emotions>
      <TextInput
        returnKeyType="done"
        onSubmitEditing={onSubmit}
        onChangeText={onChangeText}
        value={feelings}
        placeholder="Write your feelings..."
      />
      <Btn onPress={onSubmit}>
        <BtnText>Save</BtnText>
      </Btn>
    </Container>
  );
}
