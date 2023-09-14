export class DocumentConflictError extends Error {
    constructor() {
        super('The received document is already in use');
        this.name = 'DocumentConflictError';
    }
}
