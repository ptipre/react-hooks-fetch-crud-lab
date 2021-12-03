import React, { useState,useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions, handleDelete, handlePatch}) {

  const allQuestions = questions.map((question) => (
    <QuestionItem handlePatch={handlePatch} handleDelete={handleDelete} key={question.id} question={question} />
  ))

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{allQuestions}</ul>
    </section>
  );
}

export default QuestionList;
