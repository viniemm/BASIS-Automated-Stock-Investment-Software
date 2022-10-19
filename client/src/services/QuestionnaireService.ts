import axios from 'axios';
import { Console } from 'console';
import { QuestionnaireOutput } from '../types/QuestionnaireTypes';

// POST QUESTIONNAIRE
export const sendQuestionnaire = async (answers: QuestionnaireOutput)  => {
    let response = await axios
        .post('/api/questionnaire/', JSON.stringify(answers));
        if (response.status === 200) {
            console.log("Nice");
        }
};