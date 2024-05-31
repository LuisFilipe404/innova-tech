import { colors } from "@/src/constants/colors";
import { useStudents } from "@/src/providers/StudentsProvider";
import { getGenderInPortuguese } from "@/src/utils/getGender";
import { format } from "date-fns";
import { Image } from "expo-image";
import { View } from "react-native-animatable";
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP } from "react-native-responsive-screen";
import styled from "styled-components/native";
import InfoContainer from "./InfoContainer";

export default function StudentModal() {
  const { studentSelected } = useStudents();

  return (
    <ModalContainer>
      <View style={{ height: widthPercentageToDP(20) }}></View>
      <AvatarWrapper>
        <Avatar source={studentSelected?.picture.large} />
      </AvatarWrapper>
      <Content
        style={{
          elevation: 6,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.4,
          shadowRadius: 6,
          borderTopColor: colors.main,
          borderTopWidth: 4,
        }}
      >
        <Name
          ellipsizeMode="tail"
          numberOfLines={1}
        >{`${studentSelected?.name.title} ${studentSelected?.name.first} ${studentSelected?.name.last}`}</Name>
        <Id>{studentSelected?.id.value}</Id>
        <InfoContainer label="Email" value={studentSelected?.email} ellipse />
        <GridCols2>
          <InfoContainer
            label="Gênero"
            value={getGenderInPortuguese(studentSelected?.gender!)}
          />
          <InfoContainer
            style={{ flexBasis: "40%" }}
            label="Nascimento"
            value={format(studentSelected?.dob.date!, "dd/MM/yyyy")}
          />
        </GridCols2>
        <GridCols2>
          <InfoContainer label="Telefone" value={studentSelected?.phone} />
          <InfoContainer
            style={{ flexBasis: "40%" }}
            label="Nacionalidade"
            ellipse
            value={studentSelected?.location.country}
          />
        </GridCols2>
        <InfoContainer
          label="Endereço"
          ellipse
          value={`${studentSelected?.location.street.name}, ${studentSelected?.location.street.number}`}
        />
      </Content>
    </ModalContainer>
  );
}

const ModalContainer = styled.View`
  height: "100%";
`;

const AvatarWrapper = styled(View)`
  justify-content: center;
  display: flex;
  flex-direction: row;
  position: relative;
  height: 100px;
  position: absolute;
  z-index: 10;
  left: 50%;
`;

const Avatar = styled(Image)`
  width: ${widthPercentageToDP(40)}px;
  height: ${widthPercentageToDP(40)}px;
  border-radius: ${widthPercentageToDP(20)}px;
  position: absolute;
  z-index: 10;
  background-color: ${colors.main};
  border: 4px solid ${colors.main};
`;

const Content = styled.View`
  background-color: #fff;
  width: 100%;
  height: 100%;
  padding-top: ${widthPercentageToDP(20) + 30}px;
  padding-left: 50px;
  padding-right: 50px;
`;

const Name = styled.Text`
  text-align: center;
  font-size: ${RFValue(20)}px;
  font-weight: bold;
`;

const Id = styled.Text`
  text-align: center;
  color: ${colors.gray};
`;

const GridCols2 = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  gap: 12px;
`;
