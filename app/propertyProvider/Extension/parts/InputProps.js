import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

import {
  is,
  getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';
var cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper');

var prop = {};

export default function(group, element, translate, dropdownOptions, ddName, _id) {

  if (is(element, 'bpmn:StartEvent') || is(element, 'bpmn:Activity')) {
    var bo = getBusinessObject(element);
    var attributes = bo.$attrs;
    var values = attributes[_id];
    
      var dropdownBox = entryFactory.selectBox(translate, {
        id: _id,
        label: ddName,
        emptyParameter: false,
        selectOptions: dropdownOptions,
        modelProperty: _id,

        get: function(element, node) {
          return bo;
        },

        set: function setValue(element, values, node) {

          var b_obj = getBusinessObject(element);
          var selectedValues = {};
          selectedValues = values;
          prop[_id] = selectedValues[_id];
    
          var bo = cmdHelper.updateBusinessObject(element, b_obj, prop);
          return bo;
        },
      })
      group.entries.push(dropdownBox);
  }
}