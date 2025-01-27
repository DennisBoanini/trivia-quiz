import { FormEvent, useEffect } from "react";
import Select from "./components/form/Select.tsx";
import { difficultyOptions } from "./utils.ts";
import Questions from "./components/Questions.tsx";
import { useAppStore } from "./store.ts";
import { Button } from "./components/form/Button.tsx";
import { Title } from "./components/Title.tsx";

function App() {
    const {
        getCategories,
        getQuizQuestions,
        loadingQuestions,
        questions,
        loadingCategories,
        categories,
        categoryIdSelected,
        difficultySelected,
        setCategoryIdSelected,
        setDifficultySelected
    } = useAppStore()

    useEffect(() => {
        getCategories()
    }, [getCategories]);

    function onSubmitHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const isCategorySelected = categoryIdSelected && categoryIdSelected.trim().length > 0;
        const isDifficultySelected = difficultySelected && difficultySelected.trim().length > 0;
        if (!isCategorySelected || !isDifficultySelected) {
            let missingField = 'a category and a difficulty';
            if (!isCategorySelected && isDifficultySelected) {
                missingField = 'a category';
            }

            if (!isDifficultySelected && isCategorySelected) {
                missingField = 'a difficulty';
            }
            alert(`Please select ${missingField}`);
            return;
        }

        getQuizQuestions();
    }

    return (
        <>
            {loadingCategories && <p>Loading...</p>}
            {!loadingCategories &&
                <div style={{display: "flex", alignItems: "center", justifyItems: "center", flexDirection: "column"}}>
                    <Title level={1} text={'QUIZ MAKER'}/>
                    <form style={{display: 'flex', gap: '5px', alignItems: "end"}} onSubmit={onSubmitHandler}>
                        <Select
                            id="categorySelect"
                            label="Category"
                            placeholder="Select a category"
                            options={categories.map((category) => ( {
                                value: category.id.toString(),
                                label: category.name
                            } ))}
                            onChange={(e) => setCategoryIdSelected(e.target.value)}
                        />

                        <Select
                            id="difficultySelect"
                            label="Difficulty"
                            placeholder="Select difficulty"
                            options={difficultyOptions}
                            onChange={(e) => setDifficultySelected(e.target.value)}
                        />

                        <Button id={'createBtn'} type={'submit'}>Create quiz</Button>
                    </form>

                    {loadingQuestions && categoryIdSelected && difficultySelected && <p>Loading...</p>}
                    {!loadingQuestions && <Questions questions={questions} showResults={false}/>}
                </div>
            }
        </>
    )
}


export default App
