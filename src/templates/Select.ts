import Field from '../interfaces/Field';
import { html, TemplateResult } from 'lit';

const select = (field: Field, _c: any): TemplateResult => {
  if (field.opts) {
    let cs = field.componentSettings;
    return html`
      <sl-select
        label="${field.label || ''}"
        placeholder="${field.placeholder || ''}"
        ?clearable="${cs.clearable || true}"
        ?multiple="${cs.multiple || false}"
        ?disabled="${cs.disabled || false}"
        @sl-change="${(e: any) => _c._updateValue(e.target.value, field)}"
        value="${field.value}"
        help-text="${field.helpText || ''}"
      >
        ${field.opts.map((opt: any) => {
          return html` <sl-menu-item value="${opt.value}">${opt.display}</sl-menu-item> `;
        })}
      </sl-select>
    `;
  }
  return html``;
};

export default select;
