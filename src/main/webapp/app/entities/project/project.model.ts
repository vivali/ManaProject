import { BaseEntity, User } from './../../shared';

export class Project implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public picture?: string,
        public manday?: number,
        public referent?: string,
        public year?: number,
        public user?: User
    ) {
    }
}
