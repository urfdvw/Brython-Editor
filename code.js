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
        "Ctrl-/": 'toggleComment',
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
        "Ctrl-/": 'toggleComment',
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
        + '<body onload="brython(1)">\n'
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
function run_app_page() {
    if (app_window) {
        app_window.close()
    }
    app_window = window.open()
    app_window.document.write(get_html(true))
}

/**
 * file related
 */
let fileHandle;
var butOpenFile = document.getElementById("inputfile")
butOpenFile.addEventListener('click', async () => {
        [fileHandle] = await window.showOpenFilePicker();
        const file = await fileHandle.getFile();
        const contents = await file.text();
        // console.log(contents)
        html_editor.setValue(contents.split('<body onload="brython(1)">')[1].split('<script type="text/python">')[0].trim())
        python_editor.setValue(contents.split('<script type="text/python">')[1].split('</script>')[0].trim())
        document.getElementById('filename').innerHTML = fileHandle.name;
        document.title = fileHandle.name
});

async function writeFile(fileHandle, contents) {
    // Create a FileSystemWritableFileStream to write to.
    const writable = await fileHandle.createWritable();
    // Write the contents of the file to the stream.
    await writable.write(contents);
    // Close the file and write the contents to disk.
    await writable.close();
}


function save_to_file() {
    writeFile(fileHandle, get_html(false));
}

function download(data, filename, type) {
    // Function to download data to a file
    console.log(data)
    var file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

function download_app_page() {
    download(get_html(false), 'index.html', 'text')
}