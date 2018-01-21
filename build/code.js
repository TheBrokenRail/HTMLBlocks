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
            window.debugExport = true;
            eval(window.ScratchBlocks.JavaScript.blockToCode(html));
            window.debugExport = false;
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
        var inspect = document.getElementById("inspect");
        inspect.innerHTML = "";
        var div = document.createElement("DIV");
        inspect.appendChild(div);
        function displayInspect(node, div, margin) {
            div.onmouseover = function (e) {
                if (window.highlightElement) {
                    window.highlightElement.parentNode.removeChild(window.highlightElement);
                    window.highlightElement = null;
                }
                var highlight = preview.createElement("DIV");
                highlight.style.position = "absolute";
                highlight.style.backgroundColor = "rgba(0,255,255,0.5)";
                highlight.style.width = node.offsetWidth + "px";
                highlight.style.height = node.offsetHeight + "px";
                var elementData = node.getBoundingClientRect();
                highlight.style.top = elementData.top + "px";
                highlight.style.left = elementData.left + "px";
                window.highlightElement = highlight;
                preview.body.appendChild(window.highlightElement);
                div.setAttribute("class", "inspectDiv inspectDivHover");
                e.stopPropagation();
            };
            div.onmouseout = function (e) {
                if (window.highlightElement) {
                    window.highlightElement.parentNode.removeChild(window.highlightElement);
                    window.highlightElement = null;
                }
                div.setAttribute("class", "inspectDiv");
                e.stopPropagation();
            };
            var button = document.createElement("DIV");
            button.innerHTML = "\u25BA";
            var text = document.createElement("DIV");
            text.setAttribute("class", "inspectText");
            var cloneNode = node.cloneNode(false);
            cloneNode.removeAttribute("data-block-id-debug");
            var container = document.createElement("DIV");
            container.appendChild(cloneNode);
            text.appendChild(document.createTextNode(container.innerHTML.replace(new RegExp("</" + cloneNode.nodeName + ">", "gi"), "")));
            container.removeChild(cloneNode);
            button.style.display = "inline";
            button.style.padding = "4px";
            button.style.marginLeft = margin + "px";
            text.style.display = "inline";
            div.appendChild(button);
            div.appendChild(text);
            div.appendChild(document.createElement("BR"));
            var childDiv = document.createElement("DIV");
            div.setAttribute("class", "inspectDiv");
            childDiv.style.display = "none";
            button.onclick = function () {
                if (childDiv.style.display === "none") {
                    button.innerHTML = "\u25BC";
                    childDiv.style.display = "block";
                } else {
                    button.innerHTML = "\u25BA";
                    childDiv.style.display = "none";
                }
            }
            div.appendChild(childDiv);
            function generateMouseOver(itemDiv) {
                return function (e) {
                    if (window.highlightElement) {
                        window.highlightElement.parentNode.removeChild(window.highlightElement);
                        window.highlightElement = null;
                    }
                    itemDiv.setAttribute("class", "inspectDiv inspectDivHover");
                    e.stopPropagation();
                };
            }
            function generateMouseOut(itemDiv) {
                return function (e) {
                    if (window.highlightElement) {
                        window.highlightElement.parentNode.removeChild(window.highlightElement);
                        window.highlightElement = null;
                    }
                    itemDiv.setAttribute("class", "inspectDiv");
                    e.stopPropagation();
                };
            }
            if (node.children.length > 0) {
                for (i = 0; i < node.childNodes.length; i++) {
                    if (node.childNodes[i].nodeName !== "#text") {
                        var itemDiv = document.createElement("DIV");
                        childDiv.appendChild(itemDiv);
                        displayInspect(node.childNodes[i], itemDiv, margin + 8);
                    } else if (node.childNodes[i].nodeValue.trim().length != 0) {
                        var itemDiv = document.createElement("DIV");
                        childDiv.appendChild(itemDiv);
                        itemDiv.onmouseover = generateMouseOver(itemDiv);
                        itemDiv.onmouseout = generateMouseOut(itemDiv);
                        var textarea = document.createElement("TEXTAREA");
                        textarea.style.marginLeft = (margin + 8) + "px";
                        itemDiv.setAttribute("class", "inspectDiv");
                        textarea.value = node.childNodes[i].nodeValue;
                        textarea.readOnly = true;
                        textarea.style.border = "none";
                        textarea.style.width = "calc(100% - " + (margin + 8) + "px)";
                        textarea.style.resize = "none";
                        itemDiv.appendChild(textarea);
                    }
                }
            } else {
                var textarea = document.createElement("TEXTAREA");
                textarea.style.marginLeft = (margin + 8) + "px";
                textarea.setAttribute("class", "inspectDiv");
                textarea.value = node.innerHTML;
                textarea.readOnly = true;
                textarea.style.border = "none";
                textarea.setAttribute("class", "inspectText");
                textarea.style.width = "calc(100% - " + (margin + 8) + "px)";
                textarea.style.resize = "none";
                childDiv.appendChild(textarea);
            }
        }
        displayInspect(preview.documentElement, div, 0);
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
            window.debugExport = false;
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
