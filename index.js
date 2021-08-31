//1101,656 r[3]
const cSize = 1,
      offset = 10,
      fr = 60

let grid = [],
    x = 0,
    y = 0,
    d = 0 //0,1,2,3 left,up,right,down,
    rules = [],
    col = [],
    bears = 1,
    r = [
        [1, 3],
        [3, [1, 5], [3, 2], 1],
        [1,1,[3,3], 1,3,1,3,1,1,3],
        [3,3,[1,3],3,[1,3],[3,3]],
        [1,[3,5],1,3,[1,6]]
    ],
    p = r[3]
    

function setup() {
    // createCanvas(800 + offset, 800 + offset);
    createCanvas(displayWidth - 50, displayHeight - 150);
    strokeWeight(0.25);
    stroke(0)
    noStroke()
    background(100, 101, 134);
    frameRate(fr)
    fill(255)
    for (let i = 0; i < (width - offset) / cSize; i++) {
        grid.push([])
        for (let j = 0; j < (height - offset) / cSize; j++) {
            grid[i].push(0)
            //rect(i * cellSize + offset / 2, j * cellSize + offset / 2, cellSize, cellSize)
        }
    }
    x = floor(grid.length / 2) - 150
    y = floor(grid[x].length / 2) 
    d = 0

    rules = rule(p)
    //document.getElementById('p').innerHTML = `${dipplayWidth - 50},${displayHeight - 150}`
    for (let k = 0; k < rules.length; k++) col.push([random(256), random(256), random(256)])
}

function next() { //looks at curent square changes it and direction advances
    for (let i = 0; i < rules.length; i++) {
        if (grid[x][y] == rules[i][0]) {
            grid[x][y] = rules[i][1]
            d = (d + rules[i][2]) % 4
            if (d == 0) x = (x - 1 + grid.length) % grid.length
            else if (d == 1) y = (y - 1 + grid[x].length) % grid[x].length
            else if (d == 2) x = (x + 1 + grid.length) % grid.length
            else if (d == 3) y = (y + 1 + grid[x].length) % grid[x].length
            show()
        }
    }
}

function show() {
    for (let i = 0; i < rules.length; i++) {
        if (grid[x][y] == rules[i][0]) fill(col[i][0], col[i][1], col[i][2])
    }
    rect(x * cSize + offset / 2, y * cSize + offset / 2, cSize, cSize)
}

function draw() {
    if (bears)
        for (i = 0; i < 5000; i++) next()
}

function rule(arr) {
    let list = [],
        t = 0,
        f = true
    for (let z = 0; z < arr.length; z++) {
        if (Array.isArray(arr[z])) t += arr[z][1]
        else t++
    }
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            let p = 0
            if (f == true) {
                p = t;
                f = false
            } else
                for (let m = 0; m < list.length; m++) {
                    if (list[m][1] > p) p = list[m][1]
                }
            for (let j = 0; j < arr[i][1]; j++) {
                if (j == 0) list.push([i, p + 1, arr[i][0]]) //0
                else if (j == arr[i][1] - 1) {
                    if (i == arr.length - 1) list.push([p + j, 0, arr[i][0]]) //full end
                    else list.push([p + j, i + 1, arr[i][0]]) //part end
                } else list.push([p + j, p + j + 1, arr[i][0]]) //mid
            }
        } else {
            if (i != arr.length - 1) list.push([i, i + 1, arr[i]])
            else list.push([i, 0, arr[i]])
        }
    }
    console.log(list)
    return list
}

function pp() {
    bears = bears == 1 ? 0 : 1
}

//

