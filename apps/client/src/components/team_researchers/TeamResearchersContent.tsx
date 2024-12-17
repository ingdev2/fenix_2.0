"use client";

import React from "react";

import { Card, Col, Row } from "antd";

import Content_button_back_router from "../common/content_button_back_router/Content_button_back_router";

const TeamResearchersContent: React.FC = () => {
  return (
    <div className="team-researcher" style={{ padding: "16px" }}>
      <div className="content-button-back-router">
        <Row style={{ marginBottom: "16px" }}>
          <Col span={24}>
            <Content_button_back_router />
          </Col>
        </Row>
      </div>

      <div>
        <Card
          size="small"
          style={{
            width: "100%",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            marginTop: "10px",
            background: "#D5E5FF",
          }}
        ></Card>
      </div>
    </div>
  );
};

export default TeamResearchersContent;
