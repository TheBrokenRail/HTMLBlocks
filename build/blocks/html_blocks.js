var ScratchBlocks = window.ScratchBlocks;

ScratchBlocks.Categories.html = "html";

ScratchBlocks.Blocks['html'] = {
    init: function() {
        this.jsonInit({
            "id": "html",
            "message0": "HTML",
            "message1": "%1",
            "args1": [
                {
                    "type": "input_statement",
                    "name": "SUBSTACK"
                }
            ],
            "inputsInline": true,
            "category": ScratchBlocks.Categories.html,
            "colour": ScratchBlocks.Colours.html.primary,
            "colourSecondary": ScratchBlocks.Colours.html.secondary,
            "colourTertiary": ScratchBlocks.Colours.html.tertiary
        });
    }
};

ScratchBlocks.JavaScript['html'] = function (block) {
    return "var element = document.createElement('HTML');" + 
        ScratchBlocks.JavaScript.statementToCode(block, 'SUBSTACK');
};

ScratchBlocks.Blocks['html_element'] = {
    init: function() {
        this.jsonInit({
            "id": "html_element",
            "message0": "element %1",
            "message1": "%1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "ELEMENT"
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
            "category": ScratchBlocks.Categories.html,
            "colour": ScratchBlocks.Colours.html.primary,
            "colourSecondary": ScratchBlocks.Colours.html.secondary,
            "colourTertiary": ScratchBlocks.Colours.html.tertiary
        });
    },
    onchange: function () {
        this.svgPath_.onmouseover = this.onmouseover.bind(this);
        function getTop(block) {
            if (block.getSurroundParent()) {
                return getTop(block.getSurroundParent());
            }
            return block;
        }
        var top = getTop(this);
        if (this.getSurroundParent() && this.getSurroundParent().disabled) {
            this.disabled = true;
        } else if (!top.previousConnection && top.type === "html") {
            this.disabled = false;
        } else if (top.previousConnection) {
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
    },
    onmouseover: function () {
        console.log(this);
    }
};

ScratchBlocks.JavaScript['html_element'] = function (block) {
    var element = ScratchBlocks.JavaScript.valueToCode(block, 'ELEMENT');
    var code = "var tag = 'DIV';try{document.createElement('" +
        element +
        "');tag = '" +
        element +
        "';" +
        "}catch(e){}" +
        "element.appendChild((function (element) {" +
        window.debugExport ? "element.setAttribute('data-block-id-debug','" +
        block.id +
        "');" : "" +
        ScratchBlocks.JavaScript.statementToCode(block, 'SUBSTACK') +
        "return element;})(document.createElement(tag)));";
    return code;
};

ScratchBlocks.Blocks['html_text'] = {
    init: function() {
        this.jsonInit({
            "id": "html_text",
            "message0": "text %1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "TEXT"
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "category": ScratchBlocks.Categories.html,
            "colour": ScratchBlocks.Colours.html.primary,
            "colourSecondary": ScratchBlocks.Colours.html.secondary,
            "colourTertiary": ScratchBlocks.Colours.html.tertiary
        });
    },
    onchange: function () {
        if (this.getSurroundParent()) {
            this.svgPath_.onmouseover = this.getSurroundParent().onmouseover.bind(this.getSurroundParent());
        }
        function getTop(block) {
            if (block.getSurroundParent()) {
                return getTop(block.getSurroundParent());
            }
            return block;
        }
        var top = getTop(this);
        if (this.getSurroundParent() && this.getSurroundParent().disabled) {
            this.disabled = true;
        } else if (!top.previousConnection && top.type === "html") {
            this.disabled = false;
        } else if (top.previousConnection) {
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

ScratchBlocks.JavaScript['html_text'] = function (block) {
    return "element.appendChild(document.createTextNode('" + 
        ScratchBlocks.JavaScript.valueToCode(block, 'TEXT') + 
        "'));";
};

ScratchBlocks.Blocks['html_attribute'] = {
    init: function() {
        this.jsonInit({
            "id": "html_attribute",
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
            "category": ScratchBlocks.Categories.html,
            "colour": ScratchBlocks.Colours.html.primary,
            "colourSecondary": ScratchBlocks.Colours.html.secondary,
            "colourTertiary": ScratchBlocks.Colours.html.tertiary
        });
    },
    onchange: function () {
        if (this.getSurroundParent()) {
            this.svgPath_.onmouseover = this.getSurroundParent().onmouseover.bind(this.getSurroundParent());
        }
        function getTop(block) {
            if (block.getSurroundParent()) {
                return getTop(block.getSurroundParent());
            }
            return block;
        }
        var top = getTop(this);
        if (this.getSurroundParent() && this.getSurroundParent().disabled) {
            this.disabled = true;
        } else if (!top.previousConnection && top.type === "html") {
            this.disabled = false;
        } else if (top.previousConnection) {
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

ScratchBlocks.JavaScript['html_attribute'] = function (block) {
    return "try{element.setAttribute('" + 
        ScratchBlocks.JavaScript.valueToCode(block, 'ATTRIBUTE') + 
        "','" + 
        ScratchBlocks.JavaScript.valueToCode(block, 'VALUE') + 
        "');}catch(e){}";
};
