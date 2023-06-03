import React, { useState } from "react";
import Head from "next/head";
import Section from "@/component/intro/Section";
import IntroEmail from "@/component/intro/IntroEmail";
import SectionBgr from "@/component/intro/SectionBgr";
import SectionImage from "@/component/intro/SectionImage";
import SectionImgAnimation from "@/component/intro/SectionImgAnimation";

// Ant Design
import { message, Collapse, Row, Col, Button } from "antd";
import SectionText from "@/component/intro/SectionText";

import imgOnTv from "/public/bgr-tv.png";
import imgWatch from "/public/onMobile.jpg";
import imgDevices from "/public/device.png";
import imgKid from "/public/img-kid.png";
import imgApp from "/public/downloadApp.jpg";
import { FaAngleRight } from "react-icons/fa";
const faqList = [
  {
    header: "TheMovies là gì?",
    text: [
      "TheMovies là dịch vụ phát trực tuyến mang đến đa dạng các loại chương trình truyền hình, phim, anime, phim tài liệu đoạt giải thưởng và nhiều nội dung khác trên hàng nghìn thiết bị có kết nối Internet.",
      " Bạn có thể xem bao nhiêu tùy thích, bất cứ lúc nào bạn muốn mà không gặp phải một quảng cáo nào – tất cả chỉ với một mức giá thấp hàng tháng. Luôn có những nội dung mới để bạn khám phá và những chương trình truyền hình, phim mới được bổ sung mỗi tuần!",
    ],
  },
  {
    header:
      "Phim chất lượng cao online của TheMovies khác gì so với các trang phim khác?",
    text: [
      "Là phim bluray (reencoded), có độ phân giải thấp nhất là Full HD (1080p), trong khi hầu hết các trang phim khác chỉ có tới độ phân giải HD (720p) là cao nhất",
      "Chất lượng cao, lượng dữ liệu trên giây (bitrate) gấp từ 5 - 10 lần phim online thông thường - đây là yếu tố quyết định độ nét của phim (thậm chí còn quan trọng hơn độ phân giải)",
      "Âm thanh 5.1 (6 channel) thay vì stereo (2 channel) như các trang phim khác (kể cả Youtube) Phù hợp để xem trên màn hình TV, máy tính, laptop có độ phân giải cao",
    ],
  },
  {
    header: "Tôi phải trả bao nhiêu tiền để xem TheMovies?",
    text: [
      "Xem TheMovies trên điện thoại thông minh, máy tính bảng, TV thông minh, máy tính xách tay hoặc thiết bị phát trực tuyến, không phải trả phí.",
    ],
  },
  {
    header: "Tôi có thể xem ở đâu?",
    text: [
      "Xem mọi lúc, mọi nơi. Đăng nhập bằng tài khoản TheMovies của bạn để xem ngay trên trang web theMovies.com từ máy tính cá nhân, hoặc trên bất kỳ thiết bị nào có kết nối Internet và có cài đặt ứng dụng TheMovies, bao gồm TV thông minh, điện thoại thông minh, máy tính bảng, thiết bị phát đa phương tiện trực tuyến và máy chơi game.",
      " Bạn cũng có thể tải xuống các chương trình yêu thích bằng ứng dụng trên iOS, Android hoặc Windows 10. Vào phần nội dung đã tải xuống để xem trong khi di chuyển và khi không có kết nối Internet. Mang TheMovies theo bạn đến mọi nơi.",
    ],
  },
  {
    header: "Tôi có thể xem gì trên TheMovies?",
    text: [
      "TheMovies có một thư viện phong phú gồm các phim truyện, phim tài liệu, chương trình truyền hình, anime, tác phẩm giành giải thưởng của TheMovies và nhiều nội dung khác. Xem không giới hạn bất cứ lúc nào bạn muốn.",
    ],
  },
  {
    header: "TheMovies có phù hợp cho trẻ em không?",
    text: [
      "Trải nghiệm TheMovies Trẻ em có sẵn trong gói dịch vụ của bạn, trao cho phụ huynh quyền kiểm soát trong khi các em có thể thưởng thức các bộ phim và chương trình phù hợp cho gia đình tại không gian riêng.",
      " Hồ sơ Trẻ em đi kèm tính năng kiểm soát của cha mẹ (được bảo vệ bằng mã PIN), cho phép bạn giới hạn độ tuổi cho nội dung con mình được phép xem, cũng như chặn những phim hoặc chương trình mà bạn không muốn các em nhìn thấy.",
    ],
  },
];

export default function Home() {
  const [messageApi, contextHolder] = message.useMessage();
  const key = "downloadApp";

  // Accordion
  const { Panel } = Collapse;
  const panelStyle = {
    marginBottom: 24,
    background: "#303030",
    borderRadius: 8,
    border: "none",
  };

  const devicesStyle = {
    maxWidth: "62%",
    maxHeight: "46%",
    top: "33%",
  };

  const styleWatch = {
    alignItems: "center",
    background: "#000",
    border: "0.2rem solid rgba(255, 255, 255, 25%)",
    borderRadius: "12px",
    top: "68%",
    boxShadow: "0 0 32px #000",
    display: "flex",
    justifyContent: "space-around",
    left: "50%",
    margin: "0 auto",
    minWidth: "240px",
    padding: "4px 10px",
    zIndex: 1,
    transform: "translate(-50%)",
    width: "90%",
    height: "fit-content",
    maxWidth: "350px",
  };

  // Xoay loading button
  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 1000);
  };

  // Alert messenger
  const openMessage = () => {
    messageApi.open({
      key,
      type: "loading",
      content: "Vui lòng chờ...",
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: "info",
        content: "Ứng dụng đang trong quá trình hoàn thiện!",
        duration: 2,
      });
    }, 1000);
    enterLoading(0);
  };

  const Collapses = faqList.map((panels, i) => (
    <Panel header={panels.header} key={i} style={panelStyle}>
      {panels.text.map((panel, i) => (
        <p key={"panel" + i} style={{ margin: "6px 0px" }}>
          {panel}
        </p>
      ))}
    </Panel>
  ));

  return (
    <>
      <Head>
        <title>theMovies - Trải nghiệm phim trực tuyến không giới hạn</title>
        <meta
          name="description"
          content="TheMovies - Mang cả thế giới đến với bạn!"
        />
      </Head>
      <div>
        {/* Background Input  */}
        <Section>
          <SectionBgr />
        </Section>

        {/* Section Card on TV */}
        <Section>
          <Row gutter={[12, 12]}>
            <Col span={24} md={12}>
              <SectionText
                title={"Thưởng thức trên TV của bạn."}
                subTitle={
                  "Xem trên TV thông minh, Playstation, Xbox, Chromecast, Apple TV, đầu phát Blu-ray và nhiều thiết bị khác."
                }
              />
            </Col>
            <Col span={24} md={12}>
              <SectionImage srcImg={imgOnTv} video={"/video-tv-0819.m4v"} />
            </Col>
          </Row>
        </Section>

        {/* Section Card Watch */}
        <Section>
          <Row gutter={[12, 12]}>
            <Col span={24} md={{ order: 2, span: 12 }}>
              <SectionText
                title={"Tải xuống nội dung để xem ngoại tuyến."}
                subTitle={
                  "Lưu lại những nội dung yêu thích một cách dễ dàng và luôn có thứ để xem."
                }
              />
            </Col>
            <Col span={24} md={{ order: 1, span: 12 }}>
              <SectionImage srcImg={imgWatch} customStyle={styleWatch}>
                <SectionImgAnimation />
              </SectionImage>
            </Col>
          </Row>
        </Section>

        {/* Section download watch every devices */}
        <Section>
          <Row gutter={[12, 12]}>
            <Col span={24} md={12}>
              <SectionText
                title={"Xem ở mọi nơi."}
                subTitle={
                  "Phát trực tuyến không giới hạn phim và chương trình truyền hình trên điện thoại, máy tính bảng, máy tính xách tay và TV."
                }
              />
            </Col>
            <Col span={24} md={12}>
              <SectionImage
                srcImg={imgDevices}
                video={"/video-devices-vn.m4v"}
                customStyle={devicesStyle}
                alt="Mọi thiết bị"
              />
            </Col>
          </Row>
        </Section>

        {/* Section kids */}
        <Section>
          <Row gutter={[12, 12]}>
            <Col span={24} md={{ order: 2, span: 12 }}>
              <SectionText
                title={"Tải xuống nội dung để xem ngoại tuyến."}
                subTitle={
                  "Lưu lại những nội dung yêu thích một cách dễ dàng và luôn có thứ để xem."
                }
              />
            </Col>
            <Col span={24} md={{ order: 1, span: 12 }}>
              <SectionImage srcImg={imgKid} alt="Kids" />
            </Col>
          </Row>
        </Section>

        {/* Section download app*/}
        <Section>
          <Row gutter={[12, 12]}>
            <Col span={24} md={12}>
              <SectionText
                title={
                  "Bạn có smart phone? Hãy thử gói dịch vụ miễn phí mới của chúng tôi!"
                }
                subTitle={
                  "Xem các bộ phim và chương trình truyền hình mới được tuyển chọn mà không cần cung cấp thông tin thanh toán!"
                }
              >
                {contextHolder}
                <div>
                  <Button
                    danger
                    size="large"
                    type="primary"
                    loading={loadings[0]}
                    onClick={openMessage}
                  >
                    Tải ứng dụng
                    <FaAngleRight
                      style={{ verticalAlign: "middle", marginLeft: 6 }}
                    />
                  </Button>
                </div>
              </SectionText>
            </Col>
            <Col span={24} md={12}>
              <SectionImage srcImg={imgApp} alt="Download app" />
            </Col>
          </Row>
        </Section>

        {/* Section Faq */}
        <Section>
          <div>
            <h1 style={{ textAlign: "center", fontSize: 32 }}>
              Câu hỏi thường gặp
            </h1>
          </div>
          <div style={{ marginBottom: 32 }}>
            <Collapse
              accordion
              style={{
                border: "none",
                maxWidth: 700,
                margin: "40px auto 0",
                fontSize: 16,
              }}
            >
              {Collapses}
            </Collapse>
          </div>
          <IntroEmail />
        </Section>
      </div>
    </>
  );
}
