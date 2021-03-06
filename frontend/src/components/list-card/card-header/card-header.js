import React from "react";
import { useState, useEffect } from "react";
import styles from "./card-header.module.css";
import useActiveList from "../../../hooks/use-active-list";
import ShareModal from "../../modal/share-modal/share-modal";

const CardHeader = () => {
  const { updateTitle, title, refreshList } = useActiveList();
  const [innerTitle, setInnerTitle] = useState(title);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setInnerTitle(title);
  }, [title]);

  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <div>
      <header className={styles.header}>
        <input
          type="text"
          value={innerTitle}
          onChange={(e) => setInnerTitle(e.target.value)}
          onBlur={() => updateTitle(innerTitle)}
        />
        <div>
          <svg
            onClick={refreshList}
            fill="gray"
            style={{ cursor: "pointer" }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M10 11H7.101c0-.003 0-.006.001-.009.065-.319.163-.634.291-.937.126-.297.281-.583.461-.85.178-.264.384-.513.61-.74C8.691 8.238 8.94 8.032 9.206 7.853c.266-.18.551-.334.848-.46.302-.128.617-.226.938-.291.658-.135 1.357-.135 2.018 0 .318.065.634.163.937.291.296.125.581.281.85.461.266.179.514.384.738.609l1.416-1.412c-.314-.316-.664-.604-1.036-.855-.373-.252-.773-.47-1.188-.646-.425-.18-.868-.317-1.315-.408-.923-.189-1.899-.189-2.819 0-.449.092-.892.229-1.316.409C8.858 5.727 8.458 5.944 8.086 6.196 7.716 6.445 7.368 6.733 7.05 7.05S6.445 7.716 6.197 8.085c-.252.373-.47.773-.646 1.19-.18.424-.317.867-.408 1.315C5.115 10.725 5.1 10.863 5.08 11H2l4 4L10 11zM14 13h2.899c-.001.003 0 .006-.001.008-.066.324-.164.639-.292.938-.123.293-.278.579-.459.848-.179.264-.385.514-.613.742-.225.225-.473.43-.739.61-.268.18-.553.335-.849.461-.303.128-.618.226-.938.291-.657.135-1.357.135-2.017 0-.319-.065-.634-.163-.937-.291-.297-.126-.583-.281-.85-.461-.264-.178-.513-.384-.74-.61L7.05 16.95c.317.317.666.605 1.035.854.373.252.773.47 1.19.646.424.18.867.317 1.315.408C11.051 18.952 11.525 19 12 19s.949-.048 1.408-.142c.449-.091.893-.229 1.317-.409.415-.176.815-.393 1.188-.645.372-.251.722-.54 1.035-.854.317-.317.605-.666.855-1.037.254-.377.472-.777.645-1.187.178-.42.315-.863.408-1.316.027-.135.043-.273.063-.41H22l-4-4L14 13z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={openModal}
            style={{ cursor: "pointer" }}
            fill="gray"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M4.5 8.552c0 1.995 1.505 3.5 3.5 3.5s3.5-1.505 3.5-3.5-1.505-3.5-3.5-3.5S4.5 6.557 4.5 8.552zM19 8L17 8 17 11 14 11 14 13 17 13 17 16 19 16 19 13 22 13 22 11 19 11zM4 19h8 1 1v-1c0-2.757-2.243-5-5-5H7c-2.757 0-5 2.243-5 5v1h1H4z" />
          </svg>
          <ShareModal modalIsOpen={modalIsOpen} toggleModal={setIsOpen} />
        </div>
      </header>
    </div>
  );
};

export default CardHeader;
