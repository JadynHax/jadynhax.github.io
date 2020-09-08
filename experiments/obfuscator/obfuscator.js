/*
LICENSING INFORMATION
	
=======================================================================================================================================
	
	This work is licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License.
	To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/3.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
	
=======================================================================================================================================
	
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
	
	You can contact the creator via email at jaonhax@gmail.com.
*/


//--------------------------------------------------------------------
// Code for the obfuscator.
// Don't change any of this unless you ABSOLUTELY know what you're doing.
//--------------------------------------------------------------------
var obfuData = obfu_data;

const delay = obfuData.delay
const start_time = obfuData.start_time
const end_time = obfuData.end_time
const disp_time = obfuData.disp_time
const loop = obfuData.loop
const obfu_chars = obfuData.obfu_chars
const phrases = obfuData.phrases

class TextScramble {
	constructor(el) {
		this.el = el
		this.chars = obfu_chars
		this.update = this.update.bind(this)
	}
	setText(newText) {
		const oldText = this.el.innerText
		const length = Math.max(oldText.length, newText.length)
		const promise = new Promise((resolve) => this.resolve = resolve)
		this.queue = []
		for (let i = 0; i < length; i++) {
			const from = oldText[i] || ''
			const to = newText[i] || ''
			const start = Math.floor(Math.random() * start_time)
			const end = start + Math.floor(Math.random() * end_time)
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
				output += `<span class="dud">${char}</span>`
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
		return this.chars[Math.floor(Math.random() * this.chars.length)]
	}
}

const el = document.querySelector('.text')
const fx = new TextScramble(el)

let counter = 0
const next = () => {
	fx.setText(phrases[counter]).then(() => {
		setTimeout(next, disp_time)
	})
	if (!loop & counter < phrases.length) {
		counter = counter + 1;
	} else if (counter <= phrases.length) {
		counter = (counter + 1) % phrases.length;
	}
}

setTimeout(next, delay)
