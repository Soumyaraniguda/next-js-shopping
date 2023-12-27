import React, { useState } from "react";
import styles from "./../styles.module.scss";
import { sizesList } from "@/utils/sizes";
import { BsFillPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";

function ProductQuestions({ questions, product, setProduct }) {
  const handleQuestion = (i, e) => {
    const updatedQuestions = [...questions];
    const name = e.target.name;
    const value = e.target.value;
    updatedQuestions[i][name] = value;
    setProduct({ ...product, questions: updatedQuestions });
  };

  const handleRemove = (i) => {
    if (questions.length > 0) {
      const updatedQuestions = [...questions];
      updatedQuestions.splice(i, 1);
      setProduct({ ...product, questions: updatedQuestions });
    }
  };

  const handleAddQuestion = () => {
    setProduct({
      ...product,
      questions: [...questions, { question: "", answer: "" }],
    });
  };

  return (
    <div>
      <div className={styles.header}>Questions</div>

      {!questions.length ? (
        <BsFillPatchPlusFill
          className={styles.svg}
          onClick={handleAddQuestion}
        />
      ) : (
        <></>
      )}

      {questions ? (
        questions.map((data, i) => {
          return (
            <div className={styles.sizesContainer} key={i}>
              <input
                type="text"
                name="question"
                placeholder="Question"
                value={data.question}
                onChange={(e) => handleQuestion(i, e)}
              />
              <input
                type="text"
                name="answer"
                placeholder="Answer"
                value={data.answer}
                onChange={(e) => handleQuestion(i, e)}
              />

              <>
                <BsFillPatchMinusFill onClick={() => handleRemove(i)} />
                <BsFillPatchPlusFill onClick={handleAddQuestion} />
              </>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProductQuestions;
