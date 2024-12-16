import React from "react";
import { Button, Col, Row } from "antd";
import ReportSearchEngineComponent from "@/components/dashboard/report_search_engine/ReportSearchEngineComponent";
import { FileAddOutlined } from "@ant-design/icons";
import StatisticsComponent from "@/components/dashboard/statistics/StatisticsComponent";

const DashboardPage: React.FC = () => (
  <div style={{ padding: "16px" }}>
    <Row style={{ marginBottom: "32px" }}>
      <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
        <ReportSearchEngineComponent />
      </Col>
    </Row>

    <Row style={{ marginBottom: "32px" }}>
      <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
        <Button type={"primary"} icon={<FileAddOutlined />} size={"large"}>
          Crear Reporte
        </Button>
      </Col>
    </Row>

    <Row>
      <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
        <StatisticsComponent />
      </Col>
    </Row>
  </div>
);
export default DashboardPage;
