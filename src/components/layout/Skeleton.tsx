import React from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";

const SkeletonLoading = ({
  width,
  height,
}: {
  width: number | string;
  height: number | string;
}) => {
  const [animation] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const interpolateColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["#f0f0f0", "#e0e0e0"],
  });

  return (
    <Container>
      <Animated.View
        style={[
          {
            width: width as any,
            height: height as any,
            borderRadius: 8,
          },
          {
            backgroundColor: interpolateColor,
          },
        ]}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: "center";
  align-items: "center";
  background-color: "#ffffff";
`;

export default SkeletonLoading;
