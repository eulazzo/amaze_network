const PopUpModel = ({
  type,
  usersData,
  setFollowingPopup,
  setFollowersPopup,
  followersPopup,
  followingPopup,
}) => {
  return (
    <>
      {type && (
        <div className="popup-profil-container">
          <div className="modal">
            <h2>{type === "followingPopup" ? "Following" : "Followers"}</h2>
            <span
              className="cross"
              onClick={
                type === "followingPopup"
                  ? () => setFollowingPopup(!followingPopup)
                  : () => setFollowersPopup(!followersPopup)
              }
            >
              &#10005;
            </span>
            <ul>
              {usersData.map((infoUser) => (
                <li key={infoUser._id}>
                  <img src={infoUser.picture} alt="user-pic" />
                  <h4>{infoUser.pseudo}</h4>
                  <h2>FOLLOW HANDLER</h2>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpModel;
