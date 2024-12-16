"use client";

import React from "react";

import CaseTypeOptionComponent from "./case_type_options/CaseTypeOptionComponent";
import CustomDashboardLayout from "../common/custom_dashboard_layout/CustomDashboardLayout";

const CreateReportContent: React.FC = () => {
  return (
    <div className="case-type-option">
      <CustomDashboardLayout
        customLayoutContent={
          <div
            style={{
              width: "100%",
              display: "flex",
              flexFlow: "column wrap",
            }}
          >
            <CaseTypeOptionComponent />
          </div>
        }
      />
    </div>
  );
};

export default CreateReportContent;
