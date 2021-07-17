import Field from '../interfaces/Field';
import checkbox from './Checkbox';
import input from './Input';
import select from './Select';
import { html, LitElement, TemplateResult } from 'lit';

const getComponent = (field: Field, _c: LitElement): TemplateResult => {
  if (field.component === 'select') {
    return select(field, _c);
  } else if (field.component === 'text') {
    return input(field, _c);
  } else if (field.component === 'checkbox') {
    return checkbox(field, _c);
  }
  return html``;
};

export default getComponent;
