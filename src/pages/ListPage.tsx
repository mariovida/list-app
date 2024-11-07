import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";

import XIcon from "../assets/x.svg";
import ChevronUp from "../assets/chevron-up.svg";
import "../App.scss";

interface Item {
  id: string;
  created_at: string;
  item: string;
}

const ListPage = () => {
  const { id: uuid } = useParams<{ id: string }>();
  const [listName, setListName] = useState<string>("");
  const [items, setItems] = useState<Item[]>([]);
  const [input, setInput] = useState<string>("");
  const [isMobileAddOpen, setIsMobileAddOpen] = useState<boolean>(false);

  const socket = React.useRef<any>(null);
  let backendUrl = import.meta.env.VITE_BACKEND_URL;
  if (import.meta.env.VITE_ENV === "production") {
    backendUrl = import.meta.env.VITE_BACKEND_URL_PROD;
  }

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/lists/${uuid}`)
      .then((res) => {
        console.log(res);
        setListName(res.data.list.name || "Unnamed List");
        setItems(res.data.items || []);
      })
      .catch((error) => {
        console.error("Error fetching list data:", error);
      });

    socket.current = io(backendUrl);
    socket.current.emit("joinList", uuid);
    socket.current.on("listUpdated", (updatedList: Item[]) => {
      setItems(updatedList);
    });
    return () => {
      socket.current.disconnect();
    };
  }, [uuid, backendUrl]);

  const addItem = () => {
    if (input.trim() !== "") {
      axios
        .post(`${backendUrl}/api/lists/${uuid}`, { item: input })
        .then(() => {
          setInput("");
        })
        .catch((error) => {
          console.error("Error adding item:", error);
        });
    }
  };

  const deleteItem = (itemId: string) => {
    axios
      .delete(`${backendUrl}/api/lists/${uuid}/items/${itemId}`)
      .then(() => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const toggleMobileAddSection = () => {
    setIsMobileAddOpen((prevState) => !prevState);
  };

  return (
    <>
      <Helmet>
        <title>List | AddIt</title>
      </Helmet>
      <section className="list">
        <div className="wrapper">
          <h1>{listName}</h1>
          <div className="list-box">
            <div className="list-items">
              <div className="list-items_content">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      className="list-item"
                      key={item.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <span>{item.item}</span>
                      <button
                        className="delete-btn"
                        onClick={() => deleteItem(item.id)}
                      >
                        <img src={XIcon} alt="Delete" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
            <div className="list-add">
              <p className="list-add_title">Add item</p>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="What would you like to add?"
              />
              <button onClick={addItem}>Add Item</button>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`list-add_mobile ${
          isMobileAddOpen ? "list-add_mobile--open" : ""
        }`}
      >
        <button className="mobile-toggle" onClick={toggleMobileAddSection}>
          <span>Add item</span>
          {isMobileAddOpen ? <img src={ChevronUp} /> : <img src={ChevronUp} />}
        </button>
        <div
          className={`list-add_mobile_form ${
            isMobileAddOpen ? "list-add_mobile_form--open" : ""
          }`}
        >
          {isMobileAddOpen && (
            <>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add an item"
              />
              <button onClick={addItem}>Add Item</button>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default ListPage;
