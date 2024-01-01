import React, { Component, useEffect } from "react";
import Trix from "trix";
import "../../css/trix.css";

const Wysiwyg = (props) => {
    const trixInput = React.createRef();
    useEffect(() => {
        trixInput.current.addEventListener("trix-change", (event) => {
            props.onChange(event.target.innerHTML); //calling custom event
        });
        if (!props.richTextInput) {
            props.setRichTextInput(trixInput.current);
        }
    }, [trixInput]);

    return (
        <div id="trix-parent-wrapper">
            <input type="hidden" id="trix" value={props.value} required />
            <trix-editor input="trix" ref={trixInput} />
        </div>
    );
};

export default Wysiwyg;
