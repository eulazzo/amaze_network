import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfilePicture } from "../../redux/actions/user.actions";

const CLOUDYNARY_URL = process.env.REACT_APP_CLOUDYNARY;

const UploadImg = () => {
  const { _id: userId } = useSelector((state) => state.user.userReducer);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userReducer);

  const handlerPicture = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");

    const size = file.size;
    const imgType = file.type;

    try {
      const { url } = (await axios.post(CLOUDYNARY_URL, data)).data;
      dispatch(setProfilePicture({ img: url, userId, imgType, size }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form action="" className="upload-pic">
      <label htmlFor="file">Change Profile Pic</label>
      <input
        type="file"
        style={{ display: "none" }}
        id="file"
        name="file"
        accept=".jpg,.jpef,.png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button className="saveImg" onClick={handlerPicture}>
        Save
      </button>
    </form>
  );
};

export default UploadImg;
