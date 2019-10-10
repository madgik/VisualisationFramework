import validator from 'validator';
import update from 'immutability-helper';

class ConfigurationValidators {

  validate(item, validationState, previousConfigs) {
    var fieldsToValidate = [
      'label',
      'type',
      'xAxis',
      'xAxisLabel',
      'yAxis',
      'yAxisLabel',
      'zAxis',
      'zAxisLabel',
      'labelField',
      'valueField'];

    var transformationsFieldsToValidate = [
      'transformationLabel',
      'transformationLabelValue',
      'transformationColumns'];


    var filterFieldsToValidate = [
      'filterLabel',
      'filterField'];

    var valid = true;
    var messages = [];
    fieldsToValidate.forEach(field => {
      var result = this.validateField(field, item, validationState, previousConfigs)
      validationState = result.state;
      valid = valid && result.valid;

      messages.push.apply(messages, result.messages);
    })

    if (!!item.filters) {
      filterFieldsToValidate.forEach(field => {
        // valid = false;
        var result = this.validateField(field, item, validationState, previousConfigs)
        validationState = result.state;
        console.log("!!" + result.valid)

        valid = valid && result.valid;

        messages.push.apply(messages, result.messages);
      })
    }


    if (!!item.transformations) {
      transformationsFieldsToValidate.forEach(field => {
        var result = this.validateField(field, item.transformations, validationState, previousConfigs)
        validationState = result.state;
        valid = valid && result.valid;

        messages.push.apply(messages, result.messages);
      })
    }
    return {
      state: validationState,
      valid: valid,
      messages: messages
    }
  }

  validateField(field, item, validationState, previousConfigs) {
    var valid = true;
    var messages = [];
    (this.validators[field] || []).forEach(validator => {
      
      if (field.includes("filter")) {
        if (!validator.f(field || '', item)) {
          valid = false;
          messages.push(validator.m);
        }
      }
      else if (!validator.f(item[field] || '', item)) {
        valid = false;
        messages.push(validator.m);
      }
      if (field === "label") {
        if (previousConfigs.find(el => el.name === item.label)) {
          valid = false;
          messages.push(validator.same)
        }
      }
    });
    const state = update(validationState, {
      [field]: {
        $set: {
          valid: valid,
          touched: true,
          messages: messages
        }
      }
    });

    return {
      state: state,
      valid: valid,
      messages: messages
    }
  }

  validators = {
    'label': [{
      f: (val) => !validator.isEmpty(val),
      m: 'The label field is required',
      same: 'The selected label field already exists'
    }],
    'type': [{
      f: (val) => !validator.isEmpty(val),
      m: 'The type field is required'
    }],
    'xAxis': [{
      f: (val, item) => !this.showLineChartFields(item) || !validator.isEmpty(val),
      m: 'The x axis field is required'
    }],
    'xAxisLabel': [{
      f: (val, item) => !this.showLineChartFields(item) || !validator.isEmpty(val),
      m: 'The x axis label field is required'
    }],
    'yAxis': [{
      f: (val, item) => !this.showLineChartFields(item) || !validator.isEmpty(val),
      m: 'The y axis field is required'
    }],
    'yAxisLabel': [{
      f: (val, item) => !this.showLineChartFields(item) || !validator.isEmpty(val),
      m: 'The y axis label field is required'
    }],
    'zAxis': [{
      f: (val, item) => !this.hasZAxis(item) || !validator.isEmpty(val),
      m: 'The z axis field is required'
    }],
    'zAxisLabel': [{
      f: (val, item) => !this.hasZAxis(item) || !validator.isEmpty(val),
      m: 'The z axis label field is required'
    }],
    'labelField': [{
      f: (val, item) => !this.showPieChartFields(item) || !validator.isEmpty(val),
      m: 'The label field is required'
    }],
    'valueField': [{
      f: (val, item) => !this.showPieChartFields(item) || !validator.isEmpty(val),
      m: 'The value field is required'
    }],
    'transformationLabel': [{
      f: (val, item) => !this.checkTransformationsFields(item) || !validator.isEmpty(val),
      m: 'The transformation label field is required'
    }],
    'transformationLabelValue': [{
      f: (val, item) => !this.checkTransformationsFields(item) || !validator.isEmpty(val),
      m: 'The transformation label value field is required'
    }],
    'transformationColumns': [{
      f: (val, item) => !this.checkTransformationsFields(item) || !(val.length === 0),
      m: 'The transformation columns are required'
    }],
    'filterLabel': [{
      f: (val, item) => this.checkFiltersFields(val, item),
      m: 'The filter label is required'
    }],
    'filterField': [{
      f: (val, item) => this.checkFiltersFields(val, item),
      m: 'The filter field is required'
    }]
  }

  showLineChartFields = (item) => {
    return (item.type === 'Spline' ||
      item.type === 'Scatter' ||
      item.type === 'Line' ||
      item.type === 'Step' ||
      item.type === 'ThreeD' ||
      item.type === 'Bar');
  }

  hasZAxis = (item) => {
    return (item.type === 'ThreeD');
  }

  showPieChartFields = (item) => {
    return (item.type === 'Pie' ||
      item.type === 'Doughnut' ||
      item.type === 'Polar');
  }

  checkTransformationsFields = (item) => {
    if ((!validator.isEmpty(item.transformationLabel) || !validator.isEmpty(item.transformationLabelValue)
      || !(item.transformationColumns.length === 0)))
      return true;
    else
      return false;
  }

  checkFiltersFields = (val, item) => {
    var flag = true;

    if (item != "" && item.filters === undefined) {
      if (!validator.isEmpty(item.label)
        && (!validator.isEmpty(item.field)))
        return true;
      else
        return false;
    }
    else if (item != "" && item.filters !== undefined) {
      for (var filter of item.filters) {
        if (validator.isEmpty(filter.label) || (validator.isEmpty(filter.field))) {
          flag = false;
        }
      }

    }
    return flag;
  }

}

export default new ConfigurationValidators();