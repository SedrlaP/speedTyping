import { useState, useRef, useEffect } from "react";

function App() {
  const STARTING_TIME = 5;
  const [text, setText] = useState({
    textarea: "",
  });
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const tArea = useRef(null);

  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining((prevState) => prevState - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      endGame();
    }
  }, [isRunning, timeRemaining]);

  function handleChange(event) {
    setText({ [event.target.name]: event.target.value });
  }

  function countWords(words) {
    const wordsArr = words.trim().split(" ");
    const filteredArr = wordsArr.filter((word) => word !== "");
    return filteredArr.length;
  }

  function startGame() {
    setIsRunning(true);
    setTimeRemaining(STARTING_TIME);
    setText({ textarea: "" });
    tArea.current.disabled = false;
    tArea.current.focus();
    console.log(tArea);
  }

  function endGame() {
    setIsRunning(false);
    const numWords = countWords(text.textarea);
    setWordCount(numWords);
  }

  return (
    <div>
      <h1>How fast do you type?</h1>
      <textarea
        ref={tArea}
        name="textarea"
        onChange={handleChange}
        value={text.textarea}
        disabled={!isRunning}
      />
      <h4>Time remaining: {timeRemaining}</h4>
      <button disabled={isRunning} onClick={startGame}>
        Start
      </button>
      <h1>Word count: {wordCount}</h1>
    </div>
  );
}
export default App;
