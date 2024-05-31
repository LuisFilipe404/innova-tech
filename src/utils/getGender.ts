export const getGenderInPortuguese = (gender: string) => {
  switch (gender) {
    case "female":
      return "Feminino";

    case "male":
      return "Masculino";

    default:
      break;
  }
};
