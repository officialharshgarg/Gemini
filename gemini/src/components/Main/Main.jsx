import React, { useContext } from 'react';
import { Context } from '../../context/Context';
import { assets } from '../../assets/assets';
import './Main.css';

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    handleMicClick,
    listening,
    interimInput, // Get interimInput from context
  } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="User Icon" />
      </div>

      <div className="main-container">
        {!showResult ? (
          <div className="greet">
            <p className='greet-text'>
              <span>Hello, HUMAN</span>
            </p>
            <p className='greet-text'>How can I help you today?</p>
            <div className="cards">
              <div
                onClick={() => onSent("Suggest some places for the trip")}
                className="card"
              >
                <p>Suggest some places for the trip</p>
                <img src={assets.compass_icon} alt="Compass Icon" />
              </div>

              <div
                onClick={() => onSent("Briefly summarize: Urban Planning")}
                className="card"
              >
                <p>Briefly summarize: Urban Planning</p>
                <img src={assets.bulb_icon} alt="Bulb Icon" />
              </div>

              <div
                onClick={() =>
                  onSent(
                    "Brainstorm team bonding activities for our work retreat"
                  )
                }
                className="card"
              >
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="Message Icon" />
              </div>

              <div
                onClick={() =>
                  onSent("Tell me about React js and React native")
                }
                className="card"
              >
                <p>Tell me about React js and React native</p>
                <img src={assets.code_icon} alt="Code Icon" />
              </div>
            </div>
          </div>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="User Icon" />
              <pre>{recentPrompt}</pre>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini Icon" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <pre dangerouslySetInnerHTML={{ __html: resultData }}></pre>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={listening ? input + interimInput : input} // Display interim input while listening
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="Gallery Icon" />
              <img
                onClick={handleMicClick}
                src={assets.mic_icon}
                alt={listening ? "Stop Listening" : "Start Listening"}
                style={{ cursor: "pointer" }}
                className={`mic-icon ${listening ? 'active' : ''}`}
              />
              {input && (
                <img
                  onClick={() => onSent(input)}
                  src={assets.send_icon}
                  alt="Send Icon"
                />
              )}
            </div>
          </div>

          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. <u>Your privacy and Gemini apps</u>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
