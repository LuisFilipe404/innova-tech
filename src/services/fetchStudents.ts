import { api } from "./api";

export interface Students {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

interface StudentResponse {
  results?: Students[];
  errorMessage?: string;
}

export const fetchStudents = async (
  page = 1,
  gender = ""
): Promise<StudentResponse> => {
  try {
    let url = `?page=${page}&results=20`;
    if (gender.length > 0) {
      url += `&gender=${gender}`;
    }

    const response: StudentResponse = await api.get(url);

    if (response.results) {
      return response;
    }

    throw new Error("Não foi possível carregar os estudantes.");
  } catch (error) {
    console.log(error);

    return {
      errorMessage:
        "Não foi possível carregar os estudantes. Verifique sua conexão com a internet.",
    };
  }
};
