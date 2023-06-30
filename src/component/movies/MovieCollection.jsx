import React from "react";
import MovieList from "./MovieList";
import EmptyData from "../EmptyData";
import { Button, Row } from "antd";

export default function MovieCollection({
  category,
  desc,
  deleteAll,
  movies,
  totalPage,
  page,
  handlePageChange,
  handleRemoveAll,
}) {
  return (
    <MovieList
      category={category}
      desc={desc}
      deleteAll={deleteAll}
      handleClickRemoveAll={handleRemoveAll}
    >
      {movies.length > 0 ? (
        <>
          <Row gutter={[12, 12]}>{movies}</Row>
          {totalPage > 1 && (
            <div
              style={{
                display: "flex",
                gap: 6,
                justifyContent: "center",
                marginTop: 24,
              }}
            >
              {Array(totalPage)
                .fill(null)
                .map((value, index) => (
                  <Button
                    htmlType="button"
                    key={index}
                    style={{
                      background:
                        page === index + 1 ? "var(--orange-color)" : "",
                      color: page === index + 1 ? "#fff" : "",
                      border: "none",
                    }}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Button>
                ))}
            </div>
          )}
        </>
      ) : (
        <EmptyData color={"#fff"} />
      )}
    </MovieList>
  );
}
