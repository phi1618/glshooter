var Scene;
(function(){

    Scene = function(gl, vs, fs) {
        this.gl = gl;
        gl.clearColor(0, 0, 0, 0);
        gl.clearDepth(1.0);
        gl.activeTexture(gl.TEXTURE0);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

        var program = this.program = createProgram(
            gl, 
            createShader(gl, "vs", vs), 
            createShader(gl, "fs", fs));

        var attrPosition = gl.getAttribLocation(program, "position");
        var positionBuffer = createVbo(gl, VERTICES);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.enableVertexAttribArray(attrPosition);
        gl.vertexAttribPointer(attrPosition, 3, gl.FLOAT, false, 0, 0);

        var attrTexCoord = gl.getAttribLocation(program, "texCoord");
        var textureBuffer = createVbo(gl, TEXTURE_COORDS);
        gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
        gl.enableVertexAttribArray(attrTexCoord);
        gl.vertexAttribPointer(attrTexCoord, 2, gl.FLOAT, false, 0, 0);

        this.children = [];
        this._removedChildren = [];

        this.viewMat = mat4.identity(mat4.create());
        this.projMat = mat4.identity(mat4.create());

        // mat4.ortho(-16, 16, -16, 16, 0, 32, this.viewMat);
        mat4.lookAt([0,0,16], [0,0,0], [0,1,0], this.viewMat)
        mat4.perspective(90, 1/1, 0.1, 32, this.projMat);

        gl.uniform1f(gl.getUniformLocation(program, "texture"), 0);

        this.uniformLocationsForSprite = getUniformLocationsForSprite(gl, program, [
            "x", "y", "scale", "rotation", "texX", "texY", "alpha", "texScale"
        ]);

        this.frame = 0;

        this.updateMatrix();
    };

    Scene.prototype.updateMatrix = function() {
        var gl = this.gl;
        var program = this.program;

        gl.uniformMatrix4fv(gl.getUniformLocation(program, "vMat"), false, this.viewMat);
        gl.uniformMatrix4fv(gl.getUniformLocation(program, "pMat"), false, this.projMat);
    };

    Scene.prototype.update = function() {
        var children = this.children;
        var removeChildren = this._removedChildren;

        for (var i = 0, len = children.length; i < len; i++) children[i].update();

        for (var i = 0, len = removeChildren.length; i < len; i++) {
            var index = this.children.indexOf(removeChildren[i]);
            if (index != -1) children.splice(index, 1);
        }
        this._removedChildren = [];
    };

    Scene.prototype.clear = function() {
        var gl = this.gl;
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    };

    Scene.prototype.draw = function() {
        var gl = this.gl;
        var program = this.program;
        var children = this.children;

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        for (var i = 0, len = children.length; i < len; i++) children[i].draw(gl);

        gl.flush();

        this.frame++;
    };

    Scene.prototype.add = function(sprite) {
        this.children[this.children.length] = sprite;
        sprite.parent = this;
        sprite.uniforms = this.uniformLocationsForSprite;
    };

    Scene.prototype.remove = function(sprite) {
        if (sprite.parent !== this) return;
        sprite.parent = null;
        this._removedChildren[this._removedChildren.length] = sprite;
        sprite.onremoved();
    };


    function createVbo(gl, data) {
        var vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        return vbo;
    }

    function createProgram(gl, vs, fs) {
        var program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);

        if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
            gl.useProgram(program);
            return program;
        } else {
            alert(gl.getProgramInfoLog(program));
        }
    }

    function createShader(gl, type, script) {
        var shader;
        switch (type) {
            case "vs":
                shader = gl.createShader(gl.VERTEX_SHADER);
                break;
            case "fs":
                shader = gl.createShader(gl.FRAGMENT_SHADER);
                break;
            default:
                return;
        }

        gl.shaderSource(shader, script);
        gl.compileShader(shader);

        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            return shader;
        } else {
            alert(gl.getShaderInfoLog(shader));
        }
    }

    function getUniformLocationsForSprite(gl, program, names) {
        var result = {};
        names.map(function(name) {
            result[name] = gl.getUniformLocation(program, name);
        });
        return result;
    }

    var VERTICES = [
        -1,  1, 0,
        -1, -1, 0,
         1,  1, 0,
         1, -1, 0
    ];

    var TEXTURE_COORDS = [
        0, 0,
        0, 64/512,
        64/512, 0,
        64/512, 64/512
    ];

})();
