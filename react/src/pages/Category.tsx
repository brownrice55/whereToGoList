import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getCategories } from "../utils/common";

export default function Category() {
  const categories = getCategories();
  const [form, setForm] = useState<string[]>(categories);
  const [alert, setAlert] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const handleInput = (index, e) => {
    const newForm = [...form];
    newForm[index] = e.target.value;
    const values = newForm.filter((val) => val);
    if (values.length) {
      setForm(values);
    } else {
      setAlert(!values[0]);
    }
    setIsDisabled(JSON.stringify(categories) === JSON.stringify(values));
  };

  const handleAdd = () => {
    const newForm = [...form, ""];
    setForm(newForm);
  };

  const handleSave = () => {
    const values = form.filter((val) => val);
    setForm(values);
    localStorage.setItem("whereToGoListCategory", JSON.stringify(values));
    setAlert(false);
  };

  const handleCancel = () => {
    setForm(categories);
    setAlert(false);
  };

  return (
    <>
      <p>
        カテゴリ名を設定してください。
        <span className={alert ? "text-danger" : "d-none"}>
          1つ以上設定してください。
        </span>
      </p>
      <Form>
        {form.map((val, index) => (
          <Form.Group
            className="mt-4"
            controlId={`category${index}`}
            key={index}
          >
            <Form.Control
              type="text"
              value={val}
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
            disabled={isDisabled}
          >
            キャンセル
          </Button>
          <Button
            className="px-5 py-3 mx-3"
            variant="primary"
            onClick={handleSave}
            disabled={isDisabled}
          >
            設定する
          </Button>
        </div>
      </Form>
    </>
  );
}
