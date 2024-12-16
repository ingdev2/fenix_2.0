import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import { Flex, Space } from "antd";
import { statusOptions } from "@/utils/enums/statusOptions.enum";
import EditEventButtonComponent from "../buttons/EditEventButton";

const eventNameKey: keyof Event = "eve_name";
const eventTypeKey: keyof Event = "eventType";
const unitKey: keyof Event = "unit";
const eventStatusKey: keyof Event = "eve_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
  eventData: Event[] | undefined;
}

const TableColumnsEvent = ({
  handleClickDelete,
  onRefetchRegister,
  eventData,
}: TableColumnProps) => [
  {
    title: "Suceso",
    dataIndex: eventNameKey,
    key: eventNameKey,
    ellipsis: true,
    width: 330,
    searchable: true,
    sorter: (a: Event, b: Event) => a.eve_name.length - b.eve_name.length,
  },
  {
    title: "Estrategia",
    dataIndex: eventTypeKey,
    key: eventTypeKey,
    width: 280,
    ellipsis: true,
    filters: Array.from(
      new Set(eventData?.map((list) => list.eventType?.eve_t_name))
    ).map((name) => ({
      text: name || "No disponible",
      value: name || "No disponible",
    })),
    onFilter: (value: any, record: any) =>
      record.eventType?.eve_t_name.includes(value as string),
    sorter: (a: Event, b: Event) =>
      a.eventType?.eve_t_name.length - b.eventType?.eve_t_name.length,
    render: (item: any) => <p>{item?.eve_t_name || "No disponible"}</p>,
  },
  {
    title: "Unidad",
    dataIndex: unitKey,
    key: unitKey,
    ellipsis: true,
    width: 150,
    filters: Array.from(
      new Set(eventData?.map((list) => list.unit?.unit_name))
    ).map((name) => ({
      text: name || "No disponible",
      value: name || "No disponible",
    })),
    onFilter: (value: any, record: any) => {
      if (value === "No disponible") {
        return !record.unit?.unit_name;
      }
      return record.unit?.unit_name.includes(value as string);
    },
    sorter: (a: Event, b: Event) =>
      a.unit?.unit_name.length - b.unit?.unit_name.length,
    render: (item: any) => <p>{item?.unit_name || "No disponible"}</p>,
  },
  {
    title: "Estado",
    dataIndex: eventStatusKey,
    key: eventStatusKey,
    ellipsis: true,
    fixed: "right" as "right",
    width: 100,
    render: (item: Event) => (
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
    fixed: "right" as "right",
    ellipsis: true,
    width: 75,
    render: (_: any, record: Event) => (
      <Space size={"small"}>
        <EditEventButtonComponent
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

export default TableColumnsEvent;
