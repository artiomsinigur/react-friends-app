export default function filterReducer(state, action) {
  switch (action) {
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

// or create a object
// const FILTER_MAP = {
//   all: () => true,
//   active: (item) => item.active, // this callback will return all items that friend.active = true
//   inactive: (item) => !item.active,
// };