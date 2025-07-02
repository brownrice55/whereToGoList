import { createContext, useState } from "react";
import { getData } from "../utils/common";

export const DoesDataExistContext = createContext();

export function DataProvider({ children }) {
  const [doesDataExist, setDoesDataExist] = useState(getData().size);
  return (
    <DoesDataExistContext.Provider value={{ doesDataExist, setDoesDataExist }}>
      {children}
    </DoesDataExistContext.Provider>
  );
}
