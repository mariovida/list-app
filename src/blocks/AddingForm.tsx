import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../App.scss";

const AddingForm = () => {
  const [listName, setListName] = useState<string>("");
  const [createdListId, setCreatedListId] = useState<string | null>(null);
  const navigate = useNavigate();

  let backendUrl = import.meta.env.VITE_BACKEND_URL;
  if (import.meta.env.VITE_ENV === "production") {
    backendUrl = import.meta.env.VITE_BACKEND_URL_PROD;
  }

  const createList = () => {
    if (listName.trim() === "") {
      alert("Please enter a list name.");
      return;
    }

    axios
      .post(`${backendUrl}/api/create-list`, { name: listName })
      .then((res) => {
        setCreatedListId(res.data.id);
      })
      .catch((err) => {
        console.error("Error creating list:", err);
      });
  };

  const copyLink = () => {
    if (createdListId) {
      const link = `${window.location.origin}/list/${createdListId}`;
      navigator.clipboard.writeText(link);
      alert("Link copied to clipboard!");
    }
  };

  const goToList = () => {
    if (createdListId) {
      navigate(`/list/${createdListId}`);
    }
  };

  if (createdListId) {
    return (
      <div className="create-list">
        <div className="create-list_form">
          <h4>
            <span>{listName}</span> is created!
          </h4>
          <div className="create-list_success">
            <button onClick={goToList}>Go to list</button>
            <button onClick={copyLink}>Copy Link</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="create-list">
      <div className="create-list_form">
        <input
          type="text"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          placeholder="Enter list name"
        />
        <button onClick={createList}>Create List</button>
      </div>
    </div>
  );
};

export default AddingForm;
