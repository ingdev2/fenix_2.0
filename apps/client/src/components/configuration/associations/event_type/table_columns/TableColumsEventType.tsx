import CustomDeletePopConfirm from "@/components/common/custom_pop_confirm/CustomDeletePopConfirm";
import { Flex, Space, Tag } from "antd";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import { statusOptions } from "@/utils/enums/statusOptions.enum";
import EditEventTypeButtonComponent from "../buttons/EditEventTypeButtonComponent";
import { customTagCaseTypes } from "@/components/common/custom_tags/CustomTagsCaseType";

const caseTypeKey: keyof EventType = "eve_t_casetype_id_fk";
const oncologyCategoryKey: keyof EventType = "eve_t_oncologycategory_id_fk";
const characterizationCaseKey: keyof EventType =
  "eve_t_characterizationcase_id_fk";
const eventTypeNameKey: keyof EventType = "eve_t_name";
const eventTypeStatusKey: keyof EventType = "eve_t_status";

interface TableColumnProps {
  handleClickDelete: (recordId: number) => void;
  onRefetchRegister: () => void;
  caseTypeData: CaseType[] | undefined;
  oncologyCategoryData: OncologyCategory[] | undefined;
  characterizationCaseData: CharacterizationCase[] | undefined;
}

const TableColumnsEventType = ({
  handleClickDelete,
  onRefetchRegister,
  caseTypeData,
  oncologyCategoryData,
  characterizationCaseData,
}: TableColumnProps) => [
  {
    title: "Estrategia",
    dataIndex: eventTypeNameKey,
    key: eventTypeNameKey,
    ellipsis: true,
    searchable: true,
    width: 330,
    sorter: (a: EventType, b: EventType) =>
      a.eve_t_name.length - b.eve_t_name.length,
  },
  {
    title: "Cantidad de Sucesos",
    dataIndex: "event",
    key: "event",
    width: 130,
    render: (item: string) => item.length,
  },
  {
    title: "Tipo de caso",
    key: caseTypeKey,
    dataIndex: caseTypeKey,
    width: 200,
    // filters: Array.from(
    //   new Set(eventTypeData?.map((list) => list.caseType?.cas_t_name))
    // ).map((name) => ({
    //   text: name || "No disponible",
    //   value: name || "No disponible",
    // })),
    // onFilter: (value: any, record: any) =>
    //   record.caseType?.cas_t_name.includes(value as string),
    // sorter: (a: EventType, b: EventType) =>
    //   a.caseType?.cas_t_name.length - b.caseType?.cas_t_name.length,
    // render: (item: any) => (
    //   <Tag
    //     style={{ color: "#000" }}
    //     color={getColorByCaseType(item?.cas_t_name?.toUpperCase())}
    //   >
    //     {item?.cas_t_name || "No disponible"}
    //   </Tag>
    // ),
    filters:
      caseTypeData?.map((type) => ({
        value: type.cas_t_name,
        text: type.cas_t_name,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.eve_t_casetype_id_fk) === String(value);
    },
    ellipsis: true,
    render: (type: string) => customTagCaseTypes(type),
  },
  {
    title: "Categoria oncológica",
    key: oncologyCategoryKey,
    dataIndex: oncologyCategoryKey,
    width: 200,
    filters:
      oncologyCategoryData?.map((type) => ({
        value: type.onc_c_name,
        text: type.onc_c_name,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.eve_t_oncologycategory_id_fk) === String(value);
    },
    ellipsis: true,
    render: (type: string) => type,
  },
  {
    title: "Caracterización",
    key: characterizationCaseKey,
    dataIndex: characterizationCaseKey,
    width: 200,
    filters:
      characterizationCaseData?.map((type) => ({
        value: type.cha_c_name,
        text: type.cha_c_name,
      })) || [],
    onFilter: (value: any, record: any) => {
      return String(record.eve_t_characterizationcase_id_fk) === String(value);
    },
    ellipsis: true,
    render: (type: string) => type,
  },
  {
    title: "Estado",
    dataIndex: eventTypeStatusKey,
    key: eventTypeStatusKey,
    width: 100,
    ellipsis: true,
    fixed: "right" as "right",
    render: (item: Service) => (
      <Flex justify="center">
        {item ? (
          <CustomTags colorCustom="green" labelCustom={statusOptions.ENABLED} />
        ) : (
          <CustomTags colorCustom="red" labelCustom={statusOptions.CANCELED} />
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
    render: (_: any, record: EventType) => (
      <Space size={"small"}>
        <EditEventTypeButtonComponent
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

export default TableColumnsEventType;
