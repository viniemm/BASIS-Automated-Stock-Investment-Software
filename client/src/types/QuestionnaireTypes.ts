export interface QuestionnaireState {
    answers: QuestionnaireOutput,
    // Slider Info
    sum?: number | string,
    sliderSum?: number,
    step?: number,
    questionnaireDone?: boolean
}

export interface QuestionnaireProps {
    answers: QuestionnaireOutput
}

export interface QuestionnaireOutput {
    moneyInvested?: number,
    riskThreshold?: number,
    termPeriod?: string,
    investPrev?: boolean,
    industries?: string[]
}

