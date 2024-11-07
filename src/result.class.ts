export class Result {
    constructor(
        public value: number,
        public variables: Record<string, number>
    ) {}

    valueOf() {
        return this.value;
    }
}
