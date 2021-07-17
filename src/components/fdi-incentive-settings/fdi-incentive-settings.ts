import { LitElement, html, unsafeCSS, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import styles from 'sass:./fdi-incentive-settings.scss';
import axios from 'axios';

import KeyableObject from '../../interfaces/KeyableObject';
import Field from '../../interfaces/Field';

import getComponent from '../../templates/TemplateSelector';

import fieldMatchesSearchQuery from '../../utilities/FieldMatchesSearchQuery';
import valueDataType from '../../utilities/GetValueDataType';

import * as testJSON from "../../test-data/fdi-settings.json";

/**
 * @since 2.0
 * @status experimental
 *
 * @property fetch-url
 * The URL to fetch data from.
 *
 * @property save-url
 * The URL to send data after the save button is clicked. If there is no save-url, save button will not be
 * shown and an event will be emitted instead.
 *
 * @dependency sl-example
 *
 * @event sl-event-name - Emitted as an example.
 *
 * @slot - The default slot.
 * @slot example - An example slot.
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --example - An example CSS custom property.
 */
@customElement('fdi-incentive-settings')
export default class FdiIncentiveSettings extends LitElement {
  static styles = unsafeCSS(styles);

  @property({
    attribute: 'fetch-url'
  })
  fetch_url: string = '';

  @property({
    attribute: 'save-url'
  })
  save_url: string = '';

  @state()
  fields: KeyableObject = {};

  @state()
  tabs: KeyableObject = {};

  @state()
  noTabFields: KeyableObject = {};

  @state()
  searchQuery: string = '';

  _updateValue(value: any, field: Field) {
    this.fields[field.key].value = valueDataType(field.dataType, value);
    console.log({
      fields: this.fields
    });
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.fetchData();
  }

  async fetchData() {
    console.log( 'Using test data.' );
    let testData = testJSON;
    this.fields = { ...testData.module.data.fields };
    this.syncData();

    if ( this.fetch_url ){
      console.log( 'Attempting to fetch data.' );
      await axios.get( `${this.fetch_url}` ).then(r => {
        let data = r.data;
        if (data && data.success) {
          this.fields = { ...data.module.data.fields };
          this.syncData();
        }
      });
    }
  }

  async saveData() {
    console.log({
      dataSaving: this.fields
    });
    if ( this.save_url ){
      await axios.post(`${this.save_url}`, this.fields).then(r => {
        console.log({
          r
        });
      });
    }
  }

  syncData() {
    this.tabs = {};
    this.noTabFields = {};
    for (const arr of Object.entries(this.fields)) {
      let key: string = arr[0];
      let field: Field = arr[1];
      field.__hide = !fieldMatchesSearchQuery(field, this.searchQuery);
      if (field.tab && !this.searchQuery) {
        if (!this.tabs.hasOwnProperty(field.tab)) {
          this.tabs[field.tab] = [];
        }
        this.tabs[field.tab].push(field);
      } else if (!field.__hide) {
        this.noTabFields[key] = field;
      }
    }
  }

  render(): TemplateResult {
    return html`
      <div class="fdi-settings--search-container">
        <sl-input
          placeholder="Search"
          @sl-change="${(e: any) => {
            this.searchQuery = e.target.value;
            this.syncData();
          }}"
        >
          <sl-icon name="search" slot="prefix"></sl-icon>
        </sl-input>
      </div>
      <div class="fdi-settings--tab-container">
        ${Object.keys(this.tabs).length > 0 && !this.searchQuery
          ? html` <sl-tab-group>
              ${Object.entries(this.tabs).map((tab: any) => {
                return html`
                  <sl-tab slot="nav" panel="${tab[0]}">${tab[0]}</sl-tab>
                  ${tab[1].map((field: Field) => {
                    return html` <sl-tab-panel style="display: ${field.__hide ? 'none' : 'block'}" name="${tab[0]}">
                      ${getComponent(field, this)}
                    </sl-tab-panel>`;
                  })}
                `;
              })}
            </sl-tab-group>`
          : html``}
      </div>
      <div class="fdi-settings--field-container">
        ${Object.keys(this.noTabFields).length > 0
          ? html`
              ${Object.entries(this.noTabFields).map((field: any) => {
                return html`
                  <div style="display: ${field[1].__hide ? 'none' : 'block'}">${getComponent(field[1], this)}</div>
                `;
              })}
            `
          : html``}
      </div>
      <div style="display: ${this.save_url ? 'block' : 'block'}" class="fdi-settings--save-button-container">
        <sl-button type="primary" @click="${this.saveData}">
          <sl-icon slot="prefix" name="cloud-arrow-up"></sl-icon>
          Save
        </sl-button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'fdi-incentive-settings': FdiIncentiveSettings;
  }
}
