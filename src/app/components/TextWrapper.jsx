import {useSelector} from "react-redux";

export default function TextWrapper() {
    const text = useSelector(state => state.text.text);

    return (
        <div>
            {text}
        </div>
    );
}