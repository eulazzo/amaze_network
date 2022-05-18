import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment, editComment } from "../../redux/actions/post.actions";
import { UserIdContext } from "../AppContext";

const EditDeleteComment = ({ comment, postId }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const uid = useContext(UserIdContext);

  const handleEdition = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(editComment(postId, comment._id, text));
      setText("");
      setEdit(false);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();

    dispatch(deleteComment(postId, comment._id));
    setText("");
    setEdit(false);
  };

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.commenterId) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [uid, comment.commenterId]);

  return (
    <div className="edit-comment">
      {isAuthor && !edit && (
        <span onClick={() => setEdit(!edit)}>
          <img src="./img/icons/edit.svg" alt="edit-comment" />
        </span>
      )}
      {isAuthor && edit && (
        <form action="" onSubmit={handleEdition} className="edit-comment-form">
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            Edit
          </label>
          <br />
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.text}
          />
          <br />
          <div className="btn">
            <span
              onClick={(e) => {
                if (window.confirm("Sure you want to delete this comment?")) {
                  handleDelete(e);
                }
              }}
            >
              <img src="./img/icons/trash.svg" alt="delete" />
            </span>
            <input type="submit" value={"Save"} />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditDeleteComment;
