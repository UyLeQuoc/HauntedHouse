import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'
import { Sky } from 'three/examples/jsm/Addons.js'
import gsap from 'gsap'
/**
 * Base
 */
// Debug
const gui = new GUI()
gui.close()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const loadingManager = new THREE.LoadingManager()
const progressText = document.querySelector('.progress-text')
const progressBar = document.querySelector('#progress-bar')
const progressContainer = document.querySelector('.progress-bar-container')
//Loading screen with percent
loadingManager.onStart = () => {
    console.log('Loading started')
}
loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
    const progress = itemsLoaded / itemsTotal
    progressBar.value = +progress
    progressText.innerText = `${Math.round(progress * 100)}%`
    console.log(progressBar.value)
    
    console.log(`Loading progress: ${progress * 100}%`)

}
loadingManager.onLoad = () => {
    console.log('Loading complete')
    //Add Button
    const startButton = document.createElement('button')
    startButton.innerText = 'Start'
    startButton.classList.add('start-button')
    //Add button animation
    progressContainer.appendChild(startButton)
    gsap.from(startButton, {opacity: 0, duration: 1, delay: 1})
    //remove
    
    
    startButton.onclick = () => {
        gsap.to(progressContainer, {opacity: 0, duration: 1})
        progressContainer.remove()
        //Start animation
        tick()
        //Add Sound
        const listener = new THREE.AudioListener()
        camera.add(listener)

        // create a global audio source
        const sound = new THREE.Audio( listener );

        // load a sound and set it as the Audio object's buffer
        const audioLoader = new THREE.AudioLoader();
        audioLoader.load( 'sound/zapsplat_horror_swell_spooky_wind_bell_chime_110737.mp3', function( buffer ) {
            sound.setBuffer( buffer );
            sound.setLoop( true );
            sound.setVolume( 0.5 );
            sound.play();
        });
    }
}
loadingManager.onError = () => {
    console.log('Loading error')
}

const textureLoader = new THREE.TextureLoader(loadingManager)

//Floor
const floorAlphaTexture = textureLoader.load("./floor/alpha.webp")
const floorColorTexture = textureLoader.load("./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.webp")
const floorARMTexture = textureLoader.load("./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.webp")
const floorNormalTexture = textureLoader.load("./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.webp")
const floorDisplacementTexture = textureLoader.load("./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.webp")

floorColorTexture.colorSpace = THREE.SRGBColorSpace

floorColorTexture.repeat.set(8, 8)
floorARMTexture.repeat.set(8, 8)
floorNormalTexture.repeat.set(8, 8)
floorDisplacementTexture.repeat.set(8, 8)

floorColorTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapS = THREE.RepeatWrapping

floorColorTexture.wrapT = THREE.RepeatWrapping
floorARMTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping

// Wall
const wallColorTexture = textureLoader.load("./wall/white_plaster_rough_02_1k/white_plaster_rough_02_diff_1k.webp")
const wallARMTexture = textureLoader.load("./wall/white_plaster_rough_02_1k/white_plaster_rough_02_arm_1k.webp")
const wallNormalTexture = textureLoader.load("./wall/white_plaster_rough_02_1k/white_plaster_rough_02_nor_gl_1k.webp")

wallColorTexture.colorSpace = THREE.SRGBColorSpace

// Roof
const roofColorTexture = textureLoader.load("./roof/roof_slates_02_1k/roof_slates_02_diff_1k.webp")
const roofARMTexture = textureLoader.load("./roof/roof_slates_02_1k/roof_slates_02_arm_1k.webp")
const roofNormalTexture = textureLoader.load("./roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.webp")

roofColorTexture.colorSpace = THREE.SRGBColorSpace

roofColorTexture.repeat.set(3, 2)
roofARMTexture.repeat.set(3, 2)
roofNormalTexture.repeat.set(3, 2)

roofColorTexture.wrapS = THREE.RepeatWrapping
roofARMTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping

roofColorTexture.wrapT = THREE.RepeatWrapping
roofARMTexture.wrapT = THREE.RepeatWrapping
roofNormalTexture.wrapT = THREE.RepeatWrapping

// Bush
const bushColorTexture = textureLoader.load("./bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.webp")
const bushARMTexture = textureLoader.load("./bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.webp")
const bushNormalTexture = textureLoader.load("./bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.webp")

bushColorTexture.colorSpace = THREE.SRGBColorSpace

bushColorTexture.repeat.set(2, 2)
bushARMTexture.repeat.set(2, 2)
bushNormalTexture.repeat.set(2, 2)

bushColorTexture.wrapS = THREE.RepeatWrapping
bushARMTexture.wrapS = THREE.RepeatWrapping
bushNormalTexture.wrapS = THREE.RepeatWrapping

bushColorTexture.wrapT = THREE.RepeatWrapping
bushARMTexture.wrapT = THREE.RepeatWrapping
bushNormalTexture.wrapT = THREE.RepeatWrapping

// Graves
const graveColorTexture = textureLoader.load("./grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.webp")
const graveARMTexture = textureLoader.load("./grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.webp")
const graveNormalTexture = textureLoader.load("./grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.webp")

graveColorTexture.colorSpace = THREE.SRGBColorSpace

graveColorTexture.repeat.set(0.3, 0.4)
graveARMTexture.repeat.set(0.3, 0.4)
graveNormalTexture.repeat.set(0.3, 0.4)

graveColorTexture.wrapS = THREE.RepeatWrapping
graveARMTexture.wrapS = THREE.RepeatWrapping
graveNormalTexture.wrapS = THREE.RepeatWrapping

graveColorTexture.wrapT = THREE.RepeatWrapping
graveARMTexture.wrapT = THREE.RepeatWrapping
graveNormalTexture.wrapT = THREE.RepeatWrapping

// Door
const doorColorTexture = textureLoader.load("./door/color.webp")
const doorAlphaTexture = textureLoader.load("./door/alpha.webp")
const doorAmbientOcclusionTexture = textureLoader.load("./door/ambientOcclusion.webp")
const doorHeightTexture = textureLoader.load("./door/height.webp")
const doorNormalTexture = textureLoader.load("./door/normal.webp")
const doorMetalnessTexture = textureLoader.load("./door/metalness.webp")
const doorRoughnessTexture = textureLoader.load("./door/roughness.webp")

doorColorTexture.colorSpace = THREE.SRGBColorSpace



/**
 * House
 */
const wallMeasurements = {
    width: 4,
    height: 2.5,
}
const roofMeasurements = {
    width: 4,
    height: 2,
    radius: 3.5,
}
const doorMeasurements = {
    width: 2.2,
    height: 2.2,
}
const houseGUI = gui.addFolder('House')


// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20, 100, 100),
    new THREE.MeshStandardMaterial(
        {
            alphaMap: floorAlphaTexture,
            transparent: true,
            map: floorColorTexture,
            aoMap: floorARMTexture,
            roughnessMap: floorARMTexture,
            metalnessMap: floorARMTexture,
            normalMap: floorNormalTexture,
            displacementMap: floorDisplacementTexture,
            displacementScale: 0.3,
            displacementBias: -0.2,
        }
    )
)
const floorGUI = houseGUI.addFolder('Floor')
floorGUI.add(floor.material, 'wireframe').name('Floor Wireframe')
floorGUI.add(floor.material, 'displacementScale').min(0).max(1).step(0.001).name('Displacement Scale')
floorGUI.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001).name('Displacement Bias')
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

// House container
const houseGroup = new THREE.Group()
scene.add(houseGroup);

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(wallMeasurements.width, wallMeasurements.height, wallMeasurements.width),
    new THREE.MeshStandardMaterial({
        map: wallColorTexture,
        aoMap: wallARMTexture,
        roughnessMap: wallARMTexture,
        metalnessMap: wallARMTexture,
        normalMap: wallNormalTexture
    })
)
walls.position.y += wallMeasurements.height / 2
houseGroup.add(walls)


// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(roofMeasurements.radius, roofMeasurements.height, roofMeasurements.width),
    new THREE.MeshStandardMaterial({
        map: roofColorTexture,
        aoMap: roofARMTexture,
        roughnessMap: roofARMTexture,
        metalnessMap: roofARMTexture,
        normalMap: roofNormalTexture
    })
)
roof.position.y += wallMeasurements.height + roofMeasurements.height / 2;
roof.rotation.y = Math.PI / 2 / 2;
houseGroup.add(roof)

// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(doorMeasurements.width, doorMeasurements.height, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        alphaMap: doorAlphaTexture,
        transparent: true,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        displacementBias: 0.04,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
)
door.position.y += doorMeasurements.height / 2
door.position.z += wallMeasurements.width / 2 - 0.04
houseGroup.add(door)

//Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({
    color: '#ccffcc',
    map: bushColorTexture,
    aoMap: bushARMTexture,
    roughnessMap: bushARMTexture,
    metalnessMap: bushARMTexture,
    normalMap: bushNormalTexture
})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)
bush1.rotation.x = -0.75

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.3, 0.1, 2.1)
bush1.rotation.x = -0.75

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.35, 0.35, 0.35)
bush3.position.set(-1, 0.2, 2.2)
bush1.rotation.x = -0.75

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1.3, 0.1, 2.6)
bush1.rotation.x = -0.75

scene.add(bush1, bush2, bush3, bush4)

// Graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
    map: graveColorTexture,
    aoMap: graveARMTexture,
    roughnessMap: graveARMTexture,
    metalnessMap: graveARMTexture,
    normalMap: graveNormalTexture
})
const graveGroup = new THREE.Group()

for(let i = 0; i < 50; i++){

    //Random angle
    const angle = Math.random() * Math.PI * 2;
    const radius = 4 + Math.random() * 3
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius
    //Height
    const y = Math.random() * 0.4

    //Mesh
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.set(x, y, z)
    grave.rotation.x = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5) * 0.4

    //Add to grave group
    graveGroup.add(grave)
}
scene.add(graveGroup)

// GUI
houseGUI.add(houseGroup, 'visible').name('House Visible')
houseGUI.add(walls.material, 'wireframe').name('Walls Wireframe')
houseGUI.add(roof.material, 'wireframe').name('Roof Wireframe')



/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.275)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

// Door light
const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
doorLight.position.set(0, 2, 3)
scene.add(doorLight)

/**
 * Ghosts
 */
const ghostsColorDebug = {
    ghost1: '#5CFF5C',
    ghost2: '#9d00ff',
    ghost3: '#ff0000'
}
const ghost1 = new THREE.PointLight(new THREE.Color(ghostsColorDebug.ghost1), 6)
const ghost2 = new THREE.PointLight(new THREE.Color(ghostsColorDebug.ghost2), 6)
const ghost3 = new THREE.PointLight(new THREE.Color(ghostsColorDebug.ghost3), 6)
const ghostsGUI = gui.addFolder('Ghosts')
ghostsGUI.addColor(ghostsColorDebug, 'ghost1').onChange(() => ghost1.color = new THREE.Color(ghostsColorDebug.ghost1))
ghostsGUI.addColor(ghostsColorDebug, 'ghost2').onChange(() => ghost2.color = new THREE.Color(ghostsColorDebug.ghost2))
ghostsGUI.addColor(ghostsColorDebug, 'ghost3').onChange(() => ghost3.color = new THREE.Color(ghostsColorDebug.ghost3))
scene.add(ghost1, ghost2, ghost3)




/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Shadow
 */
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Cast and rêcive
directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
walls.receiveShadow = true
roof.castShadow = true
floor.receiveShadow = true

graveGroup.children.forEach(grave => {
    grave.castShadow = true
    grave.receiveShadow = true
})

// Mapping
directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.left = -8
directionalLight.shadow.camera.bottom = -4

directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20

// Directional light helper
const directionalLightHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
directionalLightHelper.visible = false
gui.add(directionalLightHelper, 'visible').name('Directional Light Helper')
scene.add(directionalLightHelper)

// Ghost light shadow
ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 10

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 10

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 10


/**
 * Sky
 */
const sky = new Sky()
sky.scale.setScalar(100)
scene.add(sky)

sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)

// SKY GUI
const skyGUI = gui.addFolder('Sky')
skyGUI.add(sky.material.uniforms['turbidity'], 'value').min(0).max(20).step(0.1).name('Turbidity')
skyGUI.add(sky.material.uniforms['rayleigh'], 'value').min(0).max(10).step(0.1).name('Rayleigh')
skyGUI.add(sky.material.uniforms['mieCoefficient'], 'value').min(0).max(0.1).step(0.001).name('Mie Coefficient')
skyGUI.add(sky.material.uniforms['mieDirectionalG'], 'value').min(0).max(1).step(0.001).name('Mie Directional G')
skyGUI.add(sky.material.uniforms['sunPosition'].value, 'x').min(-1).max(1).step(0.001).name('Sun Position X')

/**
 * Fog
 */
// params 1: color, 2: density
scene.fog = new THREE.FogExp2('#02343f', 0.1)

//GUI
const fogGUI = gui.addFolder('Fog')
fogGUI.addColor(scene.fog, 'color').name('Fog Color')
fogGUI.add(scene.fog, 'density').min(0).max(0.5).step(0.0001).name('Fog Density')


// Ghost light helper
const ghost1Helper = new THREE.CameraHelper(ghost1.shadow.camera)
const ghost2Helper = new THREE.CameraHelper(ghost2.shadow.camera)
const ghost3Helper = new THREE.CameraHelper(ghost3.shadow.camera)

ghost1Helper.visible = false
ghost2Helper.visible = false
ghost3Helper.visible = false
scene.add(ghost1Helper, ghost2Helper, ghost3Helper)

const ghostGUI = ghostsGUI.addFolder('Ghost GUI')
ghostGUI.add(ghost1, 'visible').name('Ghost 1 Visible')
ghostGUI.add(ghost1Helper, 'visible').name('Ghost 1 Helper')
ghostGUI.add(ghost2, 'visible').name('Ghost 2 Visible')
ghostGUI.add(ghost2Helper, 'visible').name('Ghost 2 Helper')
ghostGUI.add(ghost3, 'visible').name('Ghost 3 Visible')
ghostGUI.add(ghost3Helper, 'visible').name('Ghost 3 Helper')




/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Update ghosts
    const ghost1Angle = elapsedTime * 0.5;
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(ghost1Angle)*Math.sin(ghost1Angle*2.34)*Math.sin(ghost1Angle * 3.45)

    const ghost2Angle = - elapsedTime * 0.38;
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y = Math.sin(ghost2Angle)*Math.sin(ghost2Angle*2.34)*Math.sin(ghost2Angle * 3.45)

    const ghost3Angle = elapsedTime * 0.2;
    ghost3.position.x = Math.cos(ghost3Angle) * 6
    ghost3.position.z = Math.sin(ghost3Angle) * 6
    ghost3.position.y = Math.sin(ghost3Angle)*Math.sin(ghost3Angle*2.34)*Math.sin(ghost3Angle * 3.45)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
