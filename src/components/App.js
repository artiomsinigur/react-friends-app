import React, { useReducer } from "react";
import { Router } from "@reach/router";
import Form from "./Form";
import FriendList from "./FriendList";
import Edit from "./Edit";
import Toolbar from "./Toolbar";
import * as reducer from "./reducers";

export default function App(props) {
  const [filter, dispatchFilter] = useReducer(reducer.filter, { sortBy: "" });

  const [friends, dispatch] = useReducer(reducer.friend, props.friends);

  function add(name) {
    if (name !== "") {
      dispatch({ type: "ADD", payload: { name } });
    }
  }

  function edit(id, name) {
    if (name !== "") {
      dispatch({ type: "EDIT", payload: { id, name } });
    }
  }

  function remove(id) {
    dispatch({ type: "REMOVE", payload: { id } });
  }

  function removeAll() {
    dispatch({ type: "REMOVE_ALL" });
  }

  function toggleActivate(id) {
    dispatch({ type: "TOGGLE", payload: { id } });
  }

  // Filters
  const showAll = () => dispatchFilter({ type: "ALL" });
  const showActivate = () => dispatchFilter({ type: "ACTIVE" });
  const showDeactivate = () => dispatchFilter({ type: "INACTIVE" });

  return (
    <>
      <Form add={add} />
      <Toolbar>
        <button onClick={removeAll}>Remove all</button>
        <button aria-pressed={filter.sortBy === "all"} onClick={showAll}>
          All Friends
        </button>
        <button
          aria-pressed={filter.sortBy === "active"}
          onClick={showActivate}
        >
          Active Friends
        </button>
        <button
          aria-pressed={filter.sortBy === "inactive"}
          onClick={showDeactivate}
        >
          Inactive Friends
        </button>
      </Toolbar>
      <FriendList
        friends={friends}
        remove={remove}
        edit={edit}
        toggleActivate={toggleActivate}
        filter={filter}
      />
      <Router>
        <Edit path="edit/:id" />
      </Router>
    </>
  );
}

const friends = [
  { id: "id-k*7dk3d", name: "Kyle Simpson", active: true },
  { id: "id-oo94Kj#", name: "Tony Alicea", active: true },
  { id: "id-j2j3h54", name: "Andrew Mead", active: true },
  { id: "id-yc)dd4c", name: "Tyler McGinnis", active: false },
];

App.defaultProps = {
  friends,
};
