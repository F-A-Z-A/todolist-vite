// @flow
import * as React from "react";
import { type ChangeEvent, useState } from "react";

type Props = {
  value: string;
  onChange: (title: string) => void;
};
export const EditableSpan = ({ value, onChange }: Props) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(value);

  const turnOnEditMode = () => {
    setIsEditMode(true);
  };

  const turnOffEditMode = () => {
    onChange(title);
    setIsEditMode(false);
  };

  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return (
    <>
      {isEditMode ? (
        <input autoFocus onBlur={turnOffEditMode} onChange={changeTitle} value={title} />
      ) : (
        <span onDoubleClick={turnOnEditMode}>{value}</span>
      )}
    </>
  );
};
