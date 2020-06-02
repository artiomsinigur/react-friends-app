import React, { useState, useEffect, useRef } from "react";

export default function Form(props) {
  const [name, setName] = useState("");
  const [wasAdded, setAdded] = useState(false);
  const addFieldRef = useRef(null);
  const addButtondRef = useRef(null);

  useEffect(() => {
    addFieldRef.current.focus();
    if (wasAdded) {
      addFieldRef.current.focus();
    }
  }, [wasAdded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.add(name);
    setName("");
    setAdded(false);
  };

  return (
    <div className="add-friend">
      <form onSubmit={handleSubmit}>
        <label htmlFor="addFriend">
          <input
            type="text"
            id="addFriend"
            placeholder="Add friend"
            value={name}
            onChange={(e) => setName(e.target.value)}
            ref={addFieldRef}
          />
        </label>
        <button
          type="submit"
          onClick={() => setAdded(true)}
          ref={addButtondRef}
        >
          Add
        </button>
      </form>
    </div>
  );
}
