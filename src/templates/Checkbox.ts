import { html, TemplateResult } from 'lit';
import Field from '../interfaces/Field';

const checkbox = (field: Field, _c: any): TemplateResult => {
  let cs = field.componentSettings;
  const boolVal = field.value === '0' ? false : !!field.value;
  return html`
    <sl-checkbox
      ?checked="${boolVal}"
      value="${boolVal}"
      @sl-change="${(e: any) => _c._updateValue(e.target.value, field)}"
      ?disabled="${cs.disabled || false}"
    >
      ${field.label}
    </sl-checkbox>
  `;
};

export default checkbox;
