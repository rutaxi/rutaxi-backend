import { XIcon } from "../../assets/modal";
import './ChatModal.css';

function CreateModal({ closeModal }) {
  return (
    <div>
      <XIcon id="x-icon" onClick={closeModal} />

      <h2 id="modal-title">🚖&nbsp;&nbsp;택시팟 등록 완료 !!&nbsp;&nbsp;🚖</h2>
      <div id="modal-subtitle">택시팟 채팅으로 의견을 나눠보아요<br/></div>

      <ContentElem title="TIP" content="택시팟 세부 페이지에서 문의 및 취소가 가능해요 🙌"/>
      <ContentElem title="TIP" content="문의 채팅으로 자세한 일정을 세워봐요 💪"/>
    </div>
  );
}

export default CreateModal;

function ContentElem({ title, content }) {
    return (
        <div className="modal-contents">
            <b>💡 {title}</b>
            <div className="modal-contents-detail">&nbsp;{content}</div><br/>
        </div>
    )
}