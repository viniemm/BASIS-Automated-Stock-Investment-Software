// Questionnaire Models

import {Auth} from "../authSlice";
import {RootState} from "../../app/store";

export interface QuestionnaireState {
    answers: QuestionnaireOutput,
    // Slider Info
    sum?: number | string,
    sliderSum?: number,
    step?: number,
    questionnaireDone?: boolean,
    auth?: Auth,
    authState?: RootState
}

export interface QuestionnaireProps {
    answers: QuestionnaireOutput,
    auth?: Auth,
    authState?: RootState
}

export interface QuestionnaireOutput {
    moneyInvested?: number,
    riskThreshold?: number,
    termPeriod?: string,
    investPrev?: boolean,
    industries?: string[]
}