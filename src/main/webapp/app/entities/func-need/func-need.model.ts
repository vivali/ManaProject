import { BaseEntity } from './../../shared';

export class FuncNeed implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
    ) {
    }
}
