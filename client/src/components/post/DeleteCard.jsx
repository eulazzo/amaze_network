import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../redux/actions/post.actions";
import "reactjs-popup/dist/index.css";
import "./style.css";
import Popup from "reactjs-popup";

const DeleteCard = ({ id }) => {
  const dispatch = useDispatch();

  const deleteQuote = () => {
    dispatch(deletePost(id));
  };
  return (
    <Popup trigger={<button className="button"> 
    <img className="button" src="./img/icons/trash.svg" alt="" />
    </button>} modal nested>
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
