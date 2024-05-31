import { colors } from "@/src/constants/colors";
import { useStudents } from "@/src/providers/StudentsProvider";
import Checkbox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import * as Animatable from "react-native-animatable";
import styled from "styled-components/native";

interface FiltersProps {
  filterIsVisible: boolean;
}

export default function Filters({ filterIsVisible }: FiltersProps) {
  const { filtersSelected, setFiltersSelected } = useStudents();

  const [animationEnd, setAnimationEnd] = useState<string | undefined>(
    undefined
  );

  const handleFilter = (filter: string) => {
    if (filtersSelected.includes(filter)) {
      setFiltersSelected((prev) => prev.filter((item) => item !== filter));
    } else {
      setFiltersSelected((prev) => [...prev, filter]);
    }
  };

  useEffect(() => {
    if (filterIsVisible) {
      setAnimationEnd("zoomOut");
    }
  }, [filterIsVisible]);

  return (
    <Animatable.View
      animation={filterIsVisible ? "zoomIn" : animationEnd}
      duration={300}
      style={{
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        display: animationEnd === "zoomOut" ? "flex" : "none",
        position: "absolute",
        bottom: -130,
        right: 8,
        backgroundColor: "#fff",
        borderRadius: 8,
      }}
    >
      <FilterContainer>
        <Title>Genêro</Title>
        <InputController>
          <Checkbox
            value={filtersSelected.includes("male")}
            onValueChange={() => handleFilter("male")}
            color={colors.main}
          />
          <Text>Masculino</Text>
        </InputController>
        <InputController>
          <Checkbox
            value={filtersSelected.includes("female")}
            onValueChange={() => handleFilter("female")}
            color={colors.main}
          />
          <Text>Feminino</Text>
        </InputController>
      </FilterContainer>
    </Animatable.View>
  );
}

const FilterContainer = styled.View`
  width: 140px;
  height: 120px;
  padding: 16px;
`;

const Title = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${colors.blurInput};
  margin-bottom: 12px;
`;

const InputController = styled.View`
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-bottom: 12px;
  align-items: center;
`;
