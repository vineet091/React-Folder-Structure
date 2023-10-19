import { fetchData } from "./data";
import "./styles.css";
import { useEffect, useRef, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [collapsedList, setCollapsedList] = useState({});
  const deBounceRef = useRef(null);

  useEffect(() => {
    fetchData()
      .then((response) => {
        setData(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleOnClick = (evt, id) => {
    if (collapsedList[id]) {
      setCollapsedList({ ...collapsedList, [id]: false });
    } else {
      setCollapsedList({ ...collapsedList, [id]: true });
    }
  };
  console.log("collapsedList", collapsedList);
  return (
    <div className="App">
      {data.map((item, index) => (
        <List
          elm={item}
          handleOnClick={handleOnClick}
          collapsedList={collapsedList}
        />
      ))}
    </div>
  );
}

const List = ({ elm, handleOnClick, collapsedList }) => {
  const list = [];
  if (elm?.children?.length) {
    elm.children.map((item, index) => {
      if (item?.children?.length) {
        list.push(
          <li key={`item-${item.id}`} className="item parent">
            <List
              elm={item}
              collapsedList={collapsedList}
              handleOnClick={handleOnClick}
            ></List>
          </li>
        );
      } else {
        list.push(
          <li key={`item-${item.id}`} className="item">
            <div className="dot"></div>
            <div>{item.name}</div>
          </li>
        );
      }
    });
  }
  return (
    <div>
      <h2 className={`heading ${list.length ? "parent" : ""}`}>
        <div
          className={`${list.length ? "triangle" : "dot"} ${
            collapsedList[elm.id] ? "close" : ""
          }`}
        ></div>
        <div className="title" onClick={(evt) => handleOnClick(evt, elm.id)}>
          {elm.name}
        </div>
      </h2>
      <ul className={`${collapsedList[elm.id] ? "hide" : ""}`}>{list}</ul>
    </div>
  );
};
