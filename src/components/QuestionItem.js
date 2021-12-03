import React from "react";

function QuestionItem({ question, handleDelete, handlePatch }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function removeQuestion(event) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type' : 'application/json'},
    })
    .then(resp => resp.json())
    .then(() => handleDelete(question))
  }

  function patchQuestion(event) {
    const updatedAnswer = event.target.value;
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({correctIndex: parseInt(updatedAnswer, 10)})
    })
    .then(resp => resp.json())
    .then(data => handlePatch(data))

  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={patchQuestion} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={removeQuestion}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
