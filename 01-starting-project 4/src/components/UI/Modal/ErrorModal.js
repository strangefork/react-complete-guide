import React from "react";
import ReactDOM from "react-dom";

import classes from "./ErrorModal.module.css";
import Card from "../Card/Card";
import Button from "../Button/Button";

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onDismiss} />;
};

const ModalOverlay = (props) => {
    return (
        <Card className={classes.modal}>
            <header className={classes.header}>
                <h2>{props.title}</h2>
            </header>
            <div className={classes.content}>
                <p>{props.message}</p>
            </div>
            <footer className={classes.actions}>
                <Button onClick={props.onDismiss} type="button">
                    Okay
                </Button>
            </footer>
        </Card>
    );
};

const ErrorModal = (props) => {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onDismiss={props.onDismiss} />, document.getElementById("backdrop-root"))}
            {ReactDOM.createPortal(
                <ModalOverlay title={props.title} message={props.message} onDismiss={props.onDismiss} />,
                document.getElementById("overlay-root")
            )}
        </>
    );
};

export default ErrorModal;
