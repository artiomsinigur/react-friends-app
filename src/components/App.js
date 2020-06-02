import React, { useState, useReducer } from "react";
import { Router } from "@reach/router";
import { nanoid } from "nanoid";
import Form from "./Form";
import FriendList from "./FriendList";
import Edit from "./Edit";
import Toolbar from "./Toolbar";
import { filterReducer } from "./FilterReducer";

export default function App(props) {
  const [friends, setFriends] = useState(props.friends);
  const [id, setId] = useState(nanoid);
  const [filter, dispatch] = useReducer(filterReducer, { sortBy: "" });

  function add(name) {
    if (name !== "") {
      setId(nanoid());
      const newFriend = { id: "id-" + id, name, active: true };
      setFriends([...friends, newFriend]);
    }
  }

  function edit(id, name) {
    const editedFriends = friends.map((item) => {
      if (item.id === id) {
        return { ...item, name };
      }
      return item;
    });
    setFriends(editedFriends);
  }

  function remove(id) {
    const remainingFriends = friends.filter((item) => item.id !== id);
    setFriends(remainingFriends);
  }

  function removeAll() {
    setFriends([]);
  }

  function toggleActivate(id) {
    const activeFriend = friends.map((item) => {
      if (item.id === id) {
        return { ...item, active: !item.active };
      }
      return item;
    });
    setFriends(activeFriend);
  }

  // Filters
  const showAll = () => dispatch({ type: "all" });
  const showActivate = () => dispatch({ type: "active" });
  const showDeactivate = () => dispatch({ type: "inactive" });

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
