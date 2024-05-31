import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import styled from "styled-components/native";
import StudentsProvider from "../providers/StudentsProvider";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <StudentsProvider>
      <GestureHandlerRootView>
        <MainContainer>
          <StatusBar backgroundColor="white" style="dark" animated />
          <Slot />
        </MainContainer>
      </GestureHandlerRootView>
    </StudentsProvider>
  );
}

const MainContainer = styled.View`
  flex: 1;
`;
