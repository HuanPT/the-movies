import { Select } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import EmptyData from "./EmptyData";

let timeout;
let currentValue;

const fetchData = (value, callback) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;
  const fake = () => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY_MOVIE}&query=${value}&language=vi`
    )
      .then((response) => response.json())
      .then((d) => {
        if (currentValue === value) {
          console.log(d);
          const { results } = d;
          console.log(results);
          if (results.length !== 0) {
            const data = results.map(
              (item) => (
                console.log(item),
                {
                  value: item.id,
                  text: item.title,
                }
              )
            );
            callback(data);
            console.log("callback: ", callback(data));
          } else {
            return <EmptyData />;
          }
        }
      });
  };
  if (value) {
    timeout = setTimeout(fake, 300);
  } else {
    callback([]);
  }
};
export default function SearchBox(props) {
  const [data, setData] = useState([]);
  const [value, setValue] = useState();
  const router = useRouter();
  const handleSearch = (newValue) => {
    fetchData(newValue, setData);
    // if (!newValue) return;
    // else {
    //   router.push(`/search?q=${newValue}`);
    // }
  };
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <Select
      showSearch
      value={value}
      placeholder={"Tìm kiếm..."}
      style={props.style}
      defaultActiveFirstOption={false}
      showArrow={true}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={<EmptyData />}
      suffixIcon={<FaSearch style={{ fontSize: 18 }} />}
      options={(data || []).map((d) => ({
        value: d.value,
        label: d.text,
      }))}
      size="large"
    />
  );
}
