import Row from "antd/es/row";
import React from "react";
import Spinner from "react-bootstrap/esm/Spinner";

export interface SpinnerCompProps {

}

const SpinnerComp: React.FC<SpinnerCompProps> = () => {
    return(
        <Row className="spinner-style" style={{zIndex: 9999, color: "aliceblue"}}>
            <Spinner animation="border"/>
        </Row>
    )
}

export default SpinnerComp;