export interface Portfolio {
    name: string,
    value: number,
    allocations: Allocation[]
}

export interface Allocation {
    symbol: string,
    allocation: number
}

export interface PortfolioDetails {
    portfolios: Portfolio[]
}