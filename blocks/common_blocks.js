var ScratchBlocks = window.ScratchBlocks;

ScratchBlocks.Colours.html = ScratchBlocks.Colours.control;
ScratchBlocks.Colours.css = ScratchBlocks.Colours.looks;

ScratchBlocks.JavaScript.INDENT = "";

ScratchBlocks.Blocks["text"].onchange = function () {
    if (this.getParent() && this.getParent().disabled) {
        this.disabled = true;
    } else {
        this.disabled = false;
    }
    if (this.disabled) {
        if (!this.isInsertionMarker()) this.setOpacity(0.45);
    } else {
        if (!this.isInsertionMarker()) this.setOpacity(1);
    }
};

ScratchBlocks.JavaScript["text"] = function (block) {
    return [block.getFieldValue('TEXT')];
};

var newNameBlock = function (internalName, attributeName, category, block, inputName) {
    var ScratchBlocks = window.ScratchBlocks;
    ScratchBlocks.Blocks[internalName] = {
        init: function() {
            this.isName = true;
            this.jsonInit({
                "id": internalName,
                "message0": attributeName,
                "inputsInline": true,
                "category": ScratchBlocks.Categories[category],
                "colour": ScratchBlocks.Colours[category].primary,
                "colourSecondary": ScratchBlocks.Colours[category].secondary,
                "colourTertiary": ScratchBlocks.Colours[category].tertiary,
                "outputShape": ScratchBlocks.OUTPUT_SHAPE_ROUND,
                "output": "String"
            });
        },
        onchange: function () {
            this.disabled = false;
            if (this.getParent()) this.getParent().onchange();
            if (this.getParent() && this.getParent().type === block && !this.getParent().disabled && this.getParent().getInputTargetBlock(inputName) === this) {
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
    ScratchBlocks.JavaScript[internalName] = function (block) {
        return [attributeName];
    };
};
