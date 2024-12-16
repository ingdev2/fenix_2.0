import { getColorByCaseType } from "@/utils/enums/caseTypeColor.enum";
import { Button, Space, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";

interface TableColumnProps {
  // handleClickSeeMore: (Record: ISummaryReportInterfaceItem) => void;
  //   summaryReportsReview: ISummaryReportInterfaceItem[] | undefined;
}

const TableColumnsSummaryReportsReview = (): //   {
//       handleClickSeeMore,
//   }
TableColumnProps => [
  {
    title: "Estado",
    dataIndex: "",
    key: "",
    width: 100,
    searchable: true,
  },
  {
    title: "Código",
    dataIndex: "val_cr_filingnumber",
    key: "val_cr_filingnumber",
    width: 100,
    searchable: true,
  },
  {
    title: "Fecha",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 90,
  },
  {
    title: "Documento",
    dataIndex: "val_cr_documentpatient",
    key: "val_cr_documentpatient",
    width: 120,
    searchable: true,
  },
  {
    title: "Tipo de caso",
    dataIndex: "caseType",
    key: "caseType",
    width: 200,
    render: (item: any) => (
      <Tag
        style={{ color: "#000" }}
        color={getColorByCaseType(item?.cas_t_name?.toUpperCase())}
      >
        {item?.cas_t_name || "No disponible"}
      </Tag>
    ),
  },
  {
    title: "Suceso",
    dataIndex: "event",
    key: "event",
    render: (item: any) => <p>{item?.eve_name || "No disponible"}</p>,
  },
  {
    title: "Prioridad",
    dataIndex: "priority",
    key: "priority",
    width: 100,
    render: (item: any) => <p>{item?.prior_name || "No disponible"}</p>,
  },
  {
    title: "Acciones",
    dataIndex: "actions",
    key: "actions",
    fixed: "right",
    width: 70,
    render: (_: any, record: any) => (
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

export default TableColumnsSummaryReportsReview;
