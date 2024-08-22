import MainContent from "../components/main/MainContent";
import Login from "./Login";

function Main({ isLoggedIn, setIsLoggedIn, setUserName, setUserEmail }) {
    return (
        <>
        {isLoggedIn ? (
            <MainContent setUserName={setUserName} setUserEmail={setUserEmail} />
        ) : (
            <Login setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} />
        )}
        </>
    );
}

export default Main;