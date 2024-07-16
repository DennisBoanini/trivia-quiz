import { QuestionAndAnswers } from "../models/Question.ts";
import Answer from "./Answer.tsx";
import { useAppStore } from "../store.ts";
import { useNavigate } from "react-router-dom";
import { Title } from "./Title.tsx";
import { Button } from "./form/Button.tsx";

type Props = {
    questions: QuestionAndAnswers[]
    showResults: boolean
}
export default function Questions(props: Props) {
    const {updateAnswers, userAnswers, questions} = useAppStore()
    const navigate = useNavigate()

    return (
        <div style={{display: "flex", flexDirection: "column", gap: "15px"}}>
            {questions.map((question, index) => (
                <div key={index}>
                    <Title level={3} text={question.question}/>
                    <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                        {question.answers.map((answer, answerIndex) => {
                            const isSelected = userAnswers.get(question.question)?.text === answer.text;
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

            {userAnswers && userAnswers.size > 0 && userAnswers.size === props.questions.length && !props.showResults && (
                <Button id={'submitAnswersBtn'} onClick={() => navigate('/trivia-quiz/results/')}>Submit</Button>
            )}
        </div>
    )
}