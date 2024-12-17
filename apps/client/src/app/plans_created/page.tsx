import React from "react";

import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import PlansCreatedContent from "@/components/plans_created/PlansCreatedContent";

const plansCreatedPage: React.FC = () => {
  return (
    <div className="homepage-plans-created">
      <CustomDashboardLayout
        customLayoutContent={
          <div
            style={{
              width: "100%",
              display: "flex",
              flexFlow: "column wrap",
            }}
          >
            <PlansCreatedContent />
          </div>
        }
      />
    </div>
  );
};

export default plansCreatedPage;
