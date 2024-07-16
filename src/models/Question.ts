export type Question = {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
};

export type ServerQuestionsResult = {
    response_code: number;
    results: Question[];
};

export type QuestionAndAnswers = {
    question: string;
    answers: AnswerModel[];
}

export type AnswerModel = {
    text: string;
    isCorrect: boolean;
}