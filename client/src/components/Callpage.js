import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faVideo,
    faMicrophone,
    faPhone,
    faVideoSlash,
    faAngleUp,
    faClosedCaptioning,
    faDesktop,
    faMicrophoneSlash,
    faCircleInfo,
    faMessage,
    faArrowUpFromBracket,
    faUsers
} from "@fortawesome/free-solid-svg-icons";
import "./callpage.css"
const Callpage = () => {
    return (
        <div className="Callpage-item">
            <div className="profile-pic">
                <h1 className="ignore">profile picture</h1>
            </div>
            <div className="footer-item">
                <div className="left-item">
                    <div className="text">
                    <iframe src="https://free.timeanddate.com/clock/i8wb6p4g/n1884/tlin/fs16/avb/ftb/th2/ts1" frameborder="0" width="71" height="20"></iframe>

                    |Meeting link</div>
                </div>
                <div className="center-item">
                <FontAwesomeIcon className="ficons" icon={faVideo}/>
                <FontAwesomeIcon className="ficons" icon={faVideoSlash} />
                <FontAwesomeIcon className="ficons" icon={faMicrophone}/>
                <FontAwesomeIcon className="ficons" icon={faArrowUpFromBracket}/>
                <FontAwesomeIcon className="ficons" icon={faPhone} size="2xl" beat/>
                </div>
                <div className="right-item">
                <FontAwesomeIcon className="icons" icon={faCircleInfo}/>
                <FontAwesomeIcon className="icons" icon={faUsers} />
                <FontAwesomeIcon className="icons" icon={faMessage}/>
                </div>
            </div>


        </div>
    )
}
export default Callpage;