import { Button, Space, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { customTagCaseTypes } from "@/components/common/custom_tags/CustomTagsCaseType";
import { calculateRemainingDays } from "@/helpers/calculate_remaining_days/calculate_remaining_days";

const fillingNumberKey: keyof CaseReportValidate = "val_cr_filingnumber";
const eventNameKey: keyof CaseReportValidate = "val_cr_event_id_fk";
const CaseTypeNameKey: keyof CaseReportValidate = "val_cr_casetype_id_fk";
const PriorityNameKey: keyof CaseReportValidate = "val_cr_priority_id_fk";
const reportAnalystAssignmentTimeKey: keyof CaseReportValidate =
  "reportAnalystAssignment";
const reportResearcherAssignmentTimeKey: keyof CaseReportValidate =
  "reportResearcherAssignment";
const documentPatientKey: keyof CaseReportValidate = "val_cr_documentpatient";

interface TableColumnProps {
  caseTypeData: CaseType[] | undefined;
  priorityData: Priority[] | undefined;
  handleClickSeeMore: any;
}

const TableColumnsAssignedCases = ({
  caseTypeData,
  priorityData,
  handleClickSeeMore,
}: TableColumnProps) => [
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
    title: "Documento",
    dataIndex: documentPatientKey,
    key: documentPatientKey,
    width: 120,
    ellipsis: true,
    searchable: true,
    sorter: (a: CaseReportValidate, b: CaseReportValidate) =>
      (a.val_cr_documentpatient ?? "").length -
      (b.val_cr_documentpatient ?? "").length,
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
    dataIndex: reportAnalystAssignmentTimeKey,
    key: reportAnalystAssignmentTimeKey,
    width: 100,
    ellipsis: true,
    render: (item: ReportAnalystAssignment[]) => {
      const analystAssignment = item?.[0];
      if (analystAssignment?.createdAt) {
        const { text, color } = calculateRemainingDays(
          analystAssignment.createdAt,
          analystAssignment.ana_days
        );
        return <p style={{ color }}>{text}</p>;
      }
      return <p>{"No asignado"}</p>;
    },
  },
  {
    title: "T. Investigador",
    dataIndex: reportResearcherAssignmentTimeKey,
    key: reportResearcherAssignmentTimeKey,
    width: 100,
    ellipsis: true,
    render: (item: ReportResearcherAssignment[]) => {
      const researcherAssignment = item?.[0];
      if (researcherAssignment?.createdAt) {
        const { text, color } = calculateRemainingDays(
          researcherAssignment.createdAt,
          researcherAssignment.res_days
        );
        return <p style={{ color }}>{text}</p>;
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
        />
      </Space>
    ),
  },
];

export default TableColumnsAssignedCases;
