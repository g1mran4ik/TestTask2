import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { Button, Empty, Table } from "antd";
import { useState } from "react";

import "./ConversionHistory.css";

const columns = [
  { title: "Тип операции", dataIndex: "title" },
  {
    title: "Статус",
    dataIndex: "success",
    render: (success) =>
      success ? (
        <CheckCircleFilled style={{ color: "#52c41a" }} />
      ) : (
        <CloseCircleFilled style={{ color: "#ff4d4f" }} />
      ),
  },
  { title: "Ввод", dataIndex: "value" },
  { title: "Вывод", dataIndex: "text"},
  { title: "Выполнено в", dataIndex: "date" },
];

export default function ConversionHistory() {
  const [dataSource, setDataSource] = useState(
    JSON.parse(localStorage.getItem("actionsList")) || []
  );

  const clearHistory = () => {
    localStorage.removeItem("actionsList");
    setDataSource([]);
  };

  return (
    <>
      <div className="button-box">
        <Button type="primary" onClick={clearHistory} size="large">
          Очистить историю
        </Button>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(_, index) => index}
        size="large"
        locale={{emptyText: <Empty description="Операции отсутствуют"/>}}
      />
    </>
  );
}
