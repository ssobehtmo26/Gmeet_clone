import Header from "./header"
import "./body.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faKeyboard } from "@fortawesome/free-solid-svg-icons";
// import Body from "./body-content"
const Homepage = () => {
    return (
        <div className="home-page">
            <Header />
            <div className="body-content">
                <div className="left-side">
                    <h2>Premium video meetings.</h2>
                    <h2>Now free for everyone</h2>
                    <p>We re-engineered the service we built for secure business meetings,Google Meet,to make it free and available for all</p>
                    <div className="action-btn">
                        <div className="video-btn">
                            <button type="button" className="btn">
                                <FontAwesomeIcon className="icons col" icon={faVideo} />
                                New Meeting
                            </button>
                        </div>
                        <div className="input-block">
                            <div className="input-section">
                                <FontAwesomeIcon className="icon-block" icon={faKeyboard} />
                                <input placeholder="Enter your code here" />
                            </div>
                            <button className="bttn">Join</button>
                        </div>
                    </div>
                        <hr />
                        <div className="help-text">
            <a href="">Learn more</a> about Google Meet
                        </div>


                </div>
                <div className="right-side">
                    <div className="content">
                        <img src="https://cdn.vox-cdn.com/thumbor/PvYHf9f7nUddjyJIl7l84BRAIW8=/0x0:1980x1320/1400x1050/filters:focal(990x660:991x661)/cdn.vox-cdn.com/uploads/chorus_asset/file/22459255/googlemeetnewui.jpg" alt="not found" />

                    </div></div>

            </div>
        </div>

    )
}
export default Homepage;