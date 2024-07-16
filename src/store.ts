import { Category } from "./models/Category.ts";
import { create } from "zustand";
import { AnswerModel, QuestionAndAnswers, ServerQuestionsResult } from "./models/Question.ts";
import { TOTAL_QUESTIONS } from "./utils.ts";

type Actions = {
    getCategories: () => void
    getQuizQuestions: () => void
    reset: () => void
    updateAnswers: ({answer, question}: { answer: AnswerModel, question: string }) => void
    setCategoryIdSelected: (categoryId: string) => void
    setDifficultySelected: (difficulty: string) => void
}

type State = {
    categories: Category[];
    questions: QuestionAndAnswers[];
    userAnswers: Map<string, AnswerModel>;
    loadingCategories: boolean;
    loadingQuestions: boolean;
    categoryIdSelected: string;
    difficultySelected: string;
}

const initialState: State = {
    categories: [],
    questions: [],
    userAnswers: new Map(),
    loadingCategories: false,
    loadingQuestions: false,
    categoryIdSelected: '',
    difficultySelected: ''
};

export const useAppStore = create<State & Actions>()((set, get) => ( {
    ...initialState,
    getCategories: async () => {
        set({loadingCategories: true});
        await fetch('https://opentdb.com/api_category.php')
            .then((result) => result.json())
            .then((result) => set({loadingCategories: false, categories: result.trivia_categories}))
            .finally(() => set({loadingCategories: false}));
    },
    setCategoryIdSelected: (categoryId: string) => set({categoryIdSelected: categoryId}),
    setDifficultySelected: (difficulty: string) => set({difficultySelected: difficulty}),
    getQuizQuestions: async () => {
        set({loadingQuestions: true});
        const {categoryIdSelected, difficultySelected} = get();
        fetch(`https://opentdb.com/api.php?amount=${TOTAL_QUESTIONS}&category=${categoryIdSelected}&difficulty=${difficultySelected}&type=multiple`)
            .then((result) => result.json())
            .then((result: ServerQuestionsResult) => {
                const questions = result.results.map((question) => {
                    const answers = [question.correct_answer, ...question.incorrect_answers].sort(() => Math.random() - 0.5);
                    return {
                        question: question.question,
                        answers: answers.map((answer) => ( {
                            text: answer,
                            isCorrect: answer === question.correct_answer
                        } )),
                    }
                });
                set({questions});
            })
            .finally(() => set({loadingQuestions: false}));
    },
    updateAnswers: ({answer, question}: { answer: AnswerModel, question: string }) => {
        set((state) => {
            const updatedAnswers = new Map(state.userAnswers);
            updatedAnswers.set(question, answer);
            return {userAnswers: updatedAnswers};
        });
    },
    reset: () => {
        set(initialState)
    },
} ));