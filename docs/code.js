/**
 * Code Mirrow related
 */

CodeMirror.commands.autocomplete = function (cm) {
    cm.showHint({ hint: CodeMirror.hint.any });
    cm.showHint({ hint: CodeMirror.hint.anyword });
}

var html_editor = CodeMirror(document.querySelector('#html_editor'), {
    lineNumbers: true,
    value: "<h1 id='text'></h1>",
    tabSize: 4,
    indentUnit: 4,
    mode: "xml",
    htmlMode: true,
    theme: 'monokai',
    extraKeys: {
        Tab: betterTab,
    },
});

html_editor.setSize(width = '100%', height = '100%')

var python_editor = CodeMirror(document.querySelector('#python_editor'), {
    lineNumbers: true,
    value: "from browser import document\ndocument['text'].textContent='Hello, World!'",
    tabSize: 4,
    indentUnit: 4,
    mode: 'python',
    theme: 'monokai',
    extraKeys: {
        Tab: betterTab,
    },
});

python_editor.setSize(width = '100%', height = '100%')

function betterTab(cm) {
    // https://github.com/codemirror/CodeMirror/issues/988#issuecomment-14921785
    if (cm.somethingSelected()) {
        cm.indentSelection("add");
    } else {
        cm.replaceSelection(cm.getOption("indentWithTabs") ? "\t" :
            Array(cm.getOption("tabSize") + 1).join(" "), "end", "+input");
    }
}

/**
 * running app
 */

function get_html(page) {
    html = "<!doctype html>"
        + '<html>\n'
        + '<head>\n'
        + '<meta charset="utf-8">\n'
        + '<script type="text/javascript" src="https://raw.githack.com/brython-dev/brython/master/www/src/brython.js"></script>\n'
        + '<script type="text/javascript" src="https://raw.githack.com/brython-dev/brython/master/www/src/brython_stdlib.js"></script>\n'
        + '</head>\n'
        + '<body onpageshow="brython(1)">\n'
    html += html_editor.getValue() + '\n'
    html += '<script type="text/python">\n'
    html += python_editor.getValue() + '\n'
    html += '</script>\n'
    if (page) {
        html += '<script> brython(1) </script>'
    }
    html += '</body>\n</html>\n'
    return html
}

var app_window

// auto close child window on mother window close
window.addEventListener("beforeunload", function (e) {
    // Do something
    app_window.close()
}, false);

// create new window and set style
function new_tab() {
    app_window = window.open()
    app_window.document.write(get_html(true))
}