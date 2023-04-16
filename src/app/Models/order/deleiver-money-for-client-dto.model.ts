import { PointSetting } from '../pointSettings/point-setting.model';
import { OrderClientDontDiliverdMoney } from './order-client-dont-diliverd-money.model';
export class DeleiverMoneyForClientDto {
    IsSelectedAll: boolean;
    SelectedIds: number[];
    ExceptIds: number[];
    PointsSettingId?: number;
    point: PointSetting = new PointSetting();
    Filter: OrderClientDontDiliverdMoney = new OrderClientDontDiliverdMoney();
}

