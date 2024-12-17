"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

import { Button, Col, Row } from "antd";
import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import ReportSearchEngineComponent from "@/components/dashboard/report_search_engine/ReportSearchEngineComponent";
import StatisticsComponent from "@/components/dashboard/Statistics/StatisticsComponent";
import { FileAddOutlined } from "@ant-design/icons";

import useAuthValidation from "@/utils/hooks/use_auth_validation";
import { useRoleValidation } from "@/utils/hooks/use_role_validation";
import { usePermissionsAppAndModuleValidationInPage } from "@/utils/hooks/use_permissions_app_and_module_validation_in_page";

import { setIdNumberUserSession } from "@/redux/features/user_session/userSessionSlice";
import {
  setIsPageLoading,
  setSelectedKey,
} from "@/redux/features/common/modal/modalSlice";

import { RolesEnum } from "@/utils/enums/roles/roles.enum";
import { ApplicationsEnum } from "@/utils/enums/permissions/applications/applications.enum";
import { ApplicationModulesEnum } from "@/utils/enums/permissions/application_modules/application_modules.enum";
import { ItemKeys } from "@/components/common/custom_dashboard_layout/enums/item_names_and_keys.enums";

const DashboardPage: React.FC = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();

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
    <CustomDashboardLayout
      customLayoutContent={
        <div
          style={{
            width: "100%",
            display: "flex",
            flexFlow: "column wrap",
          }}
        >
          <div style={{ padding: "16px" }}>
            <Row style={{ marginBottom: "32px" }}>
              <Col
                span={24}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <ReportSearchEngineComponent />
              </Col>
            </Row>

            <Row style={{ marginBottom: "32px" }}>
              <Col
                span={24}
                style={{ display: "flex", justifyContent: "center" }}
              >
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
              <Col
                span={24}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <StatisticsComponent />
              </Col>
            </Row>
          </div>
        </div>
      }
    />
  );
};
export default DashboardPage;
