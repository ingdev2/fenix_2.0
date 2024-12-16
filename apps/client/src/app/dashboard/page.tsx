"use client";

import React, { useEffect } from "react";
import { Button, Col, Row } from "antd";
import ReportSearchEngineComponent from "@/components/dashboard/report_search_engine/ReportSearchEngineComponent";
import { FileAddOutlined } from "@ant-design/icons";
import StatisticsComponent from "@/components/dashboard/statistics/StatisticsComponent";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setIdNumberUserSession } from "@/redux/features/user_session/userSessionSlice";
import useAuthValidation from "@/utils/hooks/useAuthValidation";
import { useRoleValidation } from "@/utils/hooks/useRoleValidation";
import { RolesEnum } from "@/utils/enums/roles/roles.enum";
import { usePermissionsAppAndModuleValidation } from "@/utils/hooks/usePermissionsAppAndModuleValidation";
import { ApplicationsEnum } from "@/utils/enums/permissions/applications/applications.enum";
import { ApplicationModulesEnum } from "@/utils/enums/permissions/application_modules/application_modules.enum";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import { useRouter } from "next/navigation";

const DashboardPage: React.FC = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();

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
    console.log("session: ", session);
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
    <div style={{ padding: "16px" }}>
      {showAuthErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={authErrorMessage || "¡Usuario no autenticado!"}
        />
      )}

      <Row style={{ marginBottom: "32px" }}>
        <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
          <ReportSearchEngineComponent />
        </Col>
      </Row>

      <Row style={{ marginBottom: "32px" }}>
        <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
          <Button
            type={"primary"}
            icon={<FileAddOutlined />}
            size={"large"}
            onClick={() => router.push(`/create_report`)}
          >
            Crear Reporte
          </Button>
        </Col>
      </Row>

      <Row>
        <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
          <StatisticsComponent />
        </Col>
      </Row>
    </div>
  );
};
export default DashboardPage;
