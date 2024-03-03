import React, { useEffect, useState } from "react";
import questions from "./questions.json";
import "./App.css";

function RadioButtonGroup(props) {
  return (
    <div>
      <label>
        <input
          type="radio"
          value="Gostaria Muito"
          checked={props.selectedOption === "Gostaria Muito"}
          onChange={props.handleChange}
        />
        Gostaria Muito
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="Gostaria Parcialmente"
          checked={props.selectedOption === "Gostaria Parcialmente"}
          onChange={props.handleChange}
        />
        Gostaria Parcialmente
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="Indiferente"
          checked={props.selectedOption === "Indiferente"}
          onChange={props.handleChange}
        />
        Indiferente
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="Não Gostaria"
          checked={props.selectedOption === "Não Gostaria"}
          onChange={props.handleChange}
        />
        Não Gostaria
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="Detestaria"
          checked={props.selectedOption === "Detestaria"}
          onChange={props.handleChange}
        />
        Detestaria
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
