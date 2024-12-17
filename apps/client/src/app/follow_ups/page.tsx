import React from "react";

import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import FollowUpsContent from "@/components/follow_up/follow_up_content/FollowUpsContent";

const FollowUpsPage: React.FC = () => {
  return (
    <div className="homepage-follow-ups">
      <CustomDashboardLayout
        customLayoutContent={
          <div
            style={{
              width: "100%",
              display: "flex",
              flexFlow: "column wrap",
            }}
          >
            <FollowUpsContent />
          </div>
        }
      />
    </div>
  );
};

export default FollowUpsPage;
