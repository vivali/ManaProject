import { BaseEntity } from './../../shared';

export class FnDesc implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public projectid?: BaseEntity,
        public funcneedid?: BaseEntity,
    ) {
    }
}
