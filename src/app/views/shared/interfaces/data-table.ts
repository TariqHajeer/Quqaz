export interface columnsOptions {
    name: string;
    type: 'string' | 'number' | 'date' | 'input' | 'select' | 'object' | 'badge' | 'checkbox' | 'html';
    value: any;
    option?: any[];
    disabled: boolean;
    hide: boolean;
    required: boolean;
}