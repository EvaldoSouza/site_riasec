import React, { useEffect, useState } from "react";
import questions from "./questions.json";
import "./App.css";

function RadioButtonGroup(props) {
  return (
    <div>
      <label>
        <input
          type="radio"
          value="option1"
          checked={props.selectedOption === "option1"}
          onChange={props.handleChange}
        />
        Option 1
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="option2"
          checked={props.selectedOption === "option2"}
          onChange={props.handleChange}
        />
        Option 2
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="option3"
          checked={props.selectedOption === "option3"}
          onChange={props.handleChange}
        />
        Option 3
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="option4"
          checked={props.selectedOption === "option4"}
          onChange={props.handleChange}
        />
        Option 4
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="option5"
          checked={props.selectedOption === "option5"}
          onChange={props.handleChange}
        />
        Option 5
      </label>
      <br />
    </div>
  );
}

function App() {
  const [selectedOption, setSelectedOption] = useState("");
  const [pageTitleIndex, setPageTitleIndex] = useState(0);
  const [pageTitle, setPageTitle] = useState("");
  const [answer, setAnswer] = useState({}); //coleta as respostas, por isso está vazio

  useEffect(() => {
    //Setando a primeira pergunta
    setPageTitle(questions.perguntas[pageTitleIndex]);
  }, [pageTitleIndex]);

  //controla o estado dos botoes
  function handleChange(event) {
    setSelectedOption(event.target.value);
    setAnswer((prevState) => ({
      ...prevState,
      [pageTitle]: event.target.value, //armazena a resposta com o titulo da pagina, a pergunta
    }));
  }

  function buttonNext(event) {
    if (pageTitleIndex < questions.perguntas.length - 1) {
      setPageTitleIndex(pageTitleIndex + 1);
    }
  }

  function handleDownloadAnswers() {
    const blob = new Blob([JSON.stringify(answer, null, 2)], {
      type: "application/json",
    }); //esse type talvez não funcione
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "answers.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    //que que isso tudo tá fazendo???
  }

  return (
    <div>
      <h3> {pageTitle} </h3>
      <RadioButtonGroup
        selectedOption={selectedOption}
        handleChange={handleChange}
      />
      <br />
      {pageTitleIndex === questions.perguntas.length - 1 && (
        <button onClick={handleDownloadAnswers}>Download</button>
      )}
      {pageTitleIndex !== questions.perguntas.length - 1 && (
        <button onClick={buttonNext}>Next</button>
      )}
    </div>
  );
}

export default App;
