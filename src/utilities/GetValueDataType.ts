const valueDataType = (dataType: string, value: any) => {
  let newValue = value;
  if (dataType) {
    switch (dataType) {
      case 'string':
        newValue = String(newValue);
        break;
      case 'bool':
        newValue = Boolean(newValue);
        break;
      case 'array':
        if (!Array.isArray(newValue)) {
          newValue = [newValue];
        }
        break;
      case 'int':
        newValue = parseInt(newValue);
        break;
    }
  }
  return newValue;
};

export default valueDataType;
