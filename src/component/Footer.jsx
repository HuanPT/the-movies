import React from "react";
import { Col, Layout, Row } from "antd";

export default function Footer() {
  const { Footer } = Layout;

  return (
    <Footer className="footer">
      <Row>
        <Col>
          <h4>
            Phim chất lượng cao online của{" "}
            <span className="title">TheMovies</span> khác gì so với các trang
            phim khác?
          </h4>
          <ul style={{ paddingLeft: 20, marginTop: 30 }}>
            <li>
              Là phim bluray (reencoded), có độ phân giải thấp nhất là Full HD
              (1080p), trong khi hầu hết các trang phim khác chỉ có tới độ phân
              giải HD (720p) là cao nhất.
            </li>
            <li>
              Chất lượng cao, lượng dữ liệu trên giây (bitrate) gấp từ 5 - 10
              lần phim online thông thường - đây là yếu tố quyết định độ nét của
              phim (thậm chí còn quan trọng hơn độ phân giải).
            </li>
            <li>
              Âm thanh 5.1 (6 channel) thay vì stereo (2 channel) như các trang
              phim khác (kể cả Youtube).
            </li>
            <li>
              Phù hợp để xem trên màn hình TV, máy tính, laptop có độ phân giải
              cao.
            </li>
          </ul>
        </Col>
      </Row>
    </Footer>
  );
}
