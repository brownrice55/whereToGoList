import { useState } from "react";
import { getData } from "../utils/common";
import { DoesDataExistContext } from "./context";

export function DataProvider({ children }) {
  const [doesDataExist, setDoesDataExist] = useState<number>(getData().size);
  return (
    <DoesDataExistContext.Provider value={{ doesDataExist, setDoesDataExist }}>
      {children}
    </DoesDataExistContext.Provider>
  );
}
