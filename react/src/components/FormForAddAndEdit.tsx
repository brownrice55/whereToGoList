import { useForm } from "react-hook-form";
import { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getCategories, getData, priorityArray } from "../utils/common";
import { DoesDataExistContext } from "../contexts/DataProvider";

export default function FormForAddAndEdit({ keyNumber, isClosed, onUpdate }) {
  const originalData = getData();
  const [data, setData] = useState(originalData);
  const { setDoesDataExist } = useContext(DoesDataExistContext);

  const keysArray = data.size && Array.from(data.keys());
  let nextId = keyNumber
    ? keyNumber
    : data.size
    ? keysArray[keysArray.length - 1]
    : 0;

  const categories = getCategories();
  const dataForEdit = keyNumber && data.get(keyNumber);

  const btnText = keyNumber ? "上書き保存する" : "登録する";

  const defaultValues = {
    place: keyNumber ? dataForEdit.place : "",
    category: keyNumber ? dataForEdit.category : categories[0],
    address: keyNumber ? dataForEdit.address : "",
    priority: keyNumber ? dataForEdit.priority : 1,
    station: keyNumber ? dataForEdit.station : "",
    notes: keyNumber ? dataForEdit.notes : "",
  };

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isDirty, isValid, isSubmitSuccessful },
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const onsubmit = (data) => console.log(data);
  const onerror = (err) => console.log(err);

  const registerData = () => {
    const values = getValues();
    nextId = keyNumber ? keyNumber : nextId + 1;
    data.set(nextId, values);
    localStorage.setItem("whereToGoListData", JSON.stringify([...data]));
    setData(data);
    setDoesDataExist(true);
    if (keyNumber) {
      onUpdate(!isClosed);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const handleCancel = () => {
    if (keyNumber) {
      onUpdate(!isClosed);
    } else {
      reset();
    }
  };

  return (
    <>
      {!keyNumber && (
        <p className="mt-5">
          行ってみたい（またはお気に入りの）場所の情報を登録してください。
        </p>
      )}
      <Form
        className="mt-4"
        onSubmit={handleSubmit(onsubmit, onerror)}
        noValidate
      >
        <Form.Group controlId="place">
          <Form.Label>場所の名前</Form.Label>
          <Form.Control
            type="text"
            className={errors.place && "border-danger"}
            {...register("place", { required: "必須です" })}
          />
          <div className="text-danger m-2">{errors.place?.message}</div>
        </Form.Group>

        <Form.Group className="mt-4" controlId="category">
          <Form.Label>カテゴリ名</Form.Label>
          <Form.Select aria-label="category" {...register("category")}>
            {categories.map((category, index) => (
              <option value={category} key={index + 1}>
                {category}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mt-4" controlId="address">
          <Form.Label>住所</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            className={errors.address && "border-danger"}
            {...register("address", { required: "必須です" })}
          />
          <div className="text-danger m-2">{errors.address?.message}</div>
        </Form.Group>

        <Form.Group className="mt-4" controlId="station">
          <Form.Label>最寄駅</Form.Label>
          <Form.Control
            type="text"
            className={errors.station && "border-danger"}
            {...register("station", { required: "必須です" })}
          />
          <div className="text-danger m-2">{errors.station?.message}</div>
        </Form.Group>

        <Form.Group className="mt-4" controlId="priority">
          <Form.Label>優先度</Form.Label>
          <Form.Select aria-label="priority" {...register("priority")}>
            {priorityArray.map((val, index) => (
              <option value={index + 1} key={index + 1}>
                {val}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mt-4" controlId="notes">
          <Form.Label>メモ</Form.Label>
          <Form.Control as="textarea" rows={3} {...register("notes")} />
        </Form.Group>

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
            type="submit"
            disabled={!isDirty || !isValid}
            onClick={registerData}
          >
            {btnText}
          </Button>
        </div>
      </Form>
    </>
  );
}
