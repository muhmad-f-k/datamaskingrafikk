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
'void main()',
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
    var gl = canvas.getContext("webgl1");


/**
 * ! Denne linje er for å støtte andre internett leser enn de 2 som er nevnet oppe.
 */ 
    if(!gl){
        console.log("WebGL støttes ikke av nettleser uten experimental-webgl");
        gl = canvas.getContext('experimental-webgl');
    }
    if(!gl){
        alert("Din netleser støtter ikke WebGL");
    }

    /**
 * ! Med denne kan vi sett farge på bakground til området vi skal tegne i (canvas) - Det vil overkjøre alt av css kode som setter farget
 */ 
    gl.clearColor(0.75, 0.85, 0.8, 1.0);
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
 * ! Her compile begge shaders som er laget. Lagt til error hvis noe mangler i kode eller feil da vil printe ut i consol hvilken linje det er
 */
	gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error('Feil ved compiling fragment shader!', gl.getShaderInfoLog(vertexShader));
        return;
    }
    
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error('Feil Ved compiling Fragment shader!', gl.getShaderInfoLog(fragmentShader));
        return;
    }
/**
 * ! Nå må lage program (Kan tenke program som en hel grafikk pipline) sånn vi kan fortelle webgl at det er disse to vi trenger å ta i bruke./
 * ! da mener jeg vertexShader og Fragmentshader
 * ! Viktig punkt er at Shader er individuell komponent 
 */
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK.STATUS)){
        console.error('Feil ved linking av program!', gl.getProgramInfoLog(program));
        return;
    }
/**
 * ! Denne kan vi bruke i test env altså debuging. for å validere program.
 */
    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)){
        console.errror('Feil ved validering av program', gl.getProgramInfoLog(program));
        return;
    }
/**
 * ! Create buffer - Så de tallene per nå ligger på cpu og gpu vet ikke at de eksistere
 */
    var triangleVertices=[
        //X, Y
        0.0, 0.05,
        -0.5, -0.5,
        0.5, -0,5
    ];
/**
 * ! Denne er buffer som lager på GPU som er klar for å bli tatt i bruk for å tenke vertices
 */
    var triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    //her sende man data fra vertices
    // En ting er viktig når man sende inn data fra vertices så sendes som 64-bits floating precision number men OpenGL forventer 32-Bits derfor man må konvert det -
    // med ew Float32Array
    // siste delen med gl.STATIC_DRAW at den sender informansjon fra cpu memory til gpu memory kun en gang og da er den ferdig med den.
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

/**
 * ! Så nå må informere vertexShader at Attribute for vert position at det tallene som er listet opp i triangleVertices metode
 */

    var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
    // Layout for the atrribute
    gl.vertexAttribPointer(
        positionAttribLocation, // Attribute location
        2, //number of element per attribute - Det fordi vec 2 har kun 2 element
        gl.FLOAT, // Type of element - De er i 32bits float
        gl.FALSE, // denne for om data er normalisert eller ikke
        2 * Float32Array.BYTES_PER_ELEMENT, // size of an individual vertex - det er 4 men bruker Float32Array.BYTES_PER_ELEMENT for ryddighet skyld
        0 //Offest from beinning of a single verte to this attribute
    );
/**
 * ! Nå må aktivere vertex for bruke - eneste den gjør
 */
    gl.enableVertexAttribArray(positionAttribLocation);

    //Main render loop

    gl.userProgram(program); // her forteller hvilken program skal brukes og så langt har vi kun en program
    gl.drawArrays(gl.TRIANGLES, 0, 3 );// sånn 99% av ganger bruker man gl.TRIANGLES -   tallet 0 - sier hvor mange vertex vi ønsker å skippe og dette tilfelle skal skippe 0 og tallet 3 er hvor mange Vertices skal vi dra og i dette tilfelle 3 som opplyst i triangleVertices.
    

 }; 