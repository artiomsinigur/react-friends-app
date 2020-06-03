import { nanoid } from "nanoid";

// The following code is for hook useReducer
export function filter(state, action) {
  switch (action.type) {
    case "ALL":
      return { sortBy: "all" };
    case "ACTIVE":
      return { sortBy: "active" };
    case "INACTIVE":
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

// Friend reducer
// const initialState = [{ id: "sdf23$f#", name: "Andrew", active: true }];
export function friend(state, action) {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        { ...action.payload, id: "id-" + nanoid(), active: true },
      ];
    case "EDIT":
      return state.map((friend) => {
        if (friend.id === action.payload.id) {
          return { ...friend, name: action.payload.name };
        }
        return friend;
      });
    case "REMOVE":
      return state.filter((friend) => friend.id !== action.payload.id);
    case "REMOVE_ALL":
      return (state = []);
    case "TOGGLE":
      return state.map((friend) => {
        if (friend.id === action.payload.id) {
          return { ...friend, active: !friend.active };
        }
        return friend;
      });
    default:
      return state;
  }
}
