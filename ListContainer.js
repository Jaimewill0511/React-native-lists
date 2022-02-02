import React from "react";
import List from "./List";

const mapItems = (items) => {
  return items.map((value) => ({
    key: value.id.toString(),
    value: value.name,
  }));
};

const filterAndSort = (data, text, asc) => {
  return data
    .filter((i) => text.length === 0 || i["name"].includes(text))
    .sort(
      asc
        ? (a, b) =>
            b.name.toLowerCase() > a.name.toLowerCase()
              ? 1
              : a.name.toLowerCase() === b.name.toLowerCase()
              ? 0
              : -1
        : (a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase()
              ? 1
              : a.name.toLowerCase() === b.name.toLowerCase()
              ? 0
              : -1
    );
};

export default function ListContainer() {
  const [asc, setAsc] = React.useState(false);
  const [filter, setFilter] = React.useState("");
  const [data, setData] = React.useState([]);
  const fetchItems = () =>
    fetch("https://61f7e5f239431d0017eafaee.mockapi.io/list/users")
      .then((response) => response.json())
      .then((data) => {
        let sortedData = data.sort((a, b) =>
          b.name.toLowerCase() > a.name.toLowerCase()
            ? -1
            : a.name.toLowerCase() === b.name.toLowerCase()
            ? 0
            : 1
        );
        setData(mapItems(sortedData));
      })
      .catch((err) => console.error(err));

  const fetchItemsFilter = (text, asc) =>
    fetch("https://61f7e5f239431d0017eafaee.mockapi.io/list/users")
      .then((response) => response.json())
      .then((data) => {
        setFilter(text);
        setData(mapItems(filterAndSort(data, text, asc)));
      })
      .catch((err) => console.error(err));

  const fetchItemsSort = (text, asc) =>
    fetch("https://61f7e5f239431d0017eafaee.mockapi.io/list/users")
      .then((response) => response.json())
      .then((data) => {
        setAsc(asc);
        setData(mapItems(filterAndSort(data, text, asc)));
      })
      .catch((err) => console.error(err));
  React.useEffect(() => {
    fetchItems();
  }, []);
  return (
    <List
      data={data}
      asc={asc}
      onFilter={(text) => {
        fetchItemsFilter(text, asc);
      }}
      onSort={() => {
        fetchItemsSort(filter, !asc);
        // console.log(asc, filter);
      }}
    />
  );
}
