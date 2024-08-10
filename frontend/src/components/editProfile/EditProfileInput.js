import React, { useState } from 'react';
import { GrayCar } from "../../assets/chat";
import './EditProfileInput.css';

function EditProfileInput({ setUserName, setOldPassword, setPassword }) {
    return (
        <div id="edit-profile-form-wrapper">
          <div id="edit-profile-img">
              <GrayCar />
          </div>
          <EditInfoForm title="아이디" type="text" setUserName={setUserName} />
          <EditInfoForm title="비밀번호" type="password" setOldPassword={setOldPassword} setPassword={setPassword} />
        </div>
    )
}

export default EditProfileInput;

function EditInfoForm({ title, type, setUserName, setOldPassword, setPassword }) {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <div className="edit-info-form">
            <div className="edit-info-title">{title}</div>
            <div className="input-wrapper">
                {type === 'password' ? (
                    <>
                    <input type="password" placeholder="현재 비밀번호" onChange={(e) => setOldPassword(e.target.value)} />
                    <input type="password" placeholder="새 비밀번호" onChange={(e) => {setPassword(e.target.value); setNewPassword(e.target.value) }} />
                    <input id={`${newPassword == confirmPassword ? null : "edit-pwd-confirm"}`} type="password" placeholder="새 비밀번호 확인" onChange={(e) => setConfirmPassword(e.target.value)} />
                    </>
                ) : (
                    <input type="text" placeholder="사용자 아이디" onChange={(e) => setUserName(e.target.value)} />
                )}
            </div>
        </div>
    );
}