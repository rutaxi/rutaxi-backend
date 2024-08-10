import { Link } from 'react-router-dom';
import './CreateNav.css';

function CreateNav({ handleCreateParty }) {
  return (
    <div id='create-taxi-party-nav'>
        <Link to='/taxi-party-list' id='create-cancle-btn'>취소</Link>
        <div>택시 파티 만들기</div>
        <div id='create-save-btn' onClick={handleCreateParty}>저장</div>
    </div>
  );
}

export default CreateNav;