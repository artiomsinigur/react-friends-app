// The following code is for hook useReducer
export function filterReducer(state, action) {
  switch (action.type) {
    case "all":
      return { sortBy: "all" };
    case "active":
      return { sortBy: "active" };
    case "inactive":
      return { sortBy: "inactive" };
    // const filteredFriends = state.friends.filter(
    //   (friend) => friend.active === false
    // );
    // return { ...state, filtered: filteredFriends };
    default:
      return state;
  }
}

export function filterSelector(state, action) {
  switch (action.sortBy) {
    case "all":
      return state;
    case "active":
      return state.filter((item) => item.active === true);
    case "inactive":
      return state.filter((item) => item.active === false);
    default:
      return state;
  }
}
