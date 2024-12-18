"use client";

import React, { useEffect } from "react";

import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import TeamResearchersContent from "@/components/team_researchers/TeamResearchersContent";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import useAuthValidation from "@/utils/hooks/use_auth_validation";
import { RolesEnum } from "@/utils/enums/roles/roles.enum";
import { useRoleValidation } from "@/utils/hooks/use_role_validation";
import { setIdNumberUserSession } from "@/redux/features/user_session/userSessionSlice";

const TeamResearchersPage = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  useAuthValidation();

  const allowedRoles = [RolesEnum.COLLABORATOR];
  useRoleValidation(allowedRoles);

  // usePermissionsAppAndModuleValidation({
  //   allowedApplications: [ApplicationsEnum.FÉNIX],
  //   allowedModules: [ApplicationModulesEnum.FÉNIX_CLINICAL_CONDITION_MANAGEMENT],
  // });

  const idNumberUserSessionState = useAppSelector(
    (state) => state.userSession.id_number
  );

  useEffect(() => {
    if (
      !idNumberUserSessionState &&
      status === "authenticated" &&
      session &&
      session.user.id_number
    ) {
      const userIdNumber = session.user.id_number;

      dispatch(setIdNumberUserSession(userIdNumber));
    }
  }, [session, status, idNumberUserSessionState]);

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

export default TeamResearchersPage;
