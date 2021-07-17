import FieldComponentSettings from './FieldComponentSettings';

export default interface Field {
  key: string;
  src: string;
  default: any;
  tab?: string;
  label: string;
  placeholder?: string;
  component: string;
  dataType: string;
  search_tags?: string[];
  componentSettings: FieldComponentSettings;
  opts?: object[];
  value: any;
  __hide?: boolean;
  helpText?: string;
}
