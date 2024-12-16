"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useSession } from "next-auth/react";

import ProtocolContent from "@/components/configuration/protocol/ProtocolContent";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";

import { setIdNumberUserSession } from "@/redux/features/user_session/userSessionSlice";
import { RolesEnum } from "@/utils/enums/roles/roles.enum";

import useAuthValidation from "@/utils/hooks/useAuthValidation";
import { useRoleValidation } from "@/utils/hooks/useRoleValidation";

const ProtocolParametrizationPage = () => {
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
    <div className="homepage-protocol">
      {showAuthErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={authErrorMessage || "¡Usuario no autenticado!"}
        />
      )}
      <ProtocolContent />
    </div>
  );
};

export default ProtocolParametrizationPage;
