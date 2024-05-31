import { colors } from "@/src/constants/colors";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  TextInput as RNTextInput,
  TextInputProps,
  View,
} from "react-native";
import styled from "styled-components/native";

interface StyledTextInputProps extends TextInputProps {
  focus: boolean;
}

interface InputProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setInputIsFocus?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Input({
  value,
  setValue,
  setInputIsFocus,
}: InputProps) {
  const [isFocus, setIsFocus] = useState(false);
  const borderColor = useRef(new Animated.Value(0)).current;

  const toggleInputFocus = () => {
    if (isFocus) {
      setIsFocus(false);
      if (setInputIsFocus) setInputIsFocus(false);
    } else {
      setIsFocus(true);
      if (setInputIsFocus) setInputIsFocus(true);
    }
  };

  useEffect(() => {
    Animated.timing(borderColor, {
      toValue: isFocus ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isFocus]);

  const borderColorInterpolation = borderColor.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.blurInput, colors.main],
  });

  return (
    <View>
      <AnimatedTextInput
        focus={isFocus}
        onFocus={toggleInputFocus}
        onBlur={toggleInputFocus}
        placeholder="Busca..."
        placeholderTextColor="#7d7d7d"
        value={value}
        onChangeText={setValue}
        style={{ borderColor: borderColorInterpolation } as any}
      />
    </View>
  );
}

const AnimatedTextInput = styled(
  Animated.createAnimatedComponent(RNTextInput)
)<StyledTextInputProps>`
  padding: 16px 24px;
  padding-right: 40px;
  border-radius: 8px;
  border-width: 1px;
  transition: background-color 0.3s ease;
`;
