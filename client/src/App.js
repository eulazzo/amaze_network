import axios from "axios";
import { useEffect, useState } from "react";
import { UserIdContext } from "./components/AppContext";
import Routes from "./components/Routes";

function App() {
  const [userJwtID, setUserJwtID] = useState(null);

  useEffect(() => {
    (async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUserJwtID(res.data);
        })
        .catch((_err) => console.log("No token"));
    })();
  }, [userJwtID]);

  console.log(userJwtID);

  return (
    <UserIdContext.Provider value={userJwtID}>
      <Routes />
    </UserIdContext.Provider>
  );
}

export default App;
