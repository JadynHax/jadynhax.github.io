/*
    Text obfuscator display code.
    Copyright (C) 2020 Jason Rutz
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
    You can contact the copyright holder via email at jaonhax@gmail.com.
*/

class Obfuscator {
    constructor(el, params) {
        // Actual class attribute assignments
        this.el = el;
        this.params = params

        this.update = this.update.bind(this);
        this.displayNext = this.displayNext.bind(this);
    }
    obfuscate() {
        this.counter = 0;
        this.displayNext();
    }
    displayNext() {
        // Transition to the next phrase and set up the next displayNext call, or stop displaying if done.
        if (this.counter < this.params.phrases.length) {
            this.setText(this.params.phrases[this.counter]).then(() => {
                setTimeout(this.displayNext, this.params.dispTime);
            })
        }
        // Increment counter
        this.counter++;
        // Make sure counter is mod phrases.length if looping
        if (this.params.loop) {
            this.counter %= this.params.phrases.length;
        }
    }
    setText(newText) {
        newText = this.getCharArray(newText);
        const oldText = this.getCharArray(this.el.innerHTML);
        const length = Math.max(oldText.length, newText.length);
        // Use a Promise for ability to use post-animation operations
        const promise = new Promise((resolve) => this.resolve = resolve);
        // Append chars to a queue able to be used by the .update() method
        this.queue = [];
        for (let i = 0; i < length; i++) {
            // Handle strings with differing lengths
            const from = oldText[i] || '';
            const to = newText[i] || '';
            // Determine a good random start time
            const start = Math.max(Math.floor(Math.random() * this.params.startTime), Math.floor(Math.random() * this.params.startTime));
            const end = start + Math.max(Math.floor(Math.random() * this.params.endTime), Math.floor(Math.random() * this.params.endTime));
            this.queue.push({ from, to, start, end });
        }
        // Make sure old animation is canceled so we can start a new one
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        // Again, that post-animation operation functionality
        return promise;
    }
    getCharArray(string) {
        var charArray = [];
        if (string) {
            // Treat HTML entities, tags, and symbols as a single character.
            const charPattern = /(<.+?>)|(\&[a-z]+?;)|(\&#[0-9]+?;)|(\&#x[0-9a-f]+?;)|./gi
            // Get match first so we can push to charArray as the first part of the loop.
            var match = charPattern.exec(string);
            do {
                charArray.push(match[0]);
                // Get next match so we can make sure it isn't null before we loop.
                match = charPattern.exec(string);
            } while (match != null);
        }
        return charArray
    }
    update() {
        let output = '';
        let complete = 0;
        // Count completed characters
        for (let i = 0; i < this.queue.length; i++) {
            let { end } = this.queue[i];
            if (this.frame >= end) {
                complete++;
            }
        }
        // Loop through the character queue, obfuscating each character along the way.
        for (let i = 0; i < this.queue.length; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < Math.min(complete / this.queue.length, (this.queue.length - complete) / this.queue.length) * 2 * this.params.speed * this.params.accelFactor + this.params.speed * (1 - this.params.accelFactor)) {
                    // Make a chance to sub in to or from characters
                    char = this.randomChar();
                    // Properly escape char
                    char = (char == "<") ? "&lt;" : char;
                    char = (char == ">") ? "&gt;" : char;
                    char = (char == "&") ? "&amp;" : char;
                    // Push char to queue
                    this.queue[i].char = char
                }
                output += char;
            } else {
                // Stay static until start frame has passed
                output += from;
            }
        }
        // Display output in element
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            // Resolve the Promise, allowing for post-animation operations
            this.resolve();
        } else {
            // Request the next animation frame when done if still going.
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    randomChar() {
        return this.params.chars[Math.floor(Math.random() * this.params.chars.length)];
    }
}

function obfuscateOnLoad(obfuParams, selector=".obfuscate") {
    for (item of [["delay", 0], ["startTime", 40], ["endTime", 60], ["dispTime", 1750], ["loop", false], ["chars", "0123456789!<>-_\\/[]{}—=+*^?#"], ["speed", 0.3], ["accelFactor", 0.5]]) {
        if (obfuParams[item[0]] === undefined) {
            obfuParams[item[0]] = item[1];
        }
    }

    document.addEventListener("DOMContentLoaded", function(){
        setTimeout(function(obfuParams, selector){
            const el = document.querySelector(selector || ".obfuscate");
            const obfu = new Obfuscator(el, obfuParams);

           obfu.obfuscate();
        }, obfuParams.delay, obfuParams, selector);
    });
}

function obfuscate(obfuParams, selector=".obfuscate") {
    for (item of [["delay", 0], ["startTime", 40], ["endTime", 60], ["dispTime", 1750], ["loop", false], ["chars", "0123456789!<>-_\\/[]{}—=+*^?#"], ["speed", 0.3], ["accelFactor", 0.5]]) {
        if (obfuParams[item[0]] === undefined) {
            obfuParams[item[0]] = item[1];
        }
    }

    setTimeout(function(obfuParams, selector){
        const el = document.querySelector(selector || ".obfuscate");
        const obfu = new Obfuscator(el, obfuParams);

       obfu.obfuscate();
    }, obfuParams.delay, obfuParams, selector);
}
