import React from "react";
import { useRouter } from "next/router";
import { Select } from "antd";
import { handleParams } from "@/lib/common";

export default function FilterFilm({ title, options, paramItem }) {
  const router = useRouter();
  const params = router.query;
  console.log("keyword: ", params);

  const defaultValue = params[paramItem] ? params[paramItem] : undefined;

  const onChange = (value) => {
    const pathName = router.pathname;
    // Đảm bảo giá trị mặc định cho trường "page" là 1
    params.page = "1";
    const updatedParams = { ...params };
    updatedParams[paramItem] = value;
    router.push(`${pathName}?${handleParams(updatedParams)}`);
  };

  return (
    <Select
      showSearch
      placeholder={title}
      optionFilterProp="children"
      onChange={onChange}
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      options={options}
      defaultValue={defaultValue}
      style={{ textAlign: "center" }}
    />
  );
}
