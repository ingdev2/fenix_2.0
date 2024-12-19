"use client";

import React, { useEffect } from "react";

import { MenuItem } from "@/helpers/get_item_menu_dashboard_layout/types/menu_item_type";
import { getItem } from "@/helpers/get_item_menu_dashboard_layout/get_item_menu_dashboard_layout";
import {
  AlertOutlined,
  AuditOutlined,
  BookOutlined,
  DesktopOutlined,
  FolderViewOutlined,
  IssuesCloseOutlined,
  MonitorOutlined,
  PieChartOutlined,
  SecurityScanOutlined,
  SettingOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { LuShieldAlert } from "react-icons/lu";
import { FaChartColumn } from "react-icons/fa6";
import { RiTeamLine } from "react-icons/ri";

import {
  ItemKeys,
  ItemNames,
} from "@/components/common/custom_dashboard_layout/enums/item_names_and_keys.enums";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { ApplicationsEnum } from "@/utils/enums/permissions/applications/applications.enum";
import { ApplicationModulesEnum } from "@/utils/enums/permissions/application_modules/application_modules.enum";
import { PermissionsAppAndModuleValidationInComponent } from "@/helpers/permission_validation/permissionsAppAndModuleValidationInComponent";
import { setIdNumberUserSession } from "@/redux/features/user_session/userSessionSlice";
import { useGetUserActiveByIdNumberQuery } from "@/redux/apis/users_b_hub/verifyActiveUserApi";

export const useMenuItems = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const idNumberUserSession = session?.user?.id_number;

  const dashboardModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_DASHBOARD],
  });

  const notificationsModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_NOTIFICATIONS],
  });

  const createReportsModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_CREATE_REPORT],
  });

  const summaryModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_SUMMARY],
  });

  const synergyModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_SYNERGY],
  });

  const validateCasesModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_VALIDATE_CASES],
  });

  const otherCasesModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_OTHER_CASES],
  });

  const caseAssignmentModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_CASE_ASSIGNMENT],
  });

  const myCasesModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_MY_CASES],
  });

  const informationsModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_INFORMATION],
  });

  const followUpModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_FOLLOWUPS],
  });

  const createdPlansModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_CREATED_PLANS],
  });

  const monitoringModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_MONITORING],
  });

  const riskAnalysisModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_RISK_ANALYSIS],
  });

  const riskSummaryModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_RISK_SUMMARY],
  });

  const riskMatrixModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_RISK_MATRIX],
  });

  const riskInformationModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_RISK_INFORMATION],
  });

  const patientSecurityStrategiesModule =
    PermissionsAppAndModuleValidationInComponent({
      allowedApplications: [ApplicationsEnum.FÉNIX],
      allowedModules: [
        ApplicationModulesEnum.FENIX_PATIENT_SECURITY_STRATEGIES,
      ],
    });

  const patientSecurityinformationModule =
    PermissionsAppAndModuleValidationInComponent({
      allowedApplications: [ApplicationsEnum.FÉNIX],
      allowedModules: [
        ApplicationModulesEnum.FENIX_PATIENT_SECURITY_INFORMATON,
      ],
    });

  const sanctionFrameworkModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_SANCTION_FRAMEWORK],
  });

  const cycleClosureModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_CYCLE_CLOSURE],
  });

  const indicatorsModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_INDICATORS],
  });

  const eventTypesModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_EVENT_TYPES],
  });

  const eventsModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_EVENTS],
  });

  const caseTypesModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_CASE_TYPES],
  });

  const riskTypesModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_RISK_TYPES],
  });

  const severityClasificationsModule =
    PermissionsAppAndModuleValidationInComponent({
      allowedApplications: [ApplicationsEnum.FÉNIX],
      allowedModules: [ApplicationModulesEnum.FENIX_SEVERITY_CLASSIFICATIONS],
    });

  const prioritiesModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_PRIORITIES],
  });

  const unitsModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_UNITS],
  });

  const servicesModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_SERVICES],
  });

  const originsModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_ORIGINS],
  });

  const subOriginsModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_SUB_ORIGINS],
  });

  const riskLevelsModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_RISK_LEVELS],
  });

  const caseCharacterizationModule =
    PermissionsAppAndModuleValidationInComponent({
      allowedApplications: [ApplicationsEnum.FÉNIX],
      allowedModules: [ApplicationModulesEnum.FENIX_CASE_CHARACTERIZATION],
    });

  const rolesModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_ROLES],
  });

  const researchInstrumentsModule =
    PermissionsAppAndModuleValidationInComponent({
      allowedApplications: [ApplicationsEnum.FÉNIX],
      allowedModules: [ApplicationModulesEnum.FENIX_RESEARCH_INSTRUMENTS],
    });

  const deviceTypesModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_DEVICE_TYPES],
  });

  const damageTypesModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_DAMAGE_TYPES],
  });

  const fluidTypesModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_FLUID_TYPES],
  });

  const influenceFactorsModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_INFLUENCE_FACTORS],
  });

  const failedMeasuresModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_FAILED_MEASURES],
  });

  const riskFactorsModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_RISK_FACTORS],
  });

  const safetyBarriersModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_SAFETY_BARRIERS],
  });

  const protocolsModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_PROTOCOLS],
  });

  const unsafeActionsModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_UNSAFE_ACTIONS],
  });

  const returnReasonModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_RETURN_REASONS],
  });

  const movementsModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_MOVEMENTS],
  });

  const treatmentCategoryModule = PermissionsAppAndModuleValidationInComponent({
    allowedApplications: [ApplicationsEnum.FÉNIX],
    allowedModules: [ApplicationModulesEnum.FENIX_TREATMENT_CATEGORY],
  });

  const idNumberUserSessionState = useAppSelector(
    (state) => state.userSession.id_number
  );

  const {
    data: userSessionData,
    isLoading: userSessionLoading,
    isFetching: userSessionFetching,
    error: userSessionError,
  } = useGetUserActiveByIdNumberQuery(idNumberUserSessionState);

  useEffect(() => {
    if (!idNumberUserSessionState) {
      dispatch(setIdNumberUserSession(idNumberUserSession));
    }
  }, [idNumberUserSessionState]);

  const waitAdminData =
    idNumberUserSession && idNumberUserSessionState && userSessionData;

  if (waitAdminData) {
    const items: MenuItem[] = [
      dashboardModule
        ? getItem(
            ItemNames.ITEM_DASHBOARD,
            `${ItemKeys.ITEM_DASHBOARD_KEY}`,
            <PieChartOutlined />
          )
        : null,

      notificationsModule
        ? getItem(
            ItemNames.ITEM_NOTIFICATIONS,
            `${ItemKeys.ITEM_NOTIFICATIONS_KEY}`,
            <AlertOutlined />
          )
        : null,

      createReportsModule
        ? getItem(
            ItemNames.ITEM_CREATE_REPORT,
            `${ItemKeys.ITEM_CREATE_REPORT_KEY}`,
            <SolutionOutlined />
          )
        : null,

      summaryModule
        ? getItem(
            ItemNames.ITEM_SUMMARY,
            `${ItemKeys.ITEM_SUMMARY_KEY}`,
            <DesktopOutlined />
          )
        : null,

      synergyModule
        ? getItem(
            ItemNames.ITEM_SYNERGY,
            `${ItemKeys.ITEM_SYNERGY_KEY}`,
            <RiTeamLine />
          )
        : null,

      validateCasesModule || otherCasesModule
        ? getItem(
            ItemNames.ITEM_VALIDATION,
            ItemKeys.ITEM_VALIDATION_KEY,
            <SecurityScanOutlined />,
            [
              validateCasesModule
                ? getItem(
                    ItemNames.SUB_VALIDATE_CASES,
                    ItemKeys.SUB_VALIDATE_CASES_KEY
                  )
                : null,
              otherCasesModule
                ? getItem(
                    ItemNames.SUB_OTHER_CASES,
                    ItemKeys.SUB_OTHER_CASES_KEY
                  )
                : null,
            ]
          )
        : null,

      caseAssignmentModule || myCasesModule || informationsModule
        ? getItem(
            ItemNames.ITEM_ANALYSIS,
            ItemKeys.ITEM_ANALYSIS_KEY,
            <MonitorOutlined />,
            [
              caseAssignmentModule
                ? getItem(
                    ItemNames.SUB_CASE_ASSIGNMENT,
                    ItemKeys.SUB_CASE_ASSIGNMENT_KEY
                  )
                : null,

              myCasesModule
                ? getItem(ItemNames.SUB_MY_CASES, ItemKeys.SUB_MY_CASE_KEY)
                : null,

              informationsModule
                ? getItem(
                    ItemNames.SUB_INFORMATION,
                    ItemKeys.SUB_CASE_INFORMATION_KEY
                  )
                : null,
            ]
          )
        : null,

      followUpModule
        ? getItem(
            ItemNames.ITEM_FOLLOW_UPS,
            ItemKeys.ITEM_FOLLOW_UPS_KEY,
            <FolderViewOutlined />
          )
        : null,

      createdPlansModule || monitoringModule
        ? getItem(
            ItemNames.ITEM_ACTION_PLANS,
            ItemKeys.ITEM_ACTION_PLANS_KEY,
            <BookOutlined />,
            [
              createdPlansModule
                ? getItem(
                    ItemNames.SUB_CREATED_PLANS,
                    ItemKeys.SUB_PLANS_CREATED_KEY
                  )
                : null,
              monitoringModule
                ? getItem(ItemNames.SUB_MONITORING, ItemKeys.SUB_MONITORING_KEY)
                : null,
            ]
          )
        : null,

      riskAnalysisModule ||
      riskSummaryModule ||
      riskMatrixModule ||
      riskInformationModule
        ? getItem(
            ItemNames.ITEM_RISK,
            ItemKeys.ITEM_RISK_KEY,
            <LuShieldAlert />,
            [
              riskAnalysisModule
                ? getItem(
                    ItemNames.SUB_RISK_ANALYSIS,
                    ItemKeys.SUB_RISK_ANALYSIS_KEY
                  )
                : null,
              riskSummaryModule
                ? getItem(
                    ItemNames.SUB_RISK_SUMMARY,
                    ItemKeys.SUB_RISK_SUMMARY_KEY
                  )
                : null,
              riskMatrixModule
                ? getItem(
                    ItemNames.SUB_RISK_MATRIX,
                    ItemKeys.SUB_RISK_MATRIX_KEY
                  )
                : null,
              riskInformationModule
                ? getItem(
                    ItemNames.SUB_RISK_INFORMATION,
                    ItemKeys.SUB_RISK_INFORMATION_KEY
                  )
                : null,
            ]
          )
        : null,

      patientSecurityStrategiesModule ||
      patientSecurityinformationModule ||
      sanctionFrameworkModule
        ? getItem(
            ItemNames.ITEM_SP_PROGRAM,
            ItemKeys.ITEM_SP_PROGRAM_KEY,
            <AuditOutlined />,
            [
              patientSecurityStrategiesModule
                ? getItem(
                    ItemNames.SUB_PATIENT_SECURITY_STRATEGIES,
                    ItemKeys.SUB_STRATEGIES_KEY
                  )
                : null,
              patientSecurityinformationModule
                ? getItem(
                    ItemNames.SUB_PATIENT_SECURITY_INFORMATION,
                    ItemKeys.SUB_SP_INFORMATION_KEY
                  )
                : null,
              sanctionFrameworkModule
                ? getItem(
                    ItemNames.SUB_SANCTIONS_FRAMEWORK,
                    ItemKeys.SUB_SANCTIONS_FRAMEWORK_KEY
                  )
                : null,
            ]
          )
        : null,

      cycleClosureModule
        ? getItem(
            ItemNames.ITEM_CYCLE_CLOSURE,
            ItemKeys.ITEM_CLOSING_CYCLE_KEY,
            <IssuesCloseOutlined />
          )
        : null,

      indicatorsModule
        ? getItem(
            ItemNames.ITEM_INDICATORS,
            ItemKeys.ITEM_INDICATORS_KEY,
            <FaChartColumn />
          )
        : null,

      getItem(
        ItemNames.ITEM_CONFIGURATION,
        ItemKeys.ITEM_CONFIGURATION_KEY,
        <SettingOutlined />,
        [
          eventTypesModule
            ? getItem(ItemNames.SUB_EVENT_TYPES, ItemKeys.SUB_EVENT_TYPE_KEY)
            : null,
          eventsModule
            ? getItem(ItemNames.SUB_EVENTS, ItemKeys.SUB_EVENT_KEY)
            : null,
          caseTypesModule
            ? getItem(ItemNames.SUB_CASE_TYPES, ItemKeys.SUB_CASE_TYPES_KEY)
            : null,
          riskTypesModule
            ? getItem(ItemNames.SUB_RISK_TYPES, ItemKeys.SUB_RISK_TYPES_KEY)
            : null,
          severityClasificationsModule
            ? getItem(
                ItemNames.SUB_SEVERITY_CLASIFICATIONS,
                ItemKeys.SUB_SEVERITY_CLASIFICATIONS_KEY
              )
            : null,
          prioritiesModule
            ? getItem(ItemNames.SUB_PRIORITIES, ItemKeys.SUB_PRIORITIES_KEY)
            : null,
          unitsModule
            ? getItem(ItemNames.SUB_UNITS, ItemKeys.SUB_UNITS_KEY)
            : null,
          servicesModule
            ? getItem(ItemNames.SUB_SERVICES, ItemKeys.SUB_SERVICES_KEY)
            : null,
          originsModule
            ? getItem(ItemNames.SUB_ORIGINS, ItemKeys.SUB_ORIGINS_KEY)
            : null,
          subOriginsModule
            ? getItem(ItemNames.SUB_SUB_ORIGINS, ItemKeys.SUB_SUB_ORIGINS_KEY)
            : null,
          riskLevelsModule
            ? getItem(ItemNames.SUB_RISK_LEVELS, ItemKeys.SUB_RISK_LEVELS_KEY)
            : null,
          caseCharacterizationModule
            ? getItem(
                ItemNames.SUB_CASE_CHARACTERIZATION,
                ItemKeys.SUB_CASE_CHARACTERIZATION_KEY
              )
            : null,
          rolesModule
            ? getItem(ItemNames.SUB_ROLES, ItemKeys.SUB_ROLE_KEY)
            : null,
          researchInstrumentsModule
            ? getItem(
                ItemNames.SUB_RESEARCH_INSTRUMENTS,
                ItemKeys.SUB_RESEARCH_INSTRUMENTS_KEY
              )
            : null,
          deviceTypesModule
            ? getItem(ItemNames.SUB_DEVICE_TYPES, ItemKeys.SUB_DEVICE_TYPES_KEY)
            : null,
          damageTypesModule
            ? getItem(ItemNames.SUB_DAMAGE_TYPES, ItemKeys.SUB_DAMAGE_TYPES_KEY)
            : null,
          fluidTypesModule
            ? getItem(ItemNames.SUB_FLUID_TYPES, ItemKeys.SUB_FLUID_TYPES_KEY)
            : null,
          influenceFactorsModule
            ? getItem(
                ItemNames.SUB_INFLUENCY_FACTORS,
                ItemKeys.SUB_INFLUENCY_FACTORS_KEY
              )
            : null,
          failedMeasuresModule
            ? getItem(
                ItemNames.SUB_FAILED_MEASURES,
                ItemKeys.SUB_FAILED_MEASURES_KEY
              )
            : null,
          riskFactorsModule
            ? getItem(ItemNames.SUB_RISK_FACTORS, ItemKeys.SUB_RISK_FACTORS_KEY)
            : null,
          safetyBarriersModule
            ? getItem(
                ItemNames.SUB_SAFETY_BARRIERS,
                ItemKeys.SUB_SAFETY_BARRIERS_KEY
              )
            : null,
          protocolsModule
            ? getItem(ItemNames.SUB_PROTOCOLS, ItemKeys.SUB_PROTOCOLS_KEY)
            : null,
          unsafeActionsModule
            ? getItem(
                ItemNames.SUB_UNSAFE_ACTIONS,
                ItemKeys.SUB_UNSAFE_ACTIONS_KEY
              )
            : null,
          returnReasonModule
            ? getItem(
                ItemNames.SUB_RETURN_REASONS_CASE,
                ItemKeys.SUB_RETURN_REASONS_CASE_KEY
              )
            : null,
          movementsModule
            ? getItem(ItemNames.SUB_MOVEMENTS, ItemKeys.SUB_MOVEMENTS_KEY)
            : null,
          treatmentCategoryModule
            ? getItem(
                ItemNames.SUB_TREATMENT_CATEGORY,
                ItemKeys.SUB_TREATMENT_CATEGORY_KEY
              )
            : null,
        ]
      ),
    ];

    return items;
  }
};
