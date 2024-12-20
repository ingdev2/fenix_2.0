import { Button, Space, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";

import { customTagCaseTypes } from "@/components/common/custom_tags/CustomTagsCaseType";

const fillingNumberKey: keyof CaseReportValidate = "val_cr_filingnumber";
const eventNameKey: keyof CaseReportValidate = "val_cr_event_id_fk";
const CaseTypeNameKey: keyof CaseReportValidate = "val_cr_casetype_id_fk";
const MovementReportNameKey: keyof CaseReportValidate =
  "val_cr_statusmovement_id_fk";
const PriorityNameKey: keyof CaseReportValidate = "val_cr_priority_id_fk";
const reportAnalystAssignmentTime: keyof CaseReportValidate =
  "reportAnalystAssignment";
const reportResearcherAssignmentTime: keyof CaseReportValidate =
  "reportResearcherAssignment";

interface TableColumnProps {
  caseTypeData: CaseType[] | undefined;
  eventData: Events[] | undefined;
  priorityData: Priority[] | undefined;
  movementReportData: MovementReport[] | undefined;
  handleClickSeeMore: any;
}

const TableColumnsCaseAssignment = ({
  eventData,
  caseTypeData,
  priorityData,
  movementReportData,
  handleClickSeeMore,
}: TableColumnProps) => [
  {
    title: "Estado",
    dataIndex: MovementReportNameKey,
    key: MovementReportNameKey,
    width: 180,
    filters:
      movementReportData?.map((type) => ({
        value: type.mov_r_name,
        text: type.mov_r_name,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.val_cr_statusmovement_id_fk) === String(value);
    },
    ellipsis: true,
    render: (type: string) => type,
  },
  {
    title: "Código",
    dataIndex: fillingNumberKey,
    key: fillingNumberKey,
    width: 120,
    ellipsis: true,
    searchable: true,
    sorter: (a: CaseReportValidate, b: CaseReportValidate) =>
      a.val_cr_filingnumber.length - b.val_cr_filingnumber.length,
  },
  {
    title: "Tipo de caso",
    dataIndex: CaseTypeNameKey,
    key: CaseTypeNameKey,
    width: 180,
    filters:
      caseTypeData?.map((type) => ({
        value: type.cas_t_name,
        text: type.cas_t_name,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.val_cr_casetype_id_fk) === String(value);
    },
    ellipsis: true,
    render: (type: string) => customTagCaseTypes(type),
  },
  {
    title: "Suceso",
    dataIndex: eventNameKey,
    key: eventNameKey,
    width: 220,
    ellipsis: true,
    render: (type: string) => type,
  },
  {
    title: "Prioridad",
    dataIndex: PriorityNameKey,
    key: PriorityNameKey,
    width: 100,
    filters:
      priorityData?.map((type) => ({
        value: type.prior_name,
        text: type.prior_name,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.val_cr_priority_id_fk) === String(value);
    },
    ellipsis: true,
    render: (type: string) => type,
  },
  {
    title: "T. Analista",
    dataIndex: reportAnalystAssignmentTime,
    key: reportAnalystAssignmentTime,
    width: 100,
    ellipsis: true,
    render: (item: ReportAnalystAssignment[]) => {
      const analystAssignment = item?.[0];
      if (analystAssignment?.createdAt) {
        const createdDate = new Date(analystAssignment.createdAt);
        const currentDate = new Date();

        createdDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);

        const timeDiff = currentDate.getTime() - createdDate.getTime();
        const daysElapsed = Math.floor(timeDiff / (1000 * 3600 * 24));
        const daysRemaining = analystAssignment.ana_days - daysElapsed;

        let color = "#002140";
        if (daysRemaining > analystAssignment.ana_days / 2) {
          color = "#1D8348";
        } else if (daysRemaining > 0) {
          color = "#FD7E14";
        } else {
          color = "#8C1111";
        }

        return (
          <p style={{ color }}>
            {daysRemaining >= 0
              ? `${daysRemaining} días restantes`
              : `${Math.abs(daysRemaining)} días vencidos`}
          </p>
        );
      }
      return <p>{"No asignado"}</p>;
    },
  },
  {
    title: "T. Investigador",
    dataIndex: reportResearcherAssignmentTime,
    key: reportResearcherAssignmentTime,
    width: 100,
    ellipsis: true,
    render: (item: ReportResearcherAssignment[]) => {
      const researcherAssignment = item?.[0];
      if (researcherAssignment?.createdAt) {
        const createdDate = new Date(researcherAssignment.createdAt);
        const currentDate = new Date();

        createdDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);

        const timeDiff = currentDate.getTime() - createdDate.getTime();
        const daysElapsed = Math.floor(timeDiff / (1000 * 3600 * 24));
        const daysRemaining = researcherAssignment.res_days - daysElapsed;

        let color = "black";
        if (daysRemaining > researcherAssignment.res_days / 2) {
          color = "green";
        } else if (daysRemaining > 0) {
          color = "orange";
        } else {
          color = "red";
        }

        return (
          <p style={{ color }}>
            {daysRemaining >= 0
              ? `${daysRemaining} días restantes`
              : `${Math.abs(daysRemaining)} días vencidos`}
          </p>
        );
      }
      return <p>{"No asignado"}</p>;
    },
  },
  {
    title: "Acciones",
    dataIndex: "actions",
    key: "actions",
    fixed: "right" as "right",
    ellipsis: true,
    width: 70,
    render: (_: any, record: CaseReportValidate) => (
      <Space size="small">
        <Button
          size="small"
          type="primary"
          title="Detalles"
          shape="circle"
          icon={<EyeOutlined />}
          style={{ background: "#6F42C1", color: "#ffffff" }}
          onClick={() => handleClickSeeMore(record.id)}
        />
      </Space>
    ),
  },
];

export default TableColumnsCaseAssignment;
