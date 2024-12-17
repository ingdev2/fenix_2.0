import React from "react";

import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import UnitContent from "@/components/configuration/units/UnitContent";

const UnitParametrizationPage: React.FC = () => {
  return (
    <div className="homepage-unit">
      <CustomDashboardLayout
        customLayoutContent={
          <div
            style={{
              width: "100%",
              display: "flex",
              flexFlow: "column wrap",
            }}
          >
            <UnitContent />
          </div>
        }
      />
    </div>
  );
};

export default UnitParametrizationPage;
