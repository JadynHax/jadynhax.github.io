function htmlEncode(text) {
    return $('<div/>').text(text).html();
}

function htmlDecode(text) {
  return $('<div/>').html(text).text();
}

window.onload = function() {
    document.body.innerHTML += `
        <div id="source-view-bkg">
            <div id="source-view">
                <span id="close-source">&times;</span>
                <h1>Page Source</h1>
                <pre><code>
                    <!-- Page source gets loaded here -->
                </code></pre>
            </div>
        </div>
        <button id="view-source"><i class="fas fa-file-code"></i> View Source</button>`

    $("#source-view > pre > code").load(window.location.pathname, function(){$("#source-view > pre > code").text($("#source-view > pre > code").html())})

    document.querySelector("#view-source").onclick = function(){document.querySelector("#source-view-bkg").style.opacity = 1; document.querySelector("#source-view-bkg").style.pointerEvents = "auto"}
    document.querySelector("#close-source").onclick = function(){document.querySelector("#source-view-bkg").style.opacity = 0; document.querySelector("#source-view-bkg").style.pointerEvents = "none"}
    hljs.initHighlighting();
    window.onload = undefined
};
