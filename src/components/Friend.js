import React, { useState, useEffect, useRef } from "react";
import { Link } from "@reach/router";
import usePrevious from "./usePrevious";
import Edit from "./Edit";

export default function Friend({
  friend,
  handleRemove,
  handleEdit,
  handleToggleActivate,
}) {
  const [isEditing, setEdit] = useState(false);
  const [name, setName] = useState(friend.name);
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  const saveButtonRef = useRef(null);

  // Manage focus for better accessibility
  // Case one: when editing
  const wasEditing = usePrevious(isEditing);

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  const onKeyPressHandler = (e) => {
    if (e.keyCode === 13) {
      saveButtonRef.current.focus();
    } else if (e.keyCode === 27) {
      setEdit(false);
      setName(friend.name);
    }
  };  

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEdit(friend.id, name);
    setEdit(false);
  };

  const handleCancelEdit = () => {
    setEdit(false);
    setName(friend.name);
  };

  const editTemplate = (
    <li>
      <div className="edit-friend">
        <form onSubmit={handleSubmit}>
          <label htmlFor="editFriend">
            <input
              type="text"
              id="editFriend"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={onKeyPressHandler}
              ref={editFieldRef}
            />
          </label>
          <button onClick={handleCancelEdit}>Cancel</button>
          <button type="submit" ref={saveButtonRef}>
            Save
          </button>
        </form>
      </div>
    </li>
  );

  const viewTemplate = (
    <li>
      <Link to={`edit/${friend.id}`}>{friend.name}</Link>
      <button disabled={!friend.active} onClick={() => handleRemove(friend.id)}>
        Remove
      </button>
      <button
        disabled={!friend.active}
        onClick={() => setEdit(true)}
        ref={editButtonRef}
      >
        Edit
      </button>
      <button onClick={() => handleToggleActivate(friend.id)}>
        {friend.active ? "Deactivate" : "Activate"}
      </button>
    </li>
  );

  return isEditing ? editTemplate : viewTemplate;
}
