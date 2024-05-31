import Search from "@/src/components/home/Search";
import StudentModal from "@/src/components/home/StudentModal";
import StudentList from "@/src/components/home/StudentsList";
import { colors } from "@/src/constants/colors";
import { useStudents } from "@/src/providers/StudentsProvider";
import { Students } from "@/src/services/fetchStudents";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import React, { useRef } from "react";
import {
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export default function Home() {
  const { setOpenFilterBox, studentSelected, setStudentSelected } =
    useStudents();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = ["1%", "35%", "78%"];

  const handleOpenBottomSheet = (student: Students) => {
    setStudentSelected(student);
    bottomSheetRef.current?.expand();
  };

  const touchableWithoutFeedback = () => {
    Keyboard.dismiss();
    setOpenFilterBox(false);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={touchableWithoutFeedback}>
        <>
          <Container>
            <View>
              <Title>InnovateTech</Title>
              <Search />
            </View>
            <StudentList openBottomSheet={handleOpenBottomSheet} />
          </Container>
          <Footer>
            <Logo source={require("@/assets/images/icons/icon.png")} />
          </Footer>
          <BottomSheet
            ref={bottomSheetRef}
            enablePanDownToClose
            handleIndicatorStyle={{ backgroundColor: "#0000" }}
            backgroundStyle={{ backgroundColor: "#0000" }}
            snapPoints={snapPoints}
            backdropComponent={(backdropProps) => (
              <BottomSheetBackdrop
                {...backdropProps}
                enableTouchThrough={true}
              />
            )}
          >
            <BottomSheetView>
              {studentSelected && <StudentModal />}
            </BottomSheetView>
          </BottomSheet>
        </>
      </TouchableWithoutFeedback>
    </>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 80px 20px 40px 20px;
`;

const Title = styled.Text`
  font-size: ${RFValue(24)}px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
`;

const Footer = styled.View`
  width: 100%;
  background-color: ${colors.main};
  display: flex;
  align-items: center;
  padding: 10px 0 ${Platform.OS === "ios" ? "30px" : "16px"};
`;

const Logo = styled(Image)`
  height: 50px;
  width: 50px;
`;
