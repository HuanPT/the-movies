import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Select } from "antd";
import { handleParams } from "@/lib/common";

export default function FilterFilm({ options, paramItem }) {
  const router = useRouter();
  const params = router.query;
  const [value, setValue] = useState(null);
  useEffect(() => {
    params[paramItem] ? setValue(params[paramItem]) : setValue("");
  }, [params]);

  const onChange = useCallback(
    (value) => {
      if (value !== "") {
        const pathName = router.pathname;
        params.page = "1";
        if (params.q) {
          const updatedParams = { ...params };
          updatedParams[paramItem] = encodeURIComponent(value);
          router.push(`${pathName}?${handleParams(updatedParams)}`);
        } else {
          const newParams = { [paramItem]: encodeURIComponent(value) };
          router.push(`${pathName}?${handleParams(newParams)}`);
        }
      } else return;
    },
    [router, paramItem]
  );

  return (
    <Select
      showSearch
      optionFilterProp="children"
      onChange={onChange}
      value={value}
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      options={options}
      style={{ textAlign: "center" }}
    />
  );
}
