import { BaseEntity } from './../../shared';

export class PreRelationships implements BaseEntity {
    constructor(
        public id?: number,
        public number?: number,
        public experienceid?: BaseEntity,
        public roleid?: BaseEntity,
        public projectid?: BaseEntity,
    ) {
    }
}
