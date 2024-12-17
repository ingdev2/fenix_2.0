import React from "react";

import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import RiskContent from "@/components/case_reports/risk/riskContent";

const RiskReportPage: React.FC = () => {
  return (
    <div className="homepage-risk-report">
      <CustomDashboardLayout
        customLayoutContent={
          <div
            style={{
              width: "100%",
              display: "flex",
              flexFlow: "column wrap",
            }}
          >
            <RiskContent />
          </div>
        }
      />
    </div>
  );
};

export default RiskReportPage;
