import React from "react";

import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import RiskLevelContent from "@/components/configuration/risk_level/RiskLevelContent";

const RiskLevelParametrizationPage: React.FC = () => {
  return (
    <div className="homepage-risk-level">
      <CustomDashboardLayout
        customLayoutContent={
          <div
            style={{
              width: "100%",
              display: "flex",
              flexFlow: "column wrap",
            }}
          >
            <RiskLevelContent />
          </div>
        }
      />
    </div>
  );
};

export default RiskLevelParametrizationPage;
