export class OrderForzenInWayFilter {
    hour
    agentId
    clientId
    countryId
    currentDate
    isInStock
    isInWay
    isWithAgent
    isSelectedAll: boolean;
    selectedIds: number[] = [];
    exceptIds: number[] = [];
}
