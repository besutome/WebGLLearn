(() => {
    window.addEventListener('load', () => {
        let run = true;
        const width = window.innerWidth;
        const height = window.innerHeight;
        const targetDOM = document.getElementById('webgl');

        window.addEventListener('keydown', (e) => {
            run = e.keyCode !== 27;
        }, false);

        const CAMERA_PARAMETER = {
            fovy: 60,
            aspect: width / height,
            near: 0.1,
            far: 10.0,
            x: 0.0,
            y: 2.0,
            z: 5.0,
            lookAt: new THREE.Vector3(0.0, 0.0, 0.0)
        };
        const RENDERER_PARAMETER = {
            clearColor: 0x333333,
            width: width,
            height: height
        };
        const MATERIAL_PARAMETER = {
            color: 'navy',
        };

        let scene = new THREE.Scene();
        let camera = new THREE.PerspectiveCamera(
            CAMERA_PARAMETER.fovy,
            CAMERA_PARAMETER.aspect,
            CAMERA_PARAMETER.near,
            CAMERA_PARAMETER.far
        );
        camera.position.x = CAMERA_PARAMETER.x;
        camera.position.y = CAMERA_PARAMETER.y;
        camera.position.z = CAMERA_PARAMETER.z;
        camera.lookAt(CAMERA_PARAMETER.lookAt);

        let controls = new THREE.OrbitControls(camera, render.domElement);
        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(new THREE.Color(RENDERER_PARAMETER.clearColor));
        renderer.setSize(RENDERER_PARAMETER.width, RENDERER_PARAMETER.height);
        targetDOM.appendChild(renderer.domElement);

        const geometry = new THREE.CircleGeometry(2, 500);
        const material = new THREE.MeshLambertMaterial(MATERIAL_PARAMETER);
        const circle = new THREE.Mesh(geometry, material);
        scene.add(circle);

        let directional = new THREE.DirectionalLight(0xffffff);
        directional.position.set(0, 0, 1).normalize();
        let ambient = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(directional);
        scene.add(ambient);

        const hourHandLen = 1
        const hourHandGeo = new THREE.CubeGeometry(hourHandLen, 0.1, 0.1);
        const hourHandMat = new THREE.MeshNormalMaterial();
        const hourHand = new THREE.Object3D();
        const hourHandMesh = new THREE.Mesh(hourHandGeo, hourHandMat);
        hourHandMesh.position.x = hourHandLen / 2;
        hourHand.add(hourHandMesh);
        scene.add(hourHand);

        const minHandLen = 1.5
        const minHandGeo = new THREE.CubeGeometry(minHandLen, 0.1, 0.1);
        const minHandMat = new THREE.MeshNormalMaterial();
        const minHand = new THREE.Object3D();
        const minHandMesh = new THREE.Mesh(minHandGeo, minHandMat);
        minHandMesh.position.x = minHandLen / 2;
        minHand.add(minHandMesh);
        scene.add(minHand);

        const secHandLen = 2
        const secHandGeo = new THREE.CubeGeometry(secHandLen, 0.1, 0.1);
        const secHandMat = new THREE.MeshNormalMaterial();
        const secHand = new THREE.Object3D();
        const secHandMesh = new THREE.Mesh(secHandGeo, secHandMat);
        secHandMesh.position.x = secHandLen / 2;
        secHand.add(secHandMesh);
        scene.add(secHand);

        let count = 0;
        render();
        function render() {
            renderer.render(scene, camera);
            let s = Math.sin(-count * 0.01);
            let c = Math.cos(-count * 0.01);
            hourHand.rotation.z += -0.008;
            minHand.rotation.z += -0.01;
            secHand.rotation.z += -0.015;

            count++;
            if (run) { requestAnimationFrame(render); }
        }
    }, false);
})();
