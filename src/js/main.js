/**
 * ! Lager en array and setter inn vertex shader TEXT i hvert sin linje - fin triks
 */

/**
 * ! vi har flere som vec2, vec3 , vec4 - eks vec2 har x og y - Sjekk resten når det er behove for det
 */
var vertexShaderText =
[
'precision mediump float;',
'',
'attribute vec2 vertPosition;',
'',
'void main()',
'{',
    /**
 * ! Under her er vec4 så her tar vi to første fra vertPosition og resten oppggir vi for vec4 forventer 4 verdier
 */
'  gl.Position = vec4(vertPosition, 0.0, 1.0);',
'}'
].join('\n');


/**
 * ! Lager en array and setter inn fragmentShareText i hvert sin linje - fin triks
 */

var fragmentShaderText=[
'precision mediump float;', 
'',
'void manin()',
'{',
'  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);',
'}'
].join('\n');


/**
 * ! i denne function er hva skjer når siden fully loaded
 */
 var Inittriangle = function(){
    console.log("Denne function fungerer");

/**
 * ! Disse fungere for Chrome og firefox internettleser.
 * ! Her trenger vi å hente canvas element fra html
 */
    var canvas = document.getElementById("trianglecanvas");


 /**
 * ! Her trenger vi å hente OpenGL context
 */   
    var gl = canvas.getContext("webgl2");


/**
 * ! Denne linje er for å støtte andre internett leser enn de 2 som er nevnet oppe.
 */ 
    if(!gl){
        console.log("WebGL støttes ikke av nettleser uten experimental-webgl")
        gl = canvas.getContext("experimental-webg2");
    }
    if(!gl){
        alert("Din netleser støtter ikke WebGL");
    }

    /**
 * ! Med denne kan vi sett farge på bakground til området vi skal tegne i (canvas) - Det vil overkjøre alt av css kode som setter farget
 */ 
    gl.clearColor(0.2, 0.9, 0.3, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


/**
 * ! Her skal få OpenGL klar til å ta i bruk FragmentShader og VertxShader - Lager Shaders
 */
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

/**
 * ! Her setter scr code til shaders- Her henter scr code fra array har laget lengre oppe i koden som jeg definert
 */
    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);

/**
 * ! Her compile begge shaders som er laget.
 */
	gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
        console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(vertexShader));
        return;
    }
    
    gl.compileShader(fragmentShader);

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error('Feil Ved Complie Fragment shader!', gl.getShaderInfoLog(fragmentShader));
        return;
    }

 }; 