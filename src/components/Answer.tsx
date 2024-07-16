import { AnswerModel } from "../models/Question.ts";

type Props = {
    answer: AnswerModel;
    onAnswerSelect: (answer: AnswerModel) => void;
    backgroundColor: string;
    showResults: boolean;
}

export default function Answer(props: Props) {
    return <div className={props.showResults ? '' : 'answer'} dangerouslySetInnerHTML={{__html: props.answer.text}}
                onClick={props.showResults ? undefined : () => props.onAnswerSelect(props.answer)}
                style={{
                    border: "solid 1px black",
                    borderRadius: "10px",
                    padding: "15px",
                    minWidth: "150px",
                    textAlign: "center",
                    backgroundColor: props.backgroundColor
                }}/>
}