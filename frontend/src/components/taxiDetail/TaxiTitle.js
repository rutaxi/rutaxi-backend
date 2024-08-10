import './TaxiTitle.css';

function TaxiTitle({ title, type }) {
    console.log("type", type)
    return (
        <>
            <div id="taxi-party-detail-title">{title}</div>
            <div className="main-taxi-type-wrapper">
                <TaxiType taxiType={type === "대형택시" ? "large" : null}>{type}</TaxiType>
            </div>
        </>
    )
}

export default TaxiTitle;

function TaxiType({ children, taxiType }) {
    return (
        <div className={`taxi-type ${taxiType ? "taxi-type-"+taxiType : null}`}>
            <div className="taxi-type-color"></div>
            <div>{children}</div>
        </div>
    );
}