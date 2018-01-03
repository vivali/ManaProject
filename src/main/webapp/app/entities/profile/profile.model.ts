import { BaseEntity, User } from './../../shared';

export class Profile implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public users?: User[],
    ) {
    }
}
