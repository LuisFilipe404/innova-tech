import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Students, fetchStudents } from "../services/fetchStudents";

interface StudentsContextType {
  searchParams: string;
  openFilterBox: boolean;
  students: Students[];
  studentsError: string;
  studentSelected: Students | null;
  fetching: boolean;
  filtersSelected: string[];
  setFiltersSelected: Dispatch<SetStateAction<string[]>>;
  setFetching: Dispatch<SetStateAction<boolean>>;
  setSearchParams: Dispatch<SetStateAction<string>>;
  setStudentSelected: Dispatch<SetStateAction<Students | null>>;
  setOpenFilterBox: Dispatch<SetStateAction<boolean>>;
  nextPage: () => void;
}

const StudentsContext = createContext({} as StudentsContextType);

interface StudentsProviderProps {
  children: ReactNode;
}

export default function StudentsProvider({ children }: StudentsProviderProps) {
  // Carregamento
  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [fetching, setFetching] = useState(false);

  // Scroll Infinito
  const [page, setPage] = useState<number>(1);

  // Filtros e Buscas
  const [filtersSelected, setFiltersSelected] = useState<string[]>([
    "male",
    "female",
  ]);
  const [searchParams, setSearchParams] = useState<string>("");
  const [openFilterBox, setOpenFilterBox] = useState<boolean>(false);

  // Estados de Estudantes
  const [students, setStudents] = useState<Students[]>([]);
  const [studentsError, setStudentsError] = useState<string>("");
  const [studentSelected, setStudentSelected] = useState<Students | null>(null);

  const nextPage = useCallback(() => {
    if (searchParams === "" && !fetching) {
      setFetching(true);

      const auxPage = page + 1;
      setPage(auxPage);

      const auxFilter = filtersSelected;

      const filter = auxFilter.length > 1 ? "" : auxFilter[0];

      getStudents(auxPage, filter);
    }
  }, [page, searchParams, fetching, filtersSelected]);

  const getStudents = useCallback(
    async (page = 1, filter = "") => {
      const studentsInCash = await AsyncStorage.getItem("innova-tech-students");

      if (studentsInCash && page === 1) {
        setStudents(JSON.parse(studentsInCash));
        return;
      }

      const students = await fetchStudents(page, filter);

      if (students && students.results) {
        if (page === 1) {
          await AsyncStorage.setItem(
            "innova-tech-students",
            JSON.stringify(students.results)
          );
        }

        setStudents((prev) => [...prev, ...students.results!]);
      }

      if (students?.errorMessage) {
        setStudentsError(students.errorMessage);
      }

      setFetching(false);
    },
    [page, filtersSelected, fetching]
  );

  const values = useMemo(
    (): StudentsContextType => ({
      openFilterBox,
      students,
      studentsError,
      studentSelected,
      searchParams,
      fetching,
      filtersSelected,
      setFiltersSelected,
      setFetching,
      setSearchParams,
      setStudentSelected,
      setOpenFilterBox,
      nextPage,
    }),
    [
      openFilterBox,
      students,
      studentsError,
      studentSelected,
      searchParams,
      fetching,
      filtersSelected,
      setFiltersSelected,
      setFetching,
      setSearchParams,
      setOpenFilterBox,
      setStudentSelected,
      nextPage,
    ]
  );

  useEffect(() => {
    if (filtersSelected.length === 0) setFiltersSelected(["male", "female"]);
  }, [filtersSelected]);

  useEffect(() => {
    if (loaded) {
      getStudents();
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <StudentsContext.Provider value={values}>
      {children}
    </StudentsContext.Provider>
  );
}

export const useStudents = () => {
  return useContext(StudentsContext);
};
