import React from "react";

import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import SafetyBarrierContent from "@/components/configuration/safety_barrier/SafetyBarrierContent";

const SafetyBarrierParametrizationPage: React.FC = () => {
  return (
    <div className="homepage-safety_barrier">
      <CustomDashboardLayout
        customLayoutContent={
          <div
            style={{
              width: "100%",
              display: "flex",
              flexFlow: "column wrap",
            }}
          >
            <SafetyBarrierContent />
          </div>
        }
      />
    </div>
  );
};

export default SafetyBarrierParametrizationPage;
