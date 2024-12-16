"use client";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CreateReportContent from "@/components/create_report/CreateReportContent";
import { setIdNumberUserSession } from "@/redux/features/user_session/userSessionSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RolesEnum } from "@/utils/enums/roles/roles.enum";
import useAuthValidation from "@/utils/hooks/useAuthValidation";
import { useRoleValidation } from "@/utils/hooks/useRoleValidation";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

const CreateReportPage: React.FC = () => {
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
    <div className="homepage-create-report">
      {showAuthErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={authErrorMessage || "¡Usuario no autenticado!"}
        />
      )}
      <CreateReportContent />
    </div>
  );
};

export default CreateReportPage;
