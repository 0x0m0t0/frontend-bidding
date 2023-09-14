export const likeChecker = (likedLobbies, lobbyid, setIsClicked) => {
  if (likedLobbies.length > 0) {
    let likedUser = [];
    likedLobbies.map((item) => likedUser.push(item.id_lobby));

    if (likedUser.length > 0) {
      const isLiked = likedUser.includes(Number.parseInt(lobbyid));
      if (isLiked === true) {
        console.log("i did it");
        setIsClicked(true);
      } else {
        console.log("not found by user");
      }
    } else {
      console.log("hello not there yet");
    }
  } else {
    console.log("nooo");
  }
};
