import React from "react";

import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import UnsafeActionContent from "@/components/configuration/unsafe_action/UnsafeActionContent";

const UnsafeActionParametrizationPage: React.FC = () => {
  return (
    <div className="homepage-unsafe-action">
      <CustomDashboardLayout
        customLayoutContent={
          <div
            style={{
              width: "100%",
              display: "flex",
              flexFlow: "column wrap",
            }}
          >
            <UnsafeActionContent />
          </div>
        }
      />
    </div>
  );
};

export default UnsafeActionParametrizationPage;
