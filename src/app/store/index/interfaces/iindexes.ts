import { City } from '../../../Models/Cities/city.Model';
import { Client } from '../../../../app/views/app/client/client.model';
import { IBranches } from '../../branche/interfaces/ibranches';

export interface IIndexes {
    countries: City[]
    clients: Client[],
    benaches: IBranches[]
}
