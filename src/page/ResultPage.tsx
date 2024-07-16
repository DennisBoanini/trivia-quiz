import { useAppStore } from "../store.ts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Questions from "../components/Questions.tsx";
import { Title } from "../components/Title.tsx";
import { Button } from "../components/form/Button.tsx";

export default function ResultPage() {
    const {userAnswers, questions, reset} = useAppStore()
    const [score, setScore] = useState<number>(0);
    const navigate = useNavigate()

    useEffect(() => {
        if (userAnswers.size === 0) {
            navigate(-1);
        }

        const score = Array.from(userAnswers.values()).reduce((acc, answer) => acc += answer.isCorrect ? 1 : 0, 0);
        setScore(score);
    }, [userAnswers, navigate, questions]);

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
        <div style={{display: "flex", alignItems: "center", justifyItems: "center", flexDirection: "column"}}>
            <Title level={1} text={'RESULTS'}/>
            <Questions questions={questions} showResults={true}/>
            <div style={{marginTop: "20px", width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <h2 style={{padding: "5px", backgroundColor: getBackgroundColor()}}>Your score is: {score} out of {questions.length}</h2>
            </div>
            <Button id={'createNewQuizBtn'} onClick={() => createNewQuiz()}>Create a new quiz</Button>
        </div>
    )
}