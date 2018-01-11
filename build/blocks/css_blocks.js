var ScratchBlocks = window.ScratchBlocks;
ScratchBlocks.Categories.css = "css";

ScratchBlocks.Blocks['css'] = {
    init: function () {
        this.jsonInit({
            "id": "css",
            "message0": "CSS",
            "message1": "%1",
            "args1": [
                {
                    "type": "input_statement",
                    "name": "SUBSTACK"
                }
            ],
            "inputsInline": true,
            "category": ScratchBlocks.Categories.css,
            "colour": ScratchBlocks.Colours.css.primary,
            "colourSecondary": ScratchBlocks.Colours.css.secondary,
            "colourTertiary": ScratchBlocks.Colours.css.tertiary
        });
    }
};

ScratchBlocks.JavaScript['css'] = function (block) {
    return "var style = document.createElement('STYLE');" + 
        ScratchBlocks.JavaScript.statementToCode(block, 'SUBSTACK');
};

ScratchBlocks.Blocks['css_selector'] = {
    init: function () {
        this.jsonInit({
            "id": "css_selector",
            "message0": "selector %1",
            "message1": "%1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "SELECTOR"
                }
            ],
            "args1": [
                {
                    "type": "input_statement",
                    "name": "SUBSTACK"
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "category": ScratchBlocks.Categories.css,
            "colour": ScratchBlocks.Colours.css.primary,
            "colourSecondary": ScratchBlocks.Colours.css.secondary,
            "colourTertiary": ScratchBlocks.Colours.css.tertiary
        });
    },
    onchange: function () {
        function getTop(block) {
            if (block.getSurroundParent()) {
                return getTop(block.getSurroundParent());
            }
            return block;
        }
        var realTop = getTop(this);
        var top = this.getSurroundParent() || this;
        if (this.getSurroundParent() && this.getSurroundParent().disabled) {
            this.disabled = true;
        } else if (!realTop.previousConnection && top.type === "css" && realTop.type === "css") {
            this.disabled = false;
        } else if (realTop.previousConnection) {
            this.disabled = false;
        } else {
            this.disabled = true;
        }
        var inputs = this.inputList;
        for (i = 0; i < inputs.length; i++) {
            if (inputs[i].type !== 3 && inputs[i].connection) {
                if (inputs[i].connection.targetBlock()) {
                    if (inputs[i].connection.targetBlock().disabled && inputs[i].connection.targetBlock().isName) {
                        this.disabled = true;
                    }
                }
            }
        }
        if (this.disabled) {
            if (!this.isInsertionMarker()) this.setOpacity(0.45);
        } else {
            if (!this.isInsertionMarker()) this.setOpacity(1);
        }
    }
};

ScratchBlocks.JavaScript['css_selector'] = function (block) {
    return "style.appendChild(document.createTextNode('" + 
        ScratchBlocks.JavaScript.valueToCode(block, 'SELECTOR') + 
        " {" + 
        ScratchBlocks.JavaScript.statementToCode(block, 'SUBSTACK') + 
        "}'));";
};

ScratchBlocks.Blocks['css_attribute'] = {
    init: function () {
        this.jsonInit({
            "id": "css_attribute",
            "message0": "set attribute %1 to %2",
            "args0": [
                {
                    "type": "input_value",
                    "name": "ATTRIBUTE"
                },
                {
                    "type": "input_value",
                    "name": "VALUE"
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "category": ScratchBlocks.Categories.css,
            "colour": ScratchBlocks.Colours.css.primary,
            "colourSecondary": ScratchBlocks.Colours.css.secondary,
            "colourTertiary": ScratchBlocks.Colours.css.tertiary
        });
    },
    onchange: function () {
        function getTop(block) {
            if (block.getSurroundParent()) {
                return getTop(block.getSurroundParent());
            }
            return block;
        }
        var realTop = getTop(this);
        var top = this.getSurroundParent() || this;
        if (this.getSurroundParent() && this.getSurroundParent().disabled) {
            this.disabled = true;
        } else if (!realTop.previousConnection && top.type === "css_selector" && realTop.type === "css") {
            this.disabled = false;
        } else if (realTop.previousConnection) {
            this.disabled = false;
        } else {
            this.disabled = true;
        }
        var inputs = this.inputList;
        for (i = 0; i < inputs.length; i++) {
            if (inputs[i].type !== 3 && inputs[i].connection) {
                if (inputs[i].connection.targetBlock()) {
                    if (inputs[i].connection.targetBlock().disabled && inputs[i].connection.targetBlock().isName) {
                        this.disabled = true;
                    }
                }
            }
        }
        if (this.disabled) {
            if (!this.isInsertionMarker()) this.setOpacity(0.45);
        } else {
            if (!this.isInsertionMarker()) this.setOpacity(1);
        }
    }
};

ScratchBlocks.JavaScript['css_attribute'] = function (block) {
    return "  " + 
        ScratchBlocks.JavaScript.valueToCode(block, 'ATTRIBUTE') + 
        ": " + 
        ScratchBlocks.JavaScript.valueToCode(block, 'VALUE') + 
        ";";
};

ScratchBlocks.Blocks["css_addon_selector_id"] = {
    init: function() {
        this.isName = true;
        this.jsonInit({
            "id": "css_selector_id",
            "message0": "id %1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "ID"
                }
             ],
            "inputsInline": true,
            "category": ScratchBlocks.Categories.css,
            "colour": ScratchBlocks.Colours.css.primary,
            "colourSecondary": ScratchBlocks.Colours.css.secondary,
            "colourTertiary": ScratchBlocks.Colours.css.tertiary,
            "outputShape": ScratchBlocks.OUTPUT_SHAPE_ROUND,
            "output": "String"
        });
    },
    onchange: function() {
        this.disabled = false;
        if (this.getParent()) this.getParent().onchange();
        if (this.getParent() && this.getParent().type.startsWith("css_selector") && !this.getParent().disabled && this.getParent().getInputTargetBlock("SELECTOR") === this) {
            this.disabled = false;
        } else if (!this.getParent()) {
            this.disabled = false;
        } else {
            this.disabled = true;
        }
        if (this.getParent()) this.getParent().onchange();
        if (this.disabled) {
            if (!this.isInsertionMarker()) this.setOpacity(0.45);
        } else {
            if (!this.isInsertionMarker()) this.setOpacity(1);
        }
    }
};

ScratchBlocks.JavaScript["css_addon_selector_id"] = function(block) {
    return ["#" + ScratchBlocks.JavaScript.valueToCode(block, 'ID')];
};

ScratchBlocks.Blocks["css_addon_selector_class"] = {
    init: function() {
        this.isName = true;
        this.jsonInit({
            "id": "css_selector_class",
            "message0": "class %1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "CLASS"
                }
             ],
            "inputsInline": true,
            "category": ScratchBlocks.Categories.css,
            "colour": ScratchBlocks.Colours.css.primary,
            "colourSecondary": ScratchBlocks.Colours.css.secondary,
            "colourTertiary": ScratchBlocks.Colours.css.tertiary,
            "outputShape": ScratchBlocks.OUTPUT_SHAPE_ROUND,
            "output": "String"
        });
    },
    onchange: function() {
        this.disabled = false;
        if (this.getParent()) this.getParent().onchange();
        if (this.getParent() && this.getParent().type.startsWith("css_selector") && !this.getParent().disabled && this.getParent().getInputTargetBlock("SELECTOR") === this) {
            this.disabled = false;
        } else if (!this.getParent()) {
            this.disabled = false;
        } else {
            this.disabled = true;
        }
        if (this.getParent()) this.getParent().onchange();
        if (this.disabled) {
            if (!this.isInsertionMarker()) this.setOpacity(0.45);
        } else {
            if (!this.isInsertionMarker()) this.setOpacity(1);
        }
    }
};

ScratchBlocks.JavaScript["css_addon_selector_class"] = function(block) {
    return ["." + ScratchBlocks.JavaScript.valueToCode(block, 'CLASS')];
};

ScratchBlocks.Blocks["css_selector_pseudo_class"] = {
    init: function() {
        this.isName = true;
        this.jsonInit({
            "id": "css_selector_pseudo_class",
            "message0": "pseudo class %1 of %2",
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "PSEUDO_CLASS",
                    "options": [
                        ["active", "active"],
                        ["any", "any"],
                        ["any-link", "any-link"],
                        ["checked", "checked"],
                        ["default", "default"],
                        ["disabled", "disabled"],
                        ["empty", "empty"],
                        ["enabled", "enabled"],
                        ["first", "first"],
                        ["first-child", "first-child"],
                        ["first-of-type", "first-of-type"],
                        ["fullscreen", "fullscreen"],
                        ["focus", "focus"],
                        ["hover", "hover"],
                        ["indeterminate", "indeterminate"],
                        ["in-range", "in-range"],
                        ["invalid", "invalid"],
                        ["last-child", "last-child"],
                        ["last-of-type", "last-of-type"],
                        ["left", "left"],
                        ["link", "link"],
                        ["only-child", "only-child"],
                        ["only-of-type", "only-of-type"],
                        ["optional", "optional"],
                        ["out-of-range", "out-of-range"],
                        ["read-only", "read-only"],
                        ["read-write", "read-write"],
                        ["required", "required"],
                        ["right", "right"],
                        ["root", "root"],
                        ["scope", "scope"],
                        ["target", "target"],
                        ["valid", "valid"],
                        ["visited", "visited"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "SELECTOR"
                }
             ],
            "inputsInline": true,
            "category": ScratchBlocks.Categories.css,
            "colour": ScratchBlocks.Colours.css.primary,
            "colourSecondary": ScratchBlocks.Colours.css.secondary,
            "colourTertiary": ScratchBlocks.Colours.css.tertiary,
            "outputShape": ScratchBlocks.OUTPUT_SHAPE_ROUND,
            "output": "String"
        });
    },
    onchange: function() {
        this.disabled = false;
        if (this.getParent()) this.getParent().onchange();
        if (this.getParent() && this.getParent().type.startsWith("css_selector") && !this.getParent().disabled && this.getParent().getInputTargetBlock("SELECTOR") === this) {
            this.disabled = false;
        } else if (!this.getParent()) {
            this.disabled = false;
        } else {
            this.disabled = true;
        }
        if (this.getParent()) this.getParent().onchange();
        if (this.disabled) {
            if (!this.isInsertionMarker()) this.setOpacity(0.45);
        } else {
            if (!this.isInsertionMarker()) this.setOpacity(1);
        }
    }
};

ScratchBlocks.JavaScript["css_selector_pseudo_class"] = function(block) {
    return [ScratchBlocks.JavaScript.valueToCode(block, 'SELECTOR') + ":" + block.getFieldValue('PSEUDO_CLASS')];
};
