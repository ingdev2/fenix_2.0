"use client";

import React, { useEffect } from "react";
import SummaryReportReviewContent from "@/components/summary_report_review/SummaryReportReviewContent";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import useAuthValidation from "@/utils/hooks/useAuthValidation";
import { RolesEnum } from "@/utils/enums/roles/roles.enum";
import { useRoleValidation } from "@/utils/hooks/useRoleValidation";
import { setIdNumberUserSession } from "@/redux/features/user_session/userSessionSlice";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";

const SummaryReportReviewPage = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const { showAuthErrorMessage, authErrorMessage } = useAuthValidation();

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
    <div className={"homepage-summary-review"}>
      {showAuthErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={authErrorMessage || "¡Usuario no autenticado!"}
        />
      )}
      <SummaryReportReviewContent />
    </div>
  );
};

export default SummaryReportReviewPage;
