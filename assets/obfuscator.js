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
        // Backwards compatibility for params
        params.startTime = params.startTime || params.start_time;
        params.endTime = params.endTime || params.end_time;
        params.dispTime = params.dispTime || params.disp_time;
        params.chars = params.chars || params.obfu_chars;

        // Actual class attribute assignments
        this.el = el;
        this.counter = 0
        this.params = params;
        this.update = this.update.bind(this);
    }
    obfuscate() {
        this.counter = 0
        const displayNext = () => {
            if (0 <= this.counter < this.params.phrases.length) {
                this.setText(this.params.phrases[this.counter]).then(() => {
                    setTimeout(displayNext, this.params.dispTime)
                })
            }
            this.counter++;
            if (this.params.loop) {
                this.counter %= this.params.phrases.length;
            }
        }
        setTimeout(displayNext, this.params.delay);
    }
    setText(newText) {
        const oldText = this.el.innerHTML
        const length = Math.max(oldText.length, newText.length)
        const promise = new Promise((resolve) => this.resolve = resolve)
        this.queue = []
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || ''
            const to = newText[i] || ''
            const start = Math.floor(Math.random() * this.startTime)
            const end = start + Math.floor(Math.random() * this.endTime)
            this.queue.push({ from, to, start, end })
        }
        cancelAnimationFrame(this.frameRequest)
        this.frame = 0
        this.update()
        return promise
    }
    update() {
        let output = ''
        let complete = 0
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i]
            if (this.frame >= end) {
                complete++
                output += to
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar()
                    this.queue[i].char = char
                }
                output += `<span>${char}</span>`
            } else {
                output += from
            }
        }
        this.el.innerHTML = output
        if (complete === this.queue.length) {
            this.resolve()
        } else {
            this.frameRequest = requestAnimationFrame(this.update)
            this.frame++
        }
    }
    randomChar() {
        return this.params.chars[Math.floor(Math.random() * this.params.chars.length)]
    }
}

function obfuscateElement(selector, obfuParams) {
    const el = document.querySelector(selector)
    const obfu = new Obfuscator(el, obfuParams)

    obfu.obfuscate()
}
