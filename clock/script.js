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
            color: 0xff9933,
            specular: 0xffffff
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
        // material = new THREE.MeshPhongMaterial(MATERIAL_PARAMETER);
        const circle = new THREE.Mesh(geometry, material);
        scene.add(circle);

        const hourHandGeo = new THREE.ConeGeometry(0.1, 2, 500);
        const hourHand = new THREE.Mesh(hourHandGeo, material);
        hourHand.position.set(0, 1.01, 0);
        scene.add(hourHand);

        let directional = new THREE.DirectionalLight(0xffffff);
        directional.position.set(0, 0, 1).normalize();
        let ambient = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(directional);
        scene.add(ambient);

        let count = 0;
        render();
        function render() {
            count++;
            let s = Math.sin(count * 0.05);
            let c = Math.cos(count * 0.05);
            // circle.position.x = c;
            // circle.position.z = s;
            // circle.rotation.x += 0.01;
            // circle.rotation.y += 0.01;
            renderer.render(scene, camera);
            if (run) { requestAnimationFrame(render); }
        }
    }, false);
})();
