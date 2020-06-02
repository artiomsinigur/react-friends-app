import React, { useRef, useEffect } from "react";
import Friend from "./Friend";
import filterReducer from "./FilterReducer";
import usePrevious from "./usePrevious";

export default function FriendList({
  friends,
  filter,
  remove,
  edit,
  toggleActivate,
}) {
  const addHeadingRef = useRef(null);

  // Case two: when remove
  const previousListOfFriends = usePrevious(friends.length);
  // will focus the heading if the number of tasks we have now is less than with it previously was
  useEffect(() => {
    if (friends.length - previousListOfFriends === -1) {
      addHeadingRef.current.focus();
    }
  }, [friends.length, previousListOfFriends]);

  const handleRemove = (id) => remove(id);
  const handleEdit = (id, name) => edit(id, name);
  const handleToggleActivate = (id) => toggleActivate(id);

  return (
    <>
      <h1 tabIndex="-1" ref={addHeadingRef}>
        List of friends
      </h1>
      <ul>
        {filterReducer(friends, filter).map((friend) => {
          return (
            <Friend
              key={friend.id}
              friend={friend}
              handleRemove={handleRemove}
              handleEdit={handleEdit}
              handleToggleActivate={handleToggleActivate}
            />
          );
        })}
      </ul>
    </>
  );
}
