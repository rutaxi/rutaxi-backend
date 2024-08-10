import { XIcon } from "../../assets/modal";
import './ChatModal.css';

function ChatModal({ closeModal }) {
  return (
    <div>
      <XIcon id="x-icon" onClick={closeModal} />

      <h2 id="modal-title">🚖&nbsp;&nbsp;채팅을 통해&nbsp;&nbsp;🚖<br/>택시 파티를 해보아요</h2>
      <div id="modal-subtitle">다음과 같은 의견을 나눠보아요<br/></div>

      <ContentElem title="N빵" content="소중한 우리의 돈, 어떻게 나눌지 얘기해봐요 💸"/>
      <ContentElem title="왕고는 누구" content="예약시 누가 대표로 예약할지 정해봐요 👑"/>
      <ContentElem title="출발지 / 도착지" content="정확한 이동을 위해 세부적인 위치를 얘기해봐요 🤗"/>
      <ContentElem title="만나는 시간" content="지각은 안 돼요.. 서로의 확실한 시간을 얘기해봐요 💪"/>
    </div>
  );
}

export default ChatModal;

function ContentElem({ title, content }) {
    return (
        <div className="modal-contents">
            <b>💡 {title}</b>
            <div className="modal-contents-detail">&nbsp;{content}</div><br/>
        </div>
    )
}