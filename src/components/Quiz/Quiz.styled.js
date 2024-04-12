import { FormControlLabel, Paper, Radio } from "@mui/material";
import { green, red } from "@mui/material/colors";
import styled from "styled-components";

export const CustomPaper = styled(Paper)`
  padding: 24px;
  margin: 50px auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 32px;
  width: 700px;
`;

export const CustomFormControlLabel = styled(FormControlLabel)`
  margin-right: 0;
  background: ${({ $answer, $text }) =>
    $answer.text === $text && $answer.isCorrect
      ? "rgba(0, 132, 0, 0.2)"
      : $answer.text === $text && !$answer.isCorrect
      ? "rgba(255, 0, 0, 0.2)"
      : "transparent"};
`;

export const CustomRadio = styled(Radio)`
  color: inherit;
  &.Mui-checked {
    color: ${({ $answer }) =>
      $answer.isCorrect ? green[800] : red[800]} !important;
  }
`;

export const ButtonStyles = {
  mt: 1,
  mr: 1,
  width: 3,
  background: green[600],
  "&:hover": {
    background: green[800],
  },
};
