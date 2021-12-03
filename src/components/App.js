import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(resp => resp.json())
    .then(data => {
      setQuestions(data);
    })
  }, []);

  if (questions === []) {
    return <p>Loading</p>
  }

  function updateQuestions(newQuestion) {
    setQuestions([...questions, newQuestion])
  }

  function handleDelete(deletedQuestion) {
    const updatedList = questions.filter((question) => question.id !== deletedQuestion.id)
    setQuestions(updatedList);
  }

  function handlePatch(updatedQuestion) {
    const updatedList = questions.map((question) => {
      if (question.id !== updatedQuestion.id) {
        return question;
      } else {
        return updatedQuestion;
      }
    })
    setQuestions(updatedList);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm updateQuestions={updateQuestions}/> : <QuestionList handleDelete={handleDelete} handlePatch={handlePatch} questions={questions}/>}
    </main>
  );
}

export default App;
