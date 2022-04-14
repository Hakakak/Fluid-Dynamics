const socket = io();
let values = ""

let radius = 50;
let strMatrix = values.split(" ");
let matrix = [];
let N = Math.sqrt(strMatrix.length);
let tau = 2;
 
 
for (let i = 0; i < N; i++) {
    matrix.push([]);
    for (let j = 0; j < N; j++) {
        matrix[i][j] = strMatrix[j + i * N];
    }
}
 
matrix = flipMat180(matrix);
 
let max = matrix[0][0];
let min = matrix[0][0];
 
for (let i = 0; i < matrix.length; i++) {
   for (let j = 0; j < matrix[i].length; j++) {
       if (matrix[i][j] == 0) continue;
 
       if (matrix[i][j] > max){
           max = matrix[i][j];
       }
 
       if (matrix[i][j] < min){
           min = matrix[i][j];
       }
   }
}
 
let difMaMi = max - min;
 
let screensize = 2200 * 3;
 
function setup() {
   createCanvas(screensize * 2,screensize);
}
 
 
 
function draw() {
   background(0,0,0);
   fill(255);

   if(matrix.length == 0) return;
 
   for (let i = 0; i < matrix.length; i++) {
       for (let j = 0; j < matrix[i].length; j++) {
           if (matrix[i][j] == 0){
               stroke(246, 169, 34);
               fill(246, 169, 34);
               rect(j * radius + radius * 0.5, screensize - i * radius - radius * 1.5, radius, radius);
               continue;
           }
 
        //    let radius = matrix[i][j] * 7 * tau;
           let color = (max - matrix[i][j]) * 255;
           let offset = radius * 2 + 30
           
           stroke(color, color, color);
           fill(color, color, color);
           rect(j * radius + radius * 0.5, screensize - i * radius - radius * 1.5, radius, radius);
       }
   }
}
 
 
function flipMat180(matrix){
    let mat1 = createMat(N, N);
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            mat1[N - 1 - i][j] = matrix[i][j];
        }
    }
    return mat1;
}
 
function createMat(n,m){
    let arr = [];
 
    for (let i = 0; i < m; i++) {
        arr[i] = [];
        for (let j = 0; j < n; j++) {
            arr[i][j] = 0;
        }
    }
 
    return arr;
}

socket.on("data", (data) => {
    values = data.data;
})