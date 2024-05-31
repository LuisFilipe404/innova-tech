import { colors } from "@/src/constants/colors";
import { useStudents } from "@/src/providers/StudentsProvider";
import { useState } from "react";
import styled from "styled-components/native";
import IconFilter from "../icons/IconFilter";
import IconSearch from "../icons/IconSearch";
import Filters from "../layout/Filters";
import Input from "../layout/Input";

export default function Search() {
  const [inputIsFocus, setInputIsFocus] = useState<boolean>(false);

  const { openFilterBox, searchParams, setOpenFilterBox, setSearchParams } =
    useStudents();

  return (
    <SearchContainer>
      <InputContainer>
        <Input
          value={searchParams}
          setValue={setSearchParams}
          setInputIsFocus={setInputIsFocus}
        />
        <IconSearchCentered>
          <IconSearch
            aria-label="Buscar"
            height={20}
            width={20}
            color={inputIsFocus ? colors.main : colors.blurInput}
          />
        </IconSearchCentered>
      </InputContainer>
      <FilterButtom
        aria-label="Filtros"
        onPress={() => setOpenFilterBox(!openFilterBox)}
      >
        <IconFilter color={colors.blurInput} height={24} width={24} />
      </FilterButtom>

      <Filters filterIsVisible={openFilterBox} />
    </SearchContainer>
  );
}

const SearchContainer = styled.View`
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
`;

const IconSearchCentered = styled.View`
  position: absolute;
  display: flex;
  justify-content: center;
  height: 100%;
  top: 0;
  right: 16px;
`;

const FilterButtom = styled.Pressable`
  padding: 12px 8px;
`;

const InputContainer = styled.View`
  flex: 1;
  display: relative;
`;
