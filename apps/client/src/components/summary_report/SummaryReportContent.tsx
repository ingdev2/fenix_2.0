"use client";

import React, { useEffect, useRef, useState } from "react";

import {
  Button,
  Space,
  Table,
  Row,
  Col,
  Skeleton,
  Empty,
  Input,
  DatePicker,
} from "antd";
import type {
  InputRef,
  TableColumnsType,
  TableColumnType,
  TableProps,
} from "antd";
import {
  ReloadOutlined,
  LoadingOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import dayjs, { Dayjs } from "dayjs";
import { FilterDropdownProps } from "antd/es/table/interface";

import { getSummaryReports } from "@/api/case_report_validate";

type OnChange = NonNullable<TableProps<CaseReportValidate>["onChange"]>;
type Filters = Parameters<OnChange>[1];
type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;
type DataIndex = keyof CaseReportValidate;

const SummaryReportContent: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [summaryReports, setSummaryReports] = useState<CaseReportValidate[]>(
    []
  );
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});

  const [searchText, setSearchText] = useState("");
  const [searchDate, setSearchDate] = useState<Dayjs | null>(null);
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    listSummaryReports();
  }, []);
  const listSummaryReports = async () => {
    setLoading(true);
    try {
      const response = await getSummaryReports();
      // setSummaryReports(response || []);
      setSummaryReports(Array.isArray(response) ? response : []);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleChange: OnChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
  };
  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleClearFilter = () => {
    setFilteredInfo({});
    setSearchText("");
    setSearchDate(null);
    handleResetText;
  };

  const handleClearSorting = () => {
    setSortedInfo({});
  };

  const handleClearAllFiltersAndSorts = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const handleResetText = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<CaseReportValidate> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Buscar...`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 65 }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => clearFilters && handleResetText(clearFilters)}
            size="small"
            style={{ width: 55, background: "#FD7E14", color: "#ffffff" }}
          >
            Limpiar
          </Button>
          <Button
            type="primary"
            size="small"
            style={{ width: 55, background: "#28A745", color: "#ffffff" }}
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filtrar
          </Button>
          <Button
            type="primary"
            size="small"
            style={{ width: 55, background: "#DC3545", color: "#ffffff" }}
            onClick={() => {
              close();
            }}
          >
            Cerrar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) => {
      const recordValue = record[dataIndex];
      if (recordValue !== null && recordValue !== undefined) {
        return recordValue
          .toString()
          .toUpperCase()
          .includes((value as string).toUpperCase());
      }
      return false;
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns: TableColumnsType<CaseReportValidate> = [
    {
      title: "Código",
      dataIndex: "val_cr_filingnumber",
      key: "val_cr_filingnumber",
      width: 100,
      ...getColumnSearchProps("val_cr_filingnumber"),
      filteredValue: filteredInfo.val_cr_filingnumber || null,
      sorter: (a, b) =>
        a.val_cr_filingnumber.length - b.val_cr_filingnumber.length,
      sortOrder:
        sortedInfo.columnKey === "val_cr_filingnumber"
          ? sortedInfo.order
          : null,
      ellipsis: true,
    },
    {
      title: "Fecha",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 90,
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <DatePicker
            placeholder="Seleccione fecha"
            format="DD/MM/YYYY"
            value={searchDate}
            onChange={(date, dateString) => {
              setSelectedKeys(
                typeof dateString === "string" ? [dateString] : []
              );
              setSearchDate(date);
            }}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 65, marginRight: 8 }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => setSearchDate(null)}
            size="small"
            style={{ width: 55, background: "#FD7E14", color: "#ffffff" }}
          >
            Limpiar
          </Button>
        </div>
      ),
      onFilter: (value, record) =>
        dayjs(record.createdAt).format("DD/MM/YYYY") === value,
      filteredValue: filteredInfo.createdAt || null,
      ellipsis: true,
    },
    {
      title: "Documento",
      dataIndex: "val_cr_documentpatient",
      key: "val_cr_documentpatient",
      width: 120,
      ...getColumnSearchProps("val_cr_documentpatient"),
      filteredValue: filteredInfo.val_cr_documentpatient || null,
      sorter: (a, b) => {
        const aValue = a.val_cr_documentpatient || "";
        const bValue = b.val_cr_documentpatient || "";
        return aValue.length - bValue.length;
      },
      sortOrder:
        sortedInfo.columnKey === "val_cr_documentpatient"
          ? sortedInfo.order
          : null,
      ellipsis: true,
    },
    {
      title: "Clasificación del caso",
      dataIndex: "caseType",
      key: "caseType",
      width: 200,
      filters: Array.from(
        new Set(summaryReports.map((report) => report.caseType?.cas_t_name))
      ).map((name) => ({
        text: name || "No disponible",
        value: name || "No disponible",
      })),
      filteredValue: filteredInfo.caseType || null,
      onFilter: (value, record) =>
        record.caseType?.cas_t_name.includes(value as string),
      sorter: (a, b) =>
        a.caseType.cas_t_name.length - b.caseType.cas_t_name.length,
      sortOrder: sortedInfo.columnKey === "caseType" ? sortedInfo.order : null,
      render: (item) => <p>{item?.cas_t_name || "No disponible"}</p>,
      ellipsis: true,
    },
    {
      title: "Suceso",
      dataIndex: "event",
      key: "event",
      filters: Array.from(
        new Set(summaryReports.map((report) => report.event?.eve_name))
      ).map((name) => ({
        text: name || "No disponible",
        value: name || "No disponible",
      })),
      filteredValue: filteredInfo.event || null,
      onFilter: (value, record) =>
        record.event?.eve_name.includes(value as string),
      sorter: (a, b) => a.event.eve_name.length - b.event.eve_name.length,
      sortOrder: sortedInfo.columnKey === "event" ? sortedInfo.order : null,
      render: (item) => <p>{item?.eve_name || "No disponible"}</p>,
      ellipsis: true,
    },
    {
      title: "Prioridad",
      dataIndex: "priority",
      key: "priority",
      width: 100,
      filters: Array.from(
        new Set(summaryReports.map((report) => report.priority?.prior_name))
      ).map((name) => ({
        text: name || "No disponible",
        value: name || "No disponible",
      })),
      filteredValue: filteredInfo.priority || null,
      onFilter: (value, record) =>
        record.priority?.prior_name.includes(value as string),
      sorter: (a, b) =>
        a.priority.prior_name.length - b.priority.prior_name.length,
      sortOrder: sortedInfo.columnKey === "priority" ? sortedInfo.order : null,
      render: (item) => <p>{item?.prior_name || "No disponible"}</p>,
      ellipsis: true,
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      fixed: "right",
      width: 70,
      render: (_, record: CaseReportValidate) => (
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
  return (
    <div style={{ padding: "32px" }}>
      <Row justify="center">
        <Col span={24} style={{ maxWidth: "1000px", width: "100%" }}>
          <Row style={{ marginBottom: "1rem", marginTop: "-20px" }}>
            <Col
              span={24}
              style={{
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
              }}
            >
              <Button
                icon={!loading ? <ReloadOutlined /> : <LoadingOutlined />}
                onClick={listSummaryReports}
                style={{ background: "#002140", color: "#ffffff" }}
                size="small"
              >
                Recargar
              </Button>
              <Button
                onClick={handleClearFilter}
                style={{
                  marginLeft: "1rem",
                  background: "#6C757D",
                  color: "#ffffff",
                }}
                size="small"
              >
                Quitar filtros
              </Button>
              <Button
                onClick={handleClearSorting}
                style={{
                  marginLeft: "1rem",
                  background: "#868E96",
                  color: "#ffffff",
                }}
                size="small"
              >
                Quitar orden
              </Button>
              <Button
                onClick={handleClearAllFiltersAndSorts}
                style={{
                  marginLeft: "1rem",
                  background: "#FF7F50  ",
                  color: "#ffffff",
                }}
                size="small"
              >
                Limpiar todo
              </Button>
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={summaryReports}
            onChange={handleChange}
            bordered
            rowKey={(record) => record.id}
            size={"small"}
            loading={loading}
            locale={{
              emptyText: loading ? (
                <Skeleton active />
              ) : (
                <Empty description="No hay nada para mostrar... " />
              ),
            }}
            pagination={{
              size: "small",
              position: ["bottomCenter"],
              showQuickJumper: true,
              style: {
                margin: "0px",
                paddingTop: "13px",
              },
            }}
            // scroll={{ x: 1000 }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default SummaryReportContent;
