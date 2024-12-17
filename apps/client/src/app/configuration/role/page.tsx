import React from "react";

import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import RoleContent from "@/components/configuration/role/RoleContent";

const RoleParametrizationPage: React.FC = () => {
  return (
    <div className="homepage-role">
      <CustomDashboardLayout
        customLayoutContent={
          <div
            style={{
              width: "100%",
              display: "flex",
              flexFlow: "column wrap",
            }}
          >
            <RoleContent />
          </div>
        }
      />
    </div>
  );
};

export default RoleParametrizationPage;
