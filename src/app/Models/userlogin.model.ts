import { NameAndIdDto } from './name-and-id-dto.model';

export class UserLogin {
  id: number;
  name: any;
  token: any;
  privileges: any[];
  expiry: any;
  policy: any;
  haveTreasury: boolean;
  branches: NameAndIdDto[]=[];
  branche: NameAndIdDto;
}
