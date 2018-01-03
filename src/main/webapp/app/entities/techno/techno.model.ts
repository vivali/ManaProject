import { BaseEntity } from './../../shared';

export class Techno implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
    ) {
    }
}
