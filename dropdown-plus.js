import { Polymer } from '../@polymer/polymer/lib/legacy/polymer-fn.js';
import '../@polymer/iron-flex-layout/iron-flex-layout.js';
import '../@polymer/iron-icons/iron-icons.js';
import '../@polymer/iron-icon/iron-icon.js';
import '../@polymer/paper-input/paper-input.js';
Polymer({
  _template: `
<style>
:host {


  --dropdown-plus-focus-color: red;
  --dropdown-plus-focus-color-alpha: rgba(45,45,45,0.4);
  --dropdown-plus-font-size:1.0em;
  --dropdown-plus-content-font-size:calc(var(--dropdown-plus-font-size)*0.80);
  --dropdown-plus-label-color:#4a4a4a;
  --dropdown-plus-label-font-size: calc(var(--dropdown-plus-font-size)*0.80);

}


.dropdown {
    position: relative;
    display: flex;
    flex-grow: 1;
}

.inputField {
  @apply(--layout-flex);
}
.dropdown-content {
    margin-top:6px;
    border-radius:2px;
    font-size:var(--dropdown-plus-content-font-size);
    display: none;
    width:calc(100%);
    position: absolute;
    background-color: #f9f9f9; /* Dropdown background color */
    box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.2);
    z-index: 1;
}

.dropdown-content > div:hover {
  border-left:1px solid var(--dropdown-plus-focus-color);
  background-color: var(--dropdown-plus-focus-color-alpha);


}

.dropdown-content > div {
  cursor:pointer;
  padding:8px 8px 8px 6px;
  border-left:1px solid transparent;

}

.dropdown-content[active] {
    display: block;
}

input {
  background-color:transparent;
  line-height: var(--dropdown-plus-line-height);
  font-size:var(--dropdown-plus-font-size);
  border-bottom: 1px solid transparent;
  border-top: 0px;
  border-right: 0px;
  border-left: 0px;
  width: 100%;
  color:var(--dropdown-plus-focus-color);
  text-transform: lowercase;
}

input:focus {
  outline: none;
  border-bottom: 1px solid var(--dropdown-plus-focus-color);
}

input:hover {
  border-bottom: 1px solid var(--dropdown-plus-focus-color);
}

.inputContainer {
  @apply(--layout-flex);
}

.inputContainer > .title {
  text-transform: lowercase;
  color:var(--dropdown-plus-label-color);
  font-size:var(--dropdown-plus-label-font-size);

}

 iron-icon {

 }

.iconHolder {
    @apply(--layout-horizontal);
    @apply(--layout-flex);
    align-items:center;

}

</style>
<div class="dropdown">
  <div class="inputContainer">
  <div class="iconHolder">
    <div class="inputField">
    <paper-input id="input" on-focus="_openDropdown" value="[[labelValue]]" placeholder="[[placeholder]]" label=[[label]] on-focusout="_closeDropdown">
    <iron-icon icon="[[getIcon(opened)]]" slot="suffix"></iron-icon>
    </paper-input>
    <div class="dropdown-content" id="dropdown">
      <template is="dom-repeat" items="[[items]]">
        <div on-tap="_selectItem">[[item.label]]</div>
      </template>
    </div>
    </div>
  </div>

  </div>
</div>
`,

  getIcon: function () {
    return this.opened ? "arrow-drop-up" : "arrow-drop-down"
  },

  _selectItem: function (e) {
    e.stopPropagation();
    this.set("selectedItem", e.model.item);
    this.$.input.value = this.selectedItem.label;
    this.set("selected", e.model.item[this.attributeForSelected])
    this.set("selectedIndex", e.model.index)
    this.fire("selected", e.model.item)
  },

  _openDropdown: function (e) {
    this.toggleAttribute("active", true, this.$.dropdown);
    this.set("opened", true)
  },

  _closeDropdown: function (e) {
    this.debounce("out", function () {
      this._toggleDropdown();
    }.bind(this), 200)

  },

  _toggleDropdown: function () {
    this.toggleAttribute("active", false, this.$.dropdown);
    this.set("opened", false)
  },

  is: 'dropdown-plus',

  properties: {
    labelValue: { value: "" },
    opened: { value: false },
    label: {
      value: "Data"
    },
    selectedIndex: { notify: true },
    selectedItem: { notify: true },
    attributeForSelected: { value: "label", notify: true },
    items: {
      type: Array,
      value: [
        { "label": "data3plot", "giorno": 3 },
        { "label": "Test2" },
        { "label": "Test3" }],
    },
  }
});
