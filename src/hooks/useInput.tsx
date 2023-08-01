import { useState } from "react";

const useInput = (): [string, (e: React.ChangeEvent<HTMLInputElement>) => void, () => void] => {
  const [value, setValue] = useState<string>("");

  const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const newValue : string = e.target.value
    setValue(e.target.value);
  };

  const resetValue = () => {
    setValue(""); // 값을 초기화하는 함수
  };

  return [value, handler, resetValue];
};

export default useInput;

