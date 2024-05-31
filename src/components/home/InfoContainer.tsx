import { ViewProps } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface InfoContainerProps extends ViewProps {
  label: string;
  value?: string;
  ellipse?: boolean;
}

export default function InfoContainer({
  label,
  value,
  ellipse = false,
  ...props
}: InfoContainerProps) {
  return (
    <Container {...props}>
      <Label>{label}</Label>
      <Value ellipsizeMode={"tail"} numberOfLines={ellipse ? 1 : 10}>
        {value}
      </Value>
    </Container>
  );
}

const Container = styled.View`
  margin-top: 24px;
`;

const Label = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 500;
`;

const Value = styled.Text`
  margin-top: 2px;
  font-size: ${RFValue(16)}px;
  font-weight: 500;
`;
