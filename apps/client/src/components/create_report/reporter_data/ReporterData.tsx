import React from "react";
import { Card, Col, Input, Row } from "antd";

const ReporterDataComponent: React.FC = () => {
  return (
    <>
      <Card
        bordered={false}
        style={{
          width: "100%",
          height: 200,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Row gutter={[16, 16]} justify={"space-between"}>
          {/* Identificación */}
          <Col span={5}>
            <Input
              addonBefore="C.C."
              placeholder="1.234.245.335"
              style={{ width: "100%" }}
              size="small"
            />
          </Col>
          <Col span={5}>
            <Input
              addonBefore="C.C."
              placeholder="1.234.245.335"
              style={{ width: "100%" }}
              size="small"
            />
          </Col>
          <Col span={5}>
            <Input
              addonBefore="C.C."
              placeholder="1.234.245.335"
              style={{ width: "100%" }}
              size="small"
            />
          </Col>
          <Col span={5}>
            <Input
              addonBefore="C.C."
              placeholder="1.234.245.335"
              style={{ width: "100%" }}
              size="small"
            />
          </Col>
          <Col span={5}>
            <Input
              addonBefore="C.C."
              placeholder="1.234.245.335"
              style={{ width: "100%" }}
              size="small"
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ReporterDataComponent;
