import "./body.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faKeyboard } from "@fortawesome/free-solid-svg-icons";
const body = () => {
    return (
        <div className="body-content">
            <div className="left-side">
                <h2>Premium video meetings.</h2>
                <h2>Now free for everyone</h2>
                <p>We re-engineered the service we built for secure business meetings,Google Meet,to make it free and available for all</p>
                <div className="input-sec">
                    <div className="input-section">
                        <button type="button" className="btn">
                            <FontAwesomeIcon className="icons" icon={faVideo} />
                            <span>New Meeting</span>
                        </button>
                    </div>
                    <div className="join-btn">
                    <div className="input-sec">
                        <FontAwesomeIcon className="icons" icon={faKeyboard} />
                        <input placeholder="Enter your code here" />
                    </div>
                    <button className="bttn">join</button>
                    </div>
                    <hr />
                    <a href="">About google meet</a>
                </div>


            </div>
            <div className="right-side">
                <div className="content">
                
                <img src="https://cdn.vox-cdn.com/thumbor/PvYHf9f7nUddjyJIl7l84BRAIW8=/0x0:1980x1320/1400x1050/filters:focal(990x660:991x661)/cdn.vox-cdn.com/uploads/chorus_asset/file/22459255/googlemeetnewui.jpg" alt="not found" />
           
            </div></div>

        </div>
    )
}
export default body;