export default interface DataTransformerInterface<IN, OUT> {
	transformToIn(newValue: OUT | null | undefined): IN;
	transformToOut(
		newValue: IN | null | undefined,
		oldValue: OUT | null | undefined
	): OUT;
}
