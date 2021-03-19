import inherits from 'inherits';

import PropertiesActivator from 'bpmn-js-properties-panel/lib/PropertiesActivator';
import PropertiesPanel from 'bpmn-js-properties-panel/lib/PropertiesPanel';


// Require all properties you need from existing providers.
// In this case all available bpmn relevant properties without camunda extensions.
import processProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/ProcessProps';
import eventProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/EventProps';
import linkProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/LinkProps';
import idProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/IdProps';
import nameProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/NameProps';


// Require your custom property entries.
import textBoxProps from './parts/TextBoxProps';
//import spellProps from './parts/SpellProps';
import dropdownProps from './parts/DropdownProps';
var dropdownJson = [ { value: 1, name: 'Xyz' }, { value: 2, name: 'Xyz1'}, { value: 3, name: 'Xyz2' }, { value: 4, name: 'Xyz3' }];

// The general tab contains all bpmn relevant properties.
// The properties are organized in groups.
function createGeneralTabGroups(element, bpmnFactory, canvas, elementRegistry, translate) {

  var generalGroup = {
    id: 'general',
    label: 'General',
    entries: []
  };
  idProps(generalGroup, element, translate);
  nameProps(generalGroup, element, bpmnFactory, canvas, translate);
  processProps(generalGroup, element, translate);

  var detailsGroup = {
    id: 'details',
    label: 'Details',
    entries: []
  };
  linkProps(detailsGroup, element, translate);
  eventProps(detailsGroup, element, bpmnFactory, elementRegistry, translate);

  return[
    generalGroup,
    detailsGroup
  ];
}

// Create the custom magic tab
function createMagicTabGroups(element, translate) {

  // Create a group called "Black Magic".
  var blackMagicGroup = {
    id: 'Output',
    label: 'Output',
    entries: []
  };

  // Add the spell props to the black magic group.
  textBoxProps(blackMagicGroup, element, translate, 'InputParameter');

  return [
    blackMagicGroup
  ];
}

// Create the custom magic tab
function createNoMagicTabGroups(element, translate) {

  // Create a group called "Black Magic".
  var blackNoMagicGroup = {
    id: 'Input',
    label: 'Input',
    entries: []
  };


  dropdownProps(blackNoMagicGroup, element, translate, dropdownJson);

  return [
    blackNoMagicGroup
  ];
}

export default function MagicPropertiesProvider(
    eventBus, bpmnFactory, canvas,
    elementRegistry, translate) {

  PropertiesActivator.call(this, eventBus);

  this.getTabs = function(element) {

    var generalTab = {
      id: 'general',
      label: 'General',
      groups: createGeneralTabGroups(element, bpmnFactory, canvas, elementRegistry, translate)
    };

    // The "magic" tab
    var magicTab = {
      id: 'Input',
      label: 'Input',
      groups: createNoMagicTabGroups(element, translate)
    };

    var noMagicTab = {
      id: 'Output',
      label: 'Output',
      groups: createMagicTabGroups(element, translate)
    };

    return [
      generalTab,
      magicTab,
      noMagicTab
      ];
  };

  eventBus.on('propertiesPanel.isPropertyEditable', 10000, function(context) {
        //var element = context.element;
        var entry = context.entry;
        // var group = context.group;
        // var propertyName = context.propertyName,
        // tab = context.tab;
        if(entry.id === 'id'){
            return false;
        }
      });

      // PropertiesPanel.prototype.updateState = function(entry, entryNode) {
      //   this.updateShow(entry, entryNode);
      //   this.updateDisable(entry, entryNode);
      // };
}

inherits(MagicPropertiesProvider, PropertiesActivator);