import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../../redux/actions/post.actions";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import "./style.css";
import { AiOutlineDelete } from "react-icons/ai";

const DeleteCard = ({ id }) => {
  const dispatch = useDispatch();

  const deleteQuote = () => {
    dispatch(deletePost(id));
    window.location.reload();
  };
  return (
    <Popup
      trigger={
        <span className="deleteButton">
          <AiOutlineDelete color="black" size={"20px"} />
        </span>
      }
      modal
      nested
    >
      {(close) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header">
            {" "}
            Are you sure you want to delete this post?{" "}
          </div>

          <div className="actions">
            <Popup
              trigger={
                <button className="button" style={{ display: "none" }}>
                  {" "}
                  Yes{" "}
                </button>
              }
              position="top center"
              nested
            ></Popup>
            <button
              className="button"
              style={{ color: "#000" }}
              onClick={() => {
                deleteQuote();
                close();
              }}
            >
              Yes
            </button>
            <button
              className="button btnGreen"
              onClick={() => {
                close();
              }}
            >
              Cancel Action
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default DeleteCard;
