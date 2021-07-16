import { Agent } from "https"

export class OrderLog {
    id
    code
    clientId
    countryId
    deliveryCost
    cost
    oldCost?
    agentCost
    recipientName
    recipientPhones
    regionId?
    address
    clientNote
    moenyPlacedId
    orderplacedId
    date?
    diliveryDate?
    note
    agentId?
    seen?
    isClientDiliverdMoney
    isSync
    orderStateId
    updatedBy
    orderId
    isDollar?
    updatedDate?
    systemNote
    agent: Agent
    client
    country
    region
    monePlaced
    orderplaced
}
