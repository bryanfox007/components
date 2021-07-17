import Field from '../interfaces/Field';
import { html, TemplateResult } from 'lit';

const input = (field: Field, _e: any): TemplateResult => {
  let cs = field.componentSettings;
  return html`
    <sl-input
      label="${field.label}"
      placeholder="${field.placeholder}"
      ?clearable="${cs.clearable}"
      ?disabled="${cs.disabled || false}"
      value="${field.value}"
      @sl-input="${(e: any) => _e._updateValue(e.target.value, field)}"
      help-text="${field.helpText || ''}"
    ></sl-input>
  `;
};

export default input;
