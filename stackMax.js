let readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let lineIndex = 0
let numberOfCommands = 0
let stack = null

class StackMax {

  constructor(headNodeMain = new LinkedListNode(), headNodeTrackMax = new LinkedListNode()) {
    this.headNodeMain = headNodeMain
    this.headNodeTrackMax = headNodeTrackMax
  }

  push(value) {
    // new node becomes the head node, pointing to what used to be the head node
    this.headNodeMain = new LinkedListNode(value, this.headNodeMain)

    // update the tracking stack
    if (this.headNodeTrackMax == null) {
      this.headNodeTrackMax = new LinkedListNode(value, null)
    } else if (this.headNodeTrackMax.value == null) {
      this.headNodeTrackMax.value = value
    } else if (value > this.headNodeTrackMax.value) { // update max
      this.headNodeTrackMax = new LinkedListNode(value, this.headNodeTrackMax)
    } else { // otherwise push the same max value again to the tracking stack
      this.headNodeTrackMax = new LinkedListNode(this.headNodeTrackMax.value, this.headNodeTrackMax)
    }
  }

  pop() {
    if (this.headNodeMain.value == null) { // nothing to pop
      console.log("error")
    } else if (this.headNodeMain.next == null) { // only the head node exists, so set its value to null
      this.headNodeMain.value = null
      this.headNodeTrackMax.value = null
    } else {
      // let valueToPop = this.headNodeMain.value // save value to be removed to check it against max
      this.headNodeMain = this.headNodeMain.next // switch head node to the next element
      this.headNodeTrackMax = this.headNodeTrackMax.next // <<< ??? (what if next dont exist... )
    }
  }

  getMax() {
    if (this.headNodeTrackMax == null || this.headNodeTrackMax.value == null || this.headNodeMain == null) {
      console.log("None")
    } else {
      console.log(this.headNodeTrackMax.value)
    }
  }

}

class LinkedListNode {
  constructor(value = null, next = null) {
    this.value = value
    this.next = next
  }
}

rl.on('line', function (line) {

  if (lineIndex == 0) {

    numberOfCommands = parseInt(line)

    if (numberOfCommands > 0) {
      stack = new StackMax()
    } else {
      rl.close()
      return
    }

  } else if (lineIndex < numberOfCommands) {

    processCommand(line)

  } else { // last line

    processCommand(line)
    rl.close()

  }

  lineIndex += 1
})

function processCommand(command) {

  if (command.includes("push")) {

    let newValue = parseInt(command.split(' ')[1])
    stack.push(newValue)

  } else if (command.includes("pop")) {

    stack.pop()

  } else if (command === "get_max") {

    stack.getMax()

  }

}