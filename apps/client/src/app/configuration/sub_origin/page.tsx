import React from "react";

import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import SubOriginContent from "@/components/configuration/sub_origin/SubOriginContent";

const SubOriginParametrizationPage: React.FC = () => {
  return (
    <div className="homepage-sub-origin">
      <CustomDashboardLayout
        customLayoutContent={
          <div
            style={{
              width: "100%",
              display: "flex",
              flexFlow: "column wrap",
            }}
          >
            <SubOriginContent />
          </div>
        }
      />
    </div>
  );
};

export default SubOriginParametrizationPage;
