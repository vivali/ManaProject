import { BaseEntity } from './../../shared';

export class Version implements BaseEntity {
    constructor(
        public id?: number,
        public number?: string,
        public projectid?: BaseEntity,
        public technoid?: BaseEntity,
    ) {
    }
}
