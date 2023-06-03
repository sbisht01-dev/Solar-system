const paper = document.querySelector("#paper");
const pen = paper.getContext("2d");

let startTime = new Date().getTime()

const draw = () => {
    paper.height = paper.clientHeight;
    paper.width = paper.clientWidth;


    const arcs = [
        "#000000",
        "#0A0A0A",
        "#111111",
        "#1A1A1A",
        "#222222",
        "#2A2A2A",
        "#333333",
        "#3A3A3A",
        "#444444",
        "#4A4A4A",
        "#555555",
        "#5A5A5A",
        "#666666",
        "#6A6A6A",
        "#777777",
        "#7A7A7A7",
        "#FB79AB",
        "#FFB6C1",
        "#FED2CF",
        "#FDDFD5",
        "#FEDCD1"
    ];

    const start = {
        x: paper.width * 0.1,
        y: paper.height * 0.9
    };
    const end = {
        x: paper.width * 0.9,
        y: paper.height * 0.9
    };

    const length = end.x - start.x
    const center = {
        x: paper.width * 0.5,
        y: paper.height * 0.9
    }

    pen.clearRect(0, 0, paper.width, paper.height); // Clear the canvas before drawing

    pen.strokeStyle = "black";
    pen.lineWidth = 0.6;

    pen.beginPath();
    pen.moveTo(start.x, start.y);
    pen.lineTo(end.x, end.y);
    pen.stroke();  //base line


    arcs.forEach((arc, index) => {
        const intialRadius = length * 0.05,
            spacing = (length / 2 - intialRadius) / arcs.length,
            currentTime = new Date().getTime(),
            elapsedTime = (currentTime - startTime) / 1000,
            velocity = 1.9 - (index * .003),
            maxAngle = 2 * Math.PI,
            distance = Math.PI + (elapsedTime * velocity),
            modDistance = distance % maxAngle,
            adjustedDistance = modDistance >= Math.PI ? modDistance : maxAngle - modDistance

        const arcRadius = intialRadius + (index * spacing),
            x = center.x + arcRadius * Math.cos(adjustedDistance),
            y = center.y + arcRadius * Math.sin(adjustedDistance)

        pen.beginPath()
        pen.arc(center.x, center.y, arcRadius, Math.PI, 2 * Math.PI)
        //pen.stroke()    //SEMI-CIRCLE


        pen.beginPath()
        pen.fillStyle = `${arcs[index]}`
        pen.arc(x, y, length * 0.005, 0 * Math.PI, 2 * Math.PI)
        pen.stroke()    //circle
        pen.fill()
    });



    requestAnimationFrame(draw)
};



draw();
