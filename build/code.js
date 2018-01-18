window.onload = function () {
    var workspace = window.ScratchBlocks.inject('blocks', {
        media: './media/',
        toolbox: document.getElementById('toolbox'),
        zoom: {
            controls: true,
            wheel: true,
            startScale: 0.75
        },
        colours: {
            fieldShadow: 'rgba(255, 255, 255, 0.3)',
            dragShadowOpacity: 0.6
        }
    });
    
    window.workspace = workspace;
    var css = window.ScratchBlocks.Css.styleSheet_.cssRules;
    for (i = 0; i < css.length; i++) {
        if (css[i].selectorText === '.blocklyDragging > .blocklyPath, .blocklyDragging > .blocklyPathLight') {
            css[i].style.fillOpacity = '';
        }
    }
    
    window.ScratchBlocks.Xml.domToWorkspace(document.getElementById('workspace'), workspace);
    workspace.scrollCenter();
    
    workspace.addChangeListener(function () {
        var workspace = window.workspace;
        var top = workspace.getTopBlocks();
        var html = null;
        for (i = 0; i < top.length; i++) {
            if (top[i].type === 'html') {
                html = top[i];
            }
        }
        var css = null;
        for (i = 0; i < top.length; i++) {
            if (top[i].type === 'css') {
                css = top[i];
            }
        }
        var htmlText = "";
        if (html) {
            eval(window.ScratchBlocks.JavaScript.blockToCode(html));
            if (element) {
                if (css) {
                    eval(window.ScratchBlocks.JavaScript.blockToCode(css));
                    if (style) {
                        element.appendChild(style);
                    }
                }
                var div = document.createElement("DIV");
                div.appendChild(element);
                htmlText = window.html_beautify(div.innerHTML, { indent_size: 2 });
            } else {
                throw "No HTML Code Generated!";
            }
        } else {
            throw "No HTML Block!";
        }
        var preview = document.getElementById("preview").contentDocument;
        preview.open();
        preview.writeln(htmlText);
        preview.close();
    });
    
    document.getElementById('save').onclick = function () {
        var name = document.getElementById('name').value;
        if (!name || name === '') {
            name = 'Untitled';
        }
        var project = {};
        project.name = name;
        var xml = window.ScratchBlocks.Xml.workspaceToDom(window.workspace);
        project.blocks = window.xml_js.xml2js(window.ScratchBlocks.Xml.domToText(xml), {compact: false});
        var json = JSON.stringify(project, null, 4);
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:attachment/text,' + encodeURI(json);
        hiddenElement.target = '_blank';
        hiddenElement.download = name + '.json';
        hiddenElement.click();
    };
    
    document.getElementById('load').onclick = function () {
        var input = document.createElement('INPUT');
        input.type = 'file';
        input.onchange = function () {
            if (input.files[0]) {
                var reader = new FileReader();
                reader.onload = function(){
                    try {
                        var text = reader.result;
                        workspace.clear();
                        var project = JSON.parse(text);
                        document.getElementById('name').value = project.name;
                        var xml = window.ScratchBlocks.Xml.textToDom(window.xml_js.js2xml(project.blocks, {compact: false, spaces: 2}));
                        window.ScratchBlocks.Xml.domToWorkspace(xml, workspace);
                    } catch(e) {
                        document.getElementById('name').value = "Untitled";
                        workspace.clear();
                        window.ScratchBlocks.Xml.domToWorkspace(document.getElementById('workspace'), window.workspace);
                        alert("Error: Invalid or Corrupt File");
                        throw "Invalid or Corrupt File";
                    }
                };
                reader.readAsText(input.files[0]);
            }
        };
        input.click();
    };
    
    document.getElementById('export').onclick = function () {
        var workspace = window.workspace;
        var top = workspace.getTopBlocks();
        var html = null;
        for (i = 0; i < top.length; i++) {
            if (top[i].type === 'html') {
                html = top[i];
            }
        }
        var css = null;
        for (i = 0; i < top.length; i++) {
            if (top[i].type === 'css') {
                css = top[i];
            }
        }
        if (html) {
            eval(window.ScratchBlocks.JavaScript.blockToCode(html));
            if (element) {
                if (css) {
                    eval(window.ScratchBlocks.JavaScript.blockToCode(css));
                    if (style) {
                        element.appendChild(style);
                    } else {
                        console.warn("No CSS Code Generated!");
                        alert("Warning: No CSS Code Generated!");
                    }
                } else {
                    console.warn("No CSS Block!");
                    alert("Warning: No CSS Block!");
                }
                var div = document.createElement("DIV");
                div.appendChild(element);
                var html = window.html_beautify(div.innerHTML, { indent_size: 2 });
                var name = document.getElementById('name').value;
                if (!name || name === '') {
                   name = 'Untitled';
                }
                var hiddenElement = document.createElement('a');
                hiddenElement.href = 'data:attachment/text,' + encodeURI(html);
                hiddenElement.target = '_blank';
                hiddenElement.download = name + '.html';
                hiddenElement.click();
            } else {
                alert("Error: No HTML Code Generated!");
                throw "No HTML Code Generated!";
            }
        } else {
            alert("Error: No HTML Block!");
            throw "No HTML Block!";
        }
    };
    
    document.getElementById("about").onclick = function () {
        document.getElementById("aboutBox").style.display = "initial";
    };
    
    document.getElementById("closeAbout").onclick = function () {
        document.getElementById("aboutBox").style.display = "none";
    };
};
