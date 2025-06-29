import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getCategories } from "./CommonFunctions";

export default function Category() {
  const categories = getCategories();
  const [form, setForm] = useState(categories);

  const handleInput = (index, e) => {
    const newForm = [...form];
    newForm[index] = e.target.value;
    setForm(newForm);
  };

  const handleAdd = () => {
    const newForm = [...form, ""];
    setForm(newForm);
  };

  const handleSave = () => {
    const values = form.filter((val) => val);
    localStorage.setItem("whereToGoListCategory", JSON.stringify(values));
  };

  const handleCancel = () => {
    setForm(categories);
  };

  return (
    <>
      <p>カテゴリ名を設定してください</p>
      <Form>
        {form.map((category, index) => (
          <Form.Group
            className="mt-4"
            controlId={`category${index}`}
            key={index}
          >
            <Form.Control
              type="text"
              defaultValue={form[index]}
              onChange={(e) => handleInput(index, e)}
            />
          </Form.Group>
        ))}

        <div className="text-end mt-3">
          <Button className="px-5 mx-3" variant="primary" onClick={handleAdd}>
            追加する
          </Button>
        </div>

        <div className="text-center mt-5">
          <Button
            className="px-5 py-3 mx-3"
            variant="secondary"
            onClick={handleCancel}
          >
            キャンセル
          </Button>
          <Button
            className="px-5 py-3 mx-3"
            variant="primary"
            onClick={handleSave}
          >
            設定する
          </Button>
        </div>
      </Form>
    </>
  );
}
