import React from "react";
import { timeFormat } from "d3-time-format";
import { Table, Tag} from "antd";
import Linkify from "react-linkify";
import { SortOrder } from "antd/lib/table/interface";

function renderColumnLevel(text, entry) {
  let color = 'black';

  if (entry.level === "warning") {
    color = "orange";
  } else if (entry.level === 'error') {
    color = "red";
  }

  return <Tag color={color}>{text}</Tag>;
}

function renderMessage(text) {
  return (
    <Linkify>{text}</Linkify>
  )
}

interface Props {
  logs: object[],
  pageSize: number
}

export default function LogTable({ logs, pageSize }: Props) {
  const columns = [
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      filters: [
        {
          text: "Info",
          value: "info",
        },
        {
          text: "Warning",
          value: "warning",
        },
        {
          text: "Error",
          value: "Error",
        },
      ],
      onFilter: (level, row) => row.level.indexOf(level) === 0,
      render: renderColumnLevel,
    },
    {
      title: "Timestamp",
      dataIndex: "time",
      key: "time",
      render: (timestamp) =>
        timeFormat("%H:%M:%S %m/%d/%Y")(new Date(timestamp)),
      sorter: (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime(),
      sortDirections: ["descend", "ascend"] as SortOrder[],
      defaultSortOrder: "descend" as SortOrder,
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: renderMessage,
    },
  ];

  return (
    <div>
      <Table
        size="middle"
        dataSource={logs}
        columns={columns}
        rowKey={(row) => row.time}
        pagination={{ pageSize: pageSize || 20 }}
      />
    </div>
  );
}

