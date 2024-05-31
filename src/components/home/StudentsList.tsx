import { colors } from "@/src/constants/colors";
import { useStudents } from "@/src/providers/StudentsProvider";
import { Students } from "@/src/services/fetchStudents";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import SkeletonLoading from "../layout/Skeleton";
import StudentCard from "./StudentCard";

export default function StudentList({
  openBottomSheet,
}: {
  openBottomSheet: (student: Students) => void;
}) {
  const { students, searchParams, fetching, filtersSelected, nextPage } =
    useStudents();
  const [initialLoad, setInitialLoad] = useState(false);

  const [filteredStudents, setFilteredStudents] = useState<Students[]>(
    students || []
  );

  const handleInitialLoad = () => {
    if (!initialLoad) {
      setInitialLoad(true);
    }
  };

  const filterStudents = useCallback(() => {
    let studentsAux = students;

    if (filtersSelected && filtersSelected.length > 0) {
      studentsAux = studentsAux.filter((student) =>
        filtersSelected.includes(student.gender)
      );
    }

    if (searchParams && searchParams !== "") {
      studentsAux = studentsAux.filter(
        (student) =>
          student.name.first
            .toLowerCase()
            .includes(searchParams.toLowerCase()) ||
          student.name.last.toLowerCase().includes(searchParams.toLowerCase())
      );
    }

    setFilteredStudents(studentsAux);
  }, [searchParams, students, filtersSelected]);

  useEffect(() => {
    filterStudents();
  }, [searchParams, filtersSelected, students]);

  return (
    <Container>
      <FlatList
        ListEmptyComponent={
          filteredStudents.length === 0 && initialLoad ? (
            <NotFound>
              <Text>Nenhum aluno foi encontrado :(</Text>
            </NotFound>
          ) : (
            <SkeletonList>
              {Array.from({ length: 3 }).map((_, index) => (
                <SkeletonLoading key={index} width={"100%"} height={120} />
              ))}
            </SkeletonList>
          )
        }
        data={filteredStudents}
        keyExtractor={(student) => student.login.uuid}
        onEndReached={() => {
          if (initialLoad) nextPage();
        }}
        onEndReachedThreshold={1}
        ListFooterComponent={
          searchParams ? null : (
            <LoadingContainer>
              <ActivityIndicator size="large" color={colors.main} />
              <Text>CARREGANDO MAIS</Text>
            </LoadingContainer>
          )
        }
        onContentSizeChange={handleInitialLoad}
        renderItem={({ item: student }) => (
          <TouchableOpacity
            onPress={() => openBottomSheet(student)}
            activeOpacity={0.6}
          >
            <StudentCard
              picture={student.picture.medium}
              name={`${student.name.title} ${student.name.first} ${student.name.last}`}
              gender={student.gender as "male" | "female"}
              birth={student.dob.date}
            />
          </TouchableOpacity>
        )}
      />
    </Container>
  );
}

const Container = styled.View`
  z-index: -1;
  margin-top: 30px;
`;

const SkeletonList = styled.View`
  display: flex;
  gap: 16px;
`;

const LoadingContainer = styled.View`
  margin-top: 40px;
  margin-bottom: 120px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const NotFound = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;