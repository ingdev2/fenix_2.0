import React from "react";

import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import RiskAnalysisContent from "@/components/risk_analysis/RiskAnalysisContent";

const RiskAnalysisPage: React.FC = () => {
  return (
    <div className="homepage-risk-analysis">
      <CustomDashboardLayout
        customLayoutContent={
          <div
            style={{
              width: "100%",
              display: "flex",
              flexFlow: "column wrap",
            }}
          >
            <RiskAnalysisContent />
          </div>
        }
      />
    </div>
  );
};

export default RiskAnalysisPage;
