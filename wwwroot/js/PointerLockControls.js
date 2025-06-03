THREE.PointerLockControls = function ( camera, domElement ) {
    console.log('Inicializando PointerLockControls');
    
    if ( domElement === undefined ) {
        console.warn( 'THREE.PointerLockControls: The second parameter "domElement" is now mandatory.' );
        domElement = document.body;
    }

    this.domElement = domElement;
    this.isLocked = false;
    
    // Asegurarnos de que la cámara tenga una rotación inicial
    camera.rotation.set( 0, 0, 0 );
    
    var scope = this;
    var euler = new THREE.Euler( 0, 0, 0, 'YXZ' );
    var PI_2 = Math.PI / 2;
    var vec = new THREE.Vector3();
    
    function onMouseMove( event ) {
        if ( scope.isLocked === false ) return;
        
        var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        euler.setFromQuaternion( camera.quaternion );
        euler.y -= movementX * 0.002;
        euler.x -= movementY * 0.002;
        euler.x = Math.max( - PI_2, Math.min( PI_2, euler.x ) );
        camera.quaternion.setFromEuler( euler );
    }
    
    function onPointerlockChange() {
        console.log('Cambio en Pointer Lock:', document.pointerLockElement === scope.domElement);
        scope.isLocked = document.pointerLockElement === scope.domElement;
        
        if ( scope.isLocked ) {
            scope.dispatchEvent( { type: 'lock' } );
        } else {
            scope.dispatchEvent( { type: 'unlock' } );
        }
    }
    
    function onPointerlockError() {
        console.error( 'THREE.PointerLockControls: Error al usar Pointer Lock API' );
    }
    
    this.connect = function () {
        console.log('Conectando eventos de PointerLockControls');
        document.addEventListener( 'mousemove', onMouseMove, false );
        document.addEventListener( 'pointerlockchange', onPointerlockChange, false );
        document.addEventListener( 'pointerlockerror', onPointerlockError, false );
    };
    
    this.disconnect = function () {
        console.log('Desconectando eventos de PointerLockControls');
        document.removeEventListener( 'mousemove', onMouseMove, false );
        document.removeEventListener( 'pointerlockchange', onPointerlockChange, false );
        document.removeEventListener( 'pointerlockerror', onPointerlockError, false );
    };
    
    this.dispose = function () {
        this.disconnect();
    };
    
    this.moveForward = function ( distance ) {
        vec.setFromMatrixColumn( camera.matrix, 0 );
        vec.crossVectors( camera.up, vec );
        camera.position.addScaledVector( vec, distance );
    };
    
    this.moveRight = function ( distance ) {
        vec.setFromMatrixColumn( camera.matrix, 0 );
        camera.position.addScaledVector( vec, distance );
    };
    
    this.lock = function () {
        console.log('Intentando bloquear el puntero');
        this.domElement.requestPointerLock();
    };
    
    this.unlock = function () {
        console.log('Desbloqueando el puntero');
        document.exitPointerLock();
    };
    
    this.getObject = function () {
        return camera;
    };
    
    this.getDirection = function () {
        var direction = new THREE.Vector3( 0, 0, - 1 );
        camera.getWorldDirection( direction );
        return direction;
    };
    
    this.connect();
};

THREE.PointerLockControls.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.PointerLockControls.prototype.constructor = THREE.PointerLockControls; 