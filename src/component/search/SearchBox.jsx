import { Select } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import EmptyData from "../EmptyData";
import CardSearch from "../cardFilm/CardSearch";

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
          const { results } = d;
          if (results.length !== 0) {
            const data = results.map((item) => item);
            callback(data);
          } else {
            return <EmptyData color="#fff" />;
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
  const [value, setValue] = useState(null);

  const router = useRouter();
  const handleSearch = (newValue) => {
    fetchData(newValue, setData);
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      if (e.target.value === "") return;
      else router.push(`/search?q=${e.target.value}`);
    }
  };

  const handleChange = () => {
    setData([]);
    setValue(null);
  };

  return (
    <Select
      showSearch
      onInputKeyDown={handleEnter}
      value={value}
      placeholder={"Tìm kiếm..."}
      style={props.style}
      defaultActiveFirstOption={false}
      autoClearSearchValue
      showArrow={true}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={<EmptyData color={"#fff"} />}
      suffixIcon={<FaSearch style={{ fontSize: 18 }} />}
      options={(data || []).map((d) => ({
        value: d.id,
        label: (
          <CardSearch
            key={d.id}
            id={d.id}
            title={d.title}
            link={`/movie/${d.id}`}
            imdbPoint={d.vote_average}
            pathImg={d.poster_path}
          />
        ),
      }))}
      size="large"
      dropdownStyle={{ background: "#444" }}
    />
  );
}
