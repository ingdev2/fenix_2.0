import React from "react";

import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import TeamResearchersContent from "@/components/team_researchers/TeamResearchersContent";

const page: React.FC = () => {
  return (
    <div className="homepage-team-researcher">
      <CustomDashboardLayout
        customLayoutContent={
          <div
            style={{
              width: "100%",
              display: "flex",
              flexFlow: "column wrap",
            }}
          >
            <TeamResearchersContent />
          </div>
        }
      />
    </div>
  );
};

export default page;
