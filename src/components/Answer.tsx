import { AnswerModel } from "../models/Question.ts";
import { Button } from "./form/Button.tsx";

type Props = {
    answer: AnswerModel;
    onAnswerSelect: (answer: AnswerModel) => void;
    backgroundColor: string;
    showResults: boolean;
}

export default function Answer(props: Props) {
    return <Button id={props.answer.text} type={'button'} className={props.showResults ? '' : 'answer'}
                   onClick={props.showResults ? undefined : () => props.onAnswerSelect(props.answer)}
                   style={{
                       border: "solid 1px black",
                       borderRadius: "10px",
                       padding: "15px",
                       minWidth: "150px",
                       textAlign: "center",
                       backgroundColor: props.backgroundColor
                   }}>
        <span dangerouslySetInnerHTML={{__html: props.answer.text}}></span>
    </Button>
}