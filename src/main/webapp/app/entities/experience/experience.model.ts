import { BaseEntity } from './../../shared';

export class Experience implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
    ) {
    }
}
