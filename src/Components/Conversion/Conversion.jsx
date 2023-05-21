import { Alert, Button, Form, Input } from "antd";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./Conversion.css";

const defaultResult = { text: "", success: undefined };

export default function Conversion({ title, description, convertString, setHistory }) {
  const [inputValue, setInputValue] = useState("");
  const [{ text, success }, setResult] = useState(defaultResult);
  const { pathname } = useLocation();

  const [form] = Form.useForm();

  const clear = () => {
    form.resetFields();
    setInputValue("");
    setResult(defaultResult);
  };

  const run = (record) => {
    setResult(record);
    setHistory((prev) => [...prev, record]);
  }

  useEffect(() => {
    clear();
  }, [pathname]);

  return (
    <div className="content-box">
      <Alert
        className="alert"
        message={title}
        description={description}
        type="info"
        showIcon
      />
      <Form form={form} layout="horizontal" className="alert">
        <Form.Item
          name={"Text"}
          rules={[{ message: "Это поле обязательно", required: true }]}
          style={{ width: "100%" }}
        >
          <Input
            size="large"
            allowClear={true}
            placeholder="Введите строку"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Form.Item>
        <div className="action">
          <Button size="large" type="default" onClick={clear}>
            Очистить форму
          </Button>
          <Button
            size="large"
            type="primary"
            onClick={() => inputValue && run(convertString(inputValue))}
            htmlType="submit"
          >
            Выполнить
          </Button>
        </div>
      </Form>
      {success === false && (
        <Alert
          className="alert"
          message="Ошибка"
          description={text}
          type="error"
          showIcon
        />
      )}
      {success && (
        <Alert
          className="alert"
          message="Результат"
          description={text}
          type="success"
          showIcon
        />
      )}
    </div>
  );
}
