import { useAppStore } from "../store.ts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Questions from "../components/Questions.tsx";

export default function ResultPage() {
    const {answers, questions, reset} = useAppStore()
    const [score, setScore] = useState<number>(0);
    const navigate = useNavigate()

    useEffect(() => {
        if (answers.size === 0) {
            navigate('/trivia-quiz/', {replace: true});
        }

        const score = Array.from(answers.values()).reduce((acc, answer) => acc += answer.isCorrect ? 1 : 0, 0);
        setScore(score);
    }, [answers, navigate, questions]);

    function getBackgroundColor() {
        if ([0, 1].includes(score)) {
            return 'red';
        }

        if ([2, 3].includes(score)) {
            return 'yellow';
        }

        return 'green';
    }

    function createNewQuiz() {
        reset();
        navigate('/trivia-quiz/', {replace: true});
    }

    return (
        <div>
            <h1>Results</h1>
            <Questions questions={questions} showResults={true}/>
            <div style={{marginTop: "20px", width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <h2 style={{padding: "5px", backgroundColor: getBackgroundColor()}}>Your score is: {score} out of {questions.length}</h2>
            </div>
            <button onClick={() => createNewQuiz()}>Create a new quiz</button>
        </div>
    )
}