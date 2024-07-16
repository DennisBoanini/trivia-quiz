import { QuestionAndAnswers } from "../models/Question.ts";
import Answer from "./Answer.tsx";
import { useAppStore } from "../store.ts";
import { useNavigate } from "react-router-dom";

type Props = {
    questions: QuestionAndAnswers[]
    showResults: boolean
}
export default function Questions(props: Props) {
    const {updateAnswers, answers, questions} = useAppStore()
    const navigate = useNavigate()

    return (
        <div style={{display: "flex", flexDirection: "column", gap: "15px"}}>
            {questions.map((question, index) => (
                <div key={index}>
                    <h2 dangerouslySetInnerHTML={{__html: question.question}}/>
                    <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                        {question.answers.map((answer, answerIndex) => {
                            const isSelected = answers.get(question.question)?.text === answer.text;
                            let backgroundColor = ''
                            if (!props.showResults) {
                                backgroundColor = isSelected ? "lightblue" : "white"
                            } else {
                                const correct = answer.isCorrect;
                                backgroundColor = isSelected ? (correct ? "green" : "red") : (correct ? "green" : "white")
                            }

                            return <Answer
                                key={answerIndex}
                                answer={answer}
                                showResults={props.showResults}
                                backgroundColor={backgroundColor}
                                onAnswerSelect={(choice) => updateAnswers({
                                    answer: choice,
                                    question: question.question
                                })}/>
                        })}
                    </div>
                </div>
            ))}

            {answers && answers.size > 0 && answers.size === props.questions.length && !props.showResults && (
                <button onClick={() => navigate('/results')}>Submit</button>
            )}
        </div>
    )
}