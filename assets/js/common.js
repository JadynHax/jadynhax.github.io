function htmlEncode(text) {
    return $('<div/>').text(text).html();
}

function htmlDecode(text) {
  return $('<div/>').html(text).text();
}

function openPageSource() {
    document.querySelector("#source-view-bkg").style.opacity = 1;
    document.querySelector("#source-view-bkg").style.pointerEvents = "auto";
}

function closePageSource() {
    document.querySelector("#source-view-bkg").style.opacity = 0;
    document.querySelector("#source-view-bkg").style.pointerEvents = "none";
}

document.addEventListener("DOMContentLoaded", function() {
    document.body.innerHTML += `
        <div id="source-view-bkg">
            <div id="source-view">
                <div id="close-source">
                    <span class="fas fa-times"></span>
                </div>
                <h1>Page Source</h1>
                <pre class="html"><code>
                    <!-- Page source gets loaded here -->
                </code></pre>
            </div>
        </div>
        <button id="view-source"><i class="fas fa-file-code"></i> View Source</button>`

    fetch(window.location.pathname)
      .then((response) => response.text())
      .then((data) => {$("#source-view > pre > code").text(data)})
      .then(function(){hljs.initHighlighting()});

    document.querySelector("#view-source").onclick = function(){openPageSource()}
    document.querySelector("#source-view-bkg").onclick = function(){closePageSource()}
    document.querySelector("#source-view").onclick = function(){setTimeout(openPageSource, 1)}
    document.querySelector("#close-source").onclick = function(){setTimeout(closePageSource, 2)}
});

$(function(){
    const timeBetween = 200;
    var timing = 500;

    $('.fade-in').each(function(){
        const element = $(this);

        setTimeout(function(){element.removeClass('fade-in').addClass('fade-in-done')}, timing);

        timing += timeBetween;
    });
});


// Finish this later

fs = {
    ls: function(path) {
      if (path.endsWith("/")) {
        path = path.slice(0, -1);
      }

      var contents = $.getJSON(path+"/index.json");
    }
}
