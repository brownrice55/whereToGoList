import { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getCategories } from "./CommonFunctions";

export default function Category() {
  const categories = getCategories();
  const categoriesRef = useRef([]);

  const setData = () => {
    const values = categoriesRef.current.map((input) => input?.value);
    localStorage.setItem("whereToGoListCategory", JSON.stringify(values));
  };

  return (
    <>
      <p>カテゴリ名を設定してください</p>
      <Form>
        {categories.map((category, index) => (
          <Form.Group
            className="mt-4"
            controlId={`category${index}`}
            key={index}
          >
            <Form.Control
              type="text"
              defaultValue={category}
              ref={(elm) => (categoriesRef.current[index] = elm)}
            />
          </Form.Group>
        ))}

        <div className="text-end mt-3">
          <Button className="px-5 mx-3" variant="primary">
            追加する
          </Button>
        </div>

        <div className="text-center mt-5">
          <Button className="px-5 py-3 mx-3" variant="secondary">
            キャンセル
          </Button>
          <Button
            className="px-5 py-3 mx-3"
            variant="primary"
            onClick={setData}
          >
            設定する
          </Button>
        </div>
      </Form>
    </>
  );
}
