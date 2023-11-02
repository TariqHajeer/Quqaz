export class OrderForzenInWayFilter {
    filter: ForzenInWayFilter
    isSelectedAll: boolean;
    selectedIds: number[] = [];
    exceptIds: number[] = [];
}
export interface ForzenInWayFilter {
    hour
    agentId
    clientId
    countryId
    currentDate
    isInStock
    isInWay
    isWithAgent
}