import axios from "axios";
import { useEffect, useState } from "react";
import { UserIdContext } from "./components/AppContext";
import Routes from "./components/Routes";

function App() {
  const [userJwtID, setUserJwtID] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}jwtid`)
        .then((res) => console.log(res))
        .catch((_err) => console.log("No Token"));
    };
    fetchToken();
  }, [userJwtID]);
  console.log(userJwtID);

  return (
    <UserIdContext.Provider value={userJwtID}>
      <Routes />
    </UserIdContext.Provider>
  );
}

export default App;
