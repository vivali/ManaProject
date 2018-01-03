import { BaseEntity } from './../../shared';

export class TechNeed implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
    ) {
    }
}
