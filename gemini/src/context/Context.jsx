import React, { createContext, useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [listening, setListening] = useState(false);
  const [interimInput, setInterimInput] = useState("");

  const {
    transcript,
    interimTranscript,
    resetTranscript,
    listening: recognitionListening,
  } = useSpeechRecognition();

  useEffect(() => {
    setInterimInput(interimTranscript);
  }, [interimTranscript]);

  useEffect(() => {
    if (!recognitionListening) {
      setInput((prevInput) => prevInput + transcript);
      setInterimInput("");
      resetTranscript();
    }
    setListening(recognitionListening);
  }, [recognitionListening, transcript, resetTranscript]);

  const logRecognition = (isListening) => {
    if (isListening) {
      console.log("Speech recognition started");
    } else {
      console.log("Speech recognition stopped");
    }
  };

  const handleMicClick = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      logRecognition(false);
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
      logRecognition(true);
    }
  };

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setInput(""); // Clear the input field for a new chat
    setRecentPrompt(""); // Clear the recent prompt for a new chat
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let response;
    if (prompt !== undefined) {
      setPrevPrompt((prev) => [...prev, prompt]);
      setRecentPrompt(prompt);
      response = await run(prompt);
    } else {
      setPrevPrompt((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await run(input);
    }

    let responseArray = response.split("**");
    let newResponse = "";

    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }

    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");

    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }

    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    handleMicClick,
    listening,
    interimInput,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
