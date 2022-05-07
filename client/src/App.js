import axios from "axios";
import { useEffect, useState } from "react";
import { UserIdContext } from "./components/AppContext";
import Routes from "./components/Routes";

import { useDispatch } from "react-redux";
import { getUser } from "./redux/actions/user.actions";

function App() {
  const [userID, setUserID] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUserID(res.data);
        })
        .catch((_err) => console.log("No token"));
    })();

    if (userID) dispatch(getUser(userID));
  }, [userID]);

  return (
    <UserIdContext.Provider value={userID}>
      <Routes />
    </UserIdContext.Provider>
  );
}

export default App;
