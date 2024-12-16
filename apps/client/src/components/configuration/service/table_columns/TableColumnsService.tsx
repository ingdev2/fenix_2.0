import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import { Flex, Space } from "antd";
import { statusOptions } from "@/utils/enums/statusOptions.enum";
import EditServiceButtonComponent from "../buttons/EditServiceButton";

const serviceNameKey: keyof Service = "serv_name";
const serviceDescriptionKey: keyof Service = "serv_description";
const unitKey: keyof Service = "unit";
const serviceStatusKey: keyof Service = "serv_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
  serviceData: Service[] | undefined;
}

const TableColumnsService = ({
  handleClickDelete,
  onRefetchRegister,
  serviceData,
}: TableColumnProps) => [
  {
    title: "Servicio",
    dataIndex: serviceNameKey,
    key: serviceNameKey,
    ellipsis: true,
    width: 300,
    searchable: true,
    sorter: (a: Service, b: Service) => a.serv_name.length - b.serv_name.length,
  },
  {
    title: "Descripción",
    dataIndex: serviceDescriptionKey,
    key: serviceDescriptionKey,
    ellipsis: true,
    width: 210,
    searchable: true,
    sorter: (a: Service, b: Service) => {
      const aValue = a.serv_description || "";
      const bValue = b.serv_description || "";
      return aValue.length - bValue.length;
    },
  },
  {
    title: "Unidad",
    dataIndex: unitKey,
    key: unitKey,
    ellipsis: true,
    width: 300,
    filters: Array.from(
      new Set(serviceData?.map((list) => list.unit?.unit_name))
    ).map((name) => ({
      text: name || "No disponible",
      value: name || "No disponible",
    })),
    // onFilter: (value: any, record: any) => {
    //   if (value === "No disponible") {
    //     return !record.unit?.unit_name;
    //   }
    //   return record.unit?.unit_name.includes(value as string);
    // },
    onFilter: (value: any, record: any) =>
      record.unit?.unit_name.includes(value as string),
    sorter: (a: Service, b: Service) =>
      a.unit?.unit_name.length - b.unit?.unit_name.length,
    render: (item: any) => <p>{item?.unit_name || "No disponible"}</p>,
  },
  {
    title: "Estado",
    dataIndex: serviceStatusKey,
    key: serviceStatusKey,
    width: 100,
    ellipsis: true,
    fixed: "right" as "right",
    render: (item: Service) => (
      <Flex justify="center">
        {item ? (
          <CustomTags
            colorCustom="green"
            labelCustom={statusOptions.ENABLED}
          />
        ) : (
          <CustomTags
            colorCustom="red"
            labelCustom={statusOptions.CANCELED}
          />
        )}
      </Flex>
    ),
  },
  {
    title: "Acciones",
    dataIndex: "actions",
    key: "actions",
    width: 75,
    ellipsis: true,
    fixed: "right" as "right",
    render: (_: any, record: Service) => (
      <Space size={"small"}>
        <EditServiceButtonComponent
          dataRecord={record}
          onRefectRegister={onRefetchRegister}
        />
        <CustomDeletePopConfirm
          onConfirm={() => handleClickDelete(record.id)}
          titleButton="Eliminar"
          title="Eliminar registro"
          description="¿Estás seguro de que deseas eliminar este registro?"
        />
      </Space>
    ),
  },
];

export default TableColumnsService;
