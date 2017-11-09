const TRANSLATE_REGEX = /translate3d\((\s*[^,]+),(\s*[^,]+),(\s*[^,]+)\)/;
const TRANSLATE_TEMPLATE = 'translate3d(v0px, v1px, v2px)';

export const getTranslate3dValues = function(value) {
    const values = TRANSLATE_REGEX.exec(value);
    return values.slice(1).map((cur) => parseInt(cur, 10));
}

export const getTranslate3dString = function(values) {
    let resultString = TRANSLATE_TEMPLATE;
    for(let i = 0; i < values.length; i++) {
        resultString = resultString.replace(`v${i}`, values[i]);
    }
	return resultString;
}