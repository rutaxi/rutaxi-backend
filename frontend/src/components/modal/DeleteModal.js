import { XIcon } from "../../assets/modal";
import './ChatModal.css';

function DeleteModal({ closeModal }) {
  return (
    <div>
      <XIcon id="x-icon" onClick={closeModal} />

      <h2 id="modal-title">🚖&nbsp;&nbsp;택시팟 취소 완료&nbsp;&nbsp;🚖</h2>
      <div id="modal-subtitle">😢 아무도 남지 않아서 자동 삭제됐습니다<br/></div>

      <ContentElem title="TIP" content="현재 가입한 택시팟이 잘 있는지 확인해봐요 🧐"/>
      <ContentElem title="TIP" content="택시팟 검색 페이지에서 원하는 택시팟에 가입해봐요 🥳"/>
    </div>
  );
}

export default DeleteModal;

function ContentElem({ title, content }) {
    return (
        <div className="modal-contents">
            <b>💡 {title}</b>
            <div className="modal-contents-detail">&nbsp;{content}</div><br/>
        </div>
    )
}