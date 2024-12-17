import React from "react";

import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import RiskTypeContent from "@/components/configuration/risk_type/RiskTypeContent";

const RiskTypeParametrizationPage: React.FC = () => {
  return (
    <div className="homepage-risk-type">
      <CustomDashboardLayout
        customLayoutContent={
          <div
            style={{
              width: "100%",
              display: "flex",
              flexFlow: "column wrap",
            }}
          >
            <RiskTypeContent />
          </div>
        }
      />
    </div>
  );
};

export default RiskTypeParametrizationPage;
