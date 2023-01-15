import React from "react";
import "./style.scss";
import Button from '@mui/material/Button';

type PropsType = {
  children: string;
  disabled: boolean;
  onClick: () => void;
};

const CustomButton: React.FC<PropsType> = (props) => {
  return (
    <Button disabled={props.disabled} onClick={props.onClick} variant="outlined">
     { props.children }
    </Button>
  );
};

export default React.memo(CustomButton);
