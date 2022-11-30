import axios from 'axios';
import { Console } from 'console';

// POST QUESTIONNAIRE

interface QuestionnaireOutput {
    moneyInvested?: number,
    riskThreshold?: number,
    termPeriod?: string,
    investPrev?: boolean,
    industries?: string[]
}

export const sendQuestionnaire = async (answers: QuestionnaireOutput) => {
    const response = await axios
        .post('/api/questionnaire/', JSON.stringify(answers));
    if (response.status === 200) {
        console.log("Nice");
    }
};