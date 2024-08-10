import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../graphql/mutations';
import { EditProfileNav, EditProfileInput } from '../components/editProfile';
import './EditProfile.css';

function EditProfile({ setCurUserName }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [updateUser, { loading, error }] = useMutation(UPDATE_USER);

  const isVaild = userName && oldPassword && password;

  const handleUpdateUser = async (e) => {
    if(!isVaild) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    e.preventDefault();
    try {
      const result = await updateUser({ variables: { userName, oldPassword, password } });
      alert('회원정보 수정이 완료되었습니다.', result);
      setCurUserName(userName);
      localStorage.setItem('userName', userName);
      navigate('/mypage');
    } catch (err) {
      console.error('Error updating user:', err);
    }
  }

  return (
    <div id="edit-profile-wrapper">
        <EditProfileNav handleUpdateUser={handleUpdateUser} />
        <EditProfileInput setUserName={setUserName} setOldPassword={setOldPassword} setPassword={setPassword} />
    </div>
  );
}

export default EditProfile;