import React from "react";
import { Link } from "@reach/router";

export default function Edit(props) {
  return (
    <>
      <h1>Details {props.id}</h1>
      <div className="edit-friend">
        {/* <form onSubmit={handleSubmit}> */}
        <form>
          <label htmlFor="editFriend">
            <input
              type="text"
              id="editFriend"
              // value={name}
              // onChange={handleChange}
            />
          </label>
          <button>Cancel</button>
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
}
