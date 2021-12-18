// Defining global variables
const main = document.getElementsByTagName('main')[0]

let dN = document.getElementById('st').value
let dim = document.getElementById('sq').checked ? 2 : 3
let perlin = document.getElementById('pe').checked ? true : false
let threshold = document.getElementById('th').value
let scale = document.getElementById('ps').value
let useColors = document.getElementById('uc').checked

const colors = [
    [200, 0, 0, 200],
    [0, 200, 0, 200],
    [0, 80, 200, 200]
]

function setup() {
    const height = main.offsetWidth / dN

    angleMode(DEGREES)
    createCanvas(height * dN, height * dN, P2D);
    strokeWeight(3)
    noLoop()
}

function draw() {
    const height = main.offsetWidth / dN
    resizeCanvas(main.offsetWidth, main.offsetWidth);

    // Clear canvas
    background(255)

    stroke(50)
    
    // For each dimension, draw a set of lines
    for (let d = 0; d < dim; d++){
        if (useColors){
            stroke(...colors[d])
        }
        
        // Determine the angle of the line that has to be drawn in this dimension
        const angle = d * 180 / dim

        // For each dimension draw a set of lines. quantity depends in input
        for (let h = -int(height); h < (height * 2); h++){

            // Offset determines whether the stitch should start immediatly or one stitch later
            const rand = perlin ? noise((h / (100 / scale) + d * 1000)) : random()
            const offset = rand  < threshold ? 1 : 0

            // Determine start coordinates of the line
            const startX = angle ? h * dN : dN * cos(180/dim) * (h % 2)
            const startY = angle ? 0 : dN * h * sin(180/dim)

            for (let n = 0; n < height * 2; n++){

                // Stitch or no stitch?
                if (n % 2 == offset){ continue }

                line(
                    startX + dN * n * cos(angle),
                    startY + dN * n * sin(angle),
                    startX + dN * (n + 1) * cos(angle),
                    startY + dN * (n + 1) * sin(angle)
                ) 
            }
        }
    }
}

function windowResized(){ draw() }