require({
    // configure our AMD loader
    //  baseUrl: './lib',
    paths: {
        // package mappings
        goo: 'https://bitbucket.org/gootech/tutorials/downloads/goo'
    }
}, ['goo'], function () {
    require([
        'goo/entities/GooRunner',
        'goo/entities/EntityUtils',
        'goo/renderer/Material',
        'goo/renderer/Camera',
        'goo/entities/components/CameraComponent',
        'goo/shapes/ShapeCreator',
        'goo/entities/components/ScriptComponent',
        'goo/renderer/shaders/ShaderLib',
        'goo/entities/World'], function (
    GooRunner,
    EntityUtils,
    Material,
    Camera,
    CameraComponent,
    ShapeCreator,
    ScriptComponent,
    ShaderLib,
    World) {
        // "use strict"; Helps you make fewer errors by detecting more things that could lead to breakages.
        "use strict";

        // Initialize
        var goo = new GooRunner();
        document.body.appendChild(goo.renderer.domElement);

            
        // Create box
        var meshData = ShapeCreator.createBox(1, 1, 1);
        var boxEntity = EntityUtils.createTypicalEntity(goo.world, meshData);
        var material = Material.createMaterial(ShaderLib.texturedLit, 'BoxMaterial');
            
        boxEntity.meshRendererComponent.materials.push(material);

            
        // Spin the box
        boxEntity.setComponent(new ScriptComponent({
            run: function (entity) {
                entity.transformComponent.transform.setRotationXYZ(
                World.time * 1.2,
                World.time * 2.0,
                0);
                entity.transformComponent.setUpdated();
            }
        }));

        // Make box visible
        boxEntity.addToWorld();

            
        // Add camera
        var camera = new Camera(35, 1, 0.1, 1000);
        var cameraEntity = goo.world.createEntity('Camera');
        cameraEntity.setComponent(new CameraComponent(camera));
        cameraEntity.transformComponent.transform.translation.set(0, 0, 5);
        cameraEntity.addToWorld();
    });
});