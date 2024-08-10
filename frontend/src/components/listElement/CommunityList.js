import { Link } from "react-router-dom";
import { Army97 } from "../../assets/logo";
import { PersonIcon } from "../../assets/main";
import './CommunityList.css'

function CommunityList() {
    return (
        <div id="main-content-list">
            <CommunityElem name="보령 97여단 청라면" members="38명"><Army97 /></CommunityElem>
            <CommunityElem name="보령 97여단 청라면" members="38명"><Army97 /></CommunityElem>
            <CommunityElem name="보령 97여단 청라면" members="38명"><Army97 /></CommunityElem>
        </div>
    );
}

export default CommunityList;

function CommunityElem({ children, name, members }) {
    return (
        <Link className="main-community-elem" to="/taxi-party-list">
            {children}
            <div>
                <h3>{name}</h3>
                <div className="main-community-member-cnt">
                    <PersonIcon className="community-elem-person-icon" />
                    <div>{members}</div>
                </div>
            </div>
        </Link>
    );
}