const fileSystem = {
    ls: function(path) {
        if (path.endsWith("/")) {
            path = path.slice(0, -1);
        }

        return $.getJSON(path+"/index.json");
    },
    listdir: this.ls,
    read: function(path) {
        return $.get(path).text();
    },
    getData: function(path) {
        var data = {};

        if (path.endsWith(".html")) {
            var content = this.read(path);
            
            /<title>(.*?)<\/title>/i
        }
    }
}
const fs = fileSystem;
