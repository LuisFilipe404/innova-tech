import { colors } from "@/src/constants/colors";
import { getGenderInPortuguese } from "@/src/utils/getGender";
import { format } from "date-fns";
import { Image } from "expo-image";
import { View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import styled from "styled-components/native";

interface StudentCardProps {
  picture: string;
  name: string;
  gender: "male" | "female";
  birth: string;
}

export default function StudentCard(props: StudentCardProps) {
  return (
    <Card>
      <Avatar source={{ uri: props.picture }} />
      <StudentInfo>
        <View>
          <Name ellipsizeMode="tail" numberOfLines={1}>
            {props.name}
          </Name>
        </View>
        <Description>
          <DescriptionText>
            {getGenderInPortuguese(props.gender)}
          </DescriptionText>
          <DescriptionText>{format(props.birth, "dd/MM/yyyy")}</DescriptionText>
        </Description>
      </StudentInfo>
    </Card>
  );
}

const Card = styled.View`
  display: "flex";
  height: auto;
  border: 1px solid ${colors.border};
  border-radius: 8px;
  flex-direction: row;
  gap: 24px;
  padding: 16px;
  margin: 12px 0;
`;

const Avatar = styled(Image)`
  width: ${wp(20)}px;
  height: ${wp(20)}px;
  border-radius: 100px;
`;

const StudentInfo = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  gap: 16px;
`;

const Name = styled.Text`
  font-size: ${RFValue(18)}px;
  /* font-size: 18px; */
  font-weight: bold;
  color: "black";
`;

const Description = styled.View`
  justify-content: space-between;
  flex-direction: row;
  gap: 12px;
`;

const DescriptionText = styled.Text`
  font-size: ${RFValue(14)}px;
`;
