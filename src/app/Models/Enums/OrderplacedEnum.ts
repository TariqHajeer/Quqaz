export enum OrderplacedEnum {
    /**
     * عند العميل
     */
    Client = 1,
    /**
     * في المخزن
     */
    Store = 2,
    /**
     * في الطريق
     */
    Way = 3,
    /**
     * تم التسليم
     */
    Delivered = 4,
    /**
     * مرتجع كلي
     * 5
     */
    CompletelyReturned = 5,
    /**
     * مرتجع جزئي 
     */
    PartialReturned = 6,
    /**
     * مرفوض
     */
    Unacceptable = 7,
    /**
     * مؤجل
     */
    Delayed = 8
}