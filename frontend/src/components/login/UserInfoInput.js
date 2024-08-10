import './UserInfoInput.css';

function UserInfoInput({type, placeholder, setState, className }) {
    const inputId = `input_${placeholder.replace(/\s+/g, '_').toLowerCase()}`;

    return (
        <div class="user-info-input-wrapper">
            <div class={`user-info-input ${className ? className : null}`}>
                <input id={inputId} type={type} required onChange={(e) => {setState && setState(e.target.value)}}></input>
                <label for={inputId} class='user-info-placeholder'>
                    {placeholder}
                </label>
            </div>
        </div>
    );
}

export default UserInfoInput;