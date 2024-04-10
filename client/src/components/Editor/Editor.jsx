
import PropTypes from 'prop-types';
import { useEffect, useRef } from "react";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import CodeMirror from "codemirror";
import { ACTIONS } from "../../Actions";

function Editor({ socketRef, roomId, onCodeChange }) {
    const editorRef = useRef(null);

    useEffect(() => {
        const init = async () => {
            const editor = CodeMirror.fromTextArea(
                document.getElementById("realtimeEditor"),
                {
                    mode: { name: "javascript", json: true },
                    theme: "dracula",
                    autoCloseTags: true,
                    autoCloseBrackets: true,
                    lineNumbers: true,
                }
            );
            // for sync the code
            editorRef.current = editor;

            editor.setSize(null, "100%");
            editorRef.current.on("change", (instance, changes) => {
                // console.log("changes", instance ,  changes );
                const { origin } = changes;
                const code = instance.getValue(); // code has value which we write
                onCodeChange(code);
                if (origin !== "setValue") {
                    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                        roomId,
                        code,
                    });
                }
            });
        };

        init();
    }, [onCodeChange, roomId, socketRef]);

    useEffect(() => {
        if (socketRef.current) {
            const socket = socketRef.current;
            socket.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                if (code !== null) {
                    editorRef.current.setValue(code);
                }
            });
            return () => {
                socket.off(ACTIONS.CODE_CHANGE);
            };
        }
    }, [socketRef]);

    return (
        <div style={{ height: "100%" }}>
            <textarea id="realtimeEditor"></textarea>
        </div>
    );
}

Editor.propTypes = {
    socketRef: PropTypes.shape({
        current: PropTypes.object.isRequired
    }).isRequired,
    roomId: PropTypes.string.isRequired,
    onCodeChange: PropTypes.func.isRequired
};

export default Editor;
