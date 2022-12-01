import _each from "lodash/each";
import _isNil from "lodash/isNil";
import _isArray from "lodash/isArray";
import _isObject from "lodash/isObject";

export const convertToFormData = (data: any) => {
  const formData = new FormData();
  if (_isObject(data) || _isArray(data)) {
    _each(data, (value, key) => {
      if (_isNil(value)) return;
      if (_isArray(value)) {
        _each(value, (item: any) => formData.append(`${key}`, item));
      } else if (_isObject(value)) {
        _each(value, (item: any, subKey) => formData.append(`${key}[${subKey}]`, item));
      } else {
        formData.append(key, value);
      }
    });
  }

  return formData;
};
