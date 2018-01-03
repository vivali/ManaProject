import { BaseEntity } from './../../shared';

export class TnDesc implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public techneedid?: BaseEntity,
        public projectid?: BaseEntity,
    ) {
    }
}
