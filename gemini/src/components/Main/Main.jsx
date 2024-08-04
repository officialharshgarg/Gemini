import "./Main.css";
import { useContext } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

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
  } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} />
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            {" "}
            <div className="greet">
              <p>
                <span>Hello, User</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div
                onClick={() => onSent("Suggest some places for the trip")}
                className="card"
              >
                <p>Suggest some places for the trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>

              <div
                onClick={() => onSent("Briefly summarize: Urban Planning")}
                className="card"
              >
                <p>Briefly summarize: Urban Planning</p>
                <img src={assets.bulb_icon} alt="" />
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
                <img src={assets.message_icon} alt="" />
              </div>

              <div
                onClick={() =>
                  onSent("Tell me about React js and React native")
                }
                className="card"
              >
                <p>Tell me about React js and React native</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <pre>{recentPrompt}</pre>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
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
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img
                onClick={handleMicClick}
                src={assets.mic_icon}
                alt=""
                style={{ cursor: "pointer" }}
                className={`mic-icon ${listening ? 'active' : ''}`}
              />
              {input ? (
                <img onClick={() => onSent()} src={assets.send_icon} alt="" />
              ) : null}
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
