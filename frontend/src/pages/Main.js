import MainContent from "../components/main/MainContent";
import Login from "./Login";

function Main({ isLoggedIn, setIsLoggedIn, setUserName }) {
    return (
        <>
        {isLoggedIn ? (
            <MainContent />
        ) : (
            <Login setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} />
        )}
        </>
    );
}

export default Main;