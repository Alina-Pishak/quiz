import { useState } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { Alert, Snackbar, Typography } from "@mui/material";

import {
  ButtonStyles,
  CustomFormControlLabel,
  CustomPaper,
  CustomRadio,
} from "./Quiz.styled";

const Quiz = ({ tasks }) => {
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(1);
  const [answer, setAnswer] = useState({ text: "", isCorrect: "" });
  const [open, setOpen] = useState(false);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);

  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  const resetQuiz = () => {
    setPage(1);
    setTotalCorrectAnswers(0);
  };

  const closeSnackbar = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const totalPages = Math.ceil(tasks.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTask = tasks.slice(startIndex, endIndex);
  return (
    <CustomPaper>
      {page <= totalPages ? (
        currentTask.map(({ question, answers }, i) => (
          <FormControl key={i} variant="standard">
            <Typography mb={2} fontWeight={600} variant="h5">
              Question {page} of {totalPages}
            </Typography>
            <Typography fontSize="1.10rem" mb={1} sx={{ minWidth: 560 }}>
              {question}
            </Typography>
            <RadioGroup
              aria-labelledby="demo-error-radios"
              name="quiz"
              value={value}
            >
              {answers.map(({ text, isCorrect }) => (
                <CustomFormControlLabel
                  key={text}
                  value={text}
                  disabled={
                    !value ? false : answer.text === text ? false : true
                  }
                  $answer={answer}
                  $text={text}
                  control={
                    <CustomRadio
                      $answer={answer}
                      onChange={(e) => {
                        setAnswer({ text, isCorrect });
                        handleRadioChange(e);
                        if (isCorrect) {
                          setTotalCorrectAnswers(totalCorrectAnswers + 1);
                        }
                      }}
                    />
                  }
                  label={text}
                />
              ))}
            </RadioGroup>
            <Button
              sx={ButtonStyles}
              type="submit"
              variant="contained"
              onClick={() => {
                if (!value) {
                  setOpen(true);
                } else {
                  setPage(page + 1);
                  setValue("");
                }
              }}
            >
              Next
            </Button>
          </FormControl>
        ))
      ) : (
        <>
          <Typography>Total correct answers: {totalCorrectAnswers}</Typography>
          <Button type="reset" variant="contained" onClick={resetQuiz}>
            Try again
          </Button>
        </>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={closeSnackbar}>
        <Alert
          onClose={closeSnackbar}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          You need to choose an answer
        </Alert>
      </Snackbar>
    </CustomPaper>
  );
};

export default Quiz;
