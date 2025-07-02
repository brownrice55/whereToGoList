import { useContext } from "react";

import { DoesDataExistContext } from "../contexts/DataProvider";
import AddNewData from "../components/AddNewData";
import HomeComponent from "../components/HomeComponent";

export default function Home({ tabIndex }) {
  const { doesDataExist } = useContext(DoesDataExistContext);

  return (
    <>
      {doesDataExist ? <HomeComponent tabIndex={tabIndex} /> : <AddNewData />}
    </>
  );
}
