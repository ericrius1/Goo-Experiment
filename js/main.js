require(['goo'], function() {
    require([
        'goo/entities/GooRunner',
        'goo/renderer/Camera', //Include the module
        'goo/entities/components/CameraComponent',
        'goo/shapes/ShapeCreator',
        'goo/entities/EntityUtils',
        'goo/renderer/shaders/ShaderLib',
        'goo/renderer/Material'
    ], function(
        GooRunner,
        Camera,  //Place module in this variable
        CameraComponent,
        ShapeCreator,
        EntityUtils ,
        ShaderLib,
        Material
    ) {
        //Create new instance of Goo Engine
        var goo = new GooRunner();

        //Atach the Goo Engine to the DOM
        //goo.renderer.domElement is a <canvas> element
        document.body.appendChild(goo.renderer.domElement);

        var cameraEntity = goo.world.createEntity('Camera');
        var camera = new Camera(35, 1, 0.1, 1000);
        cameraEntity.setComponent(new CameraComponent(camera));

        //position camera in the world
        cameraEntity.transformComponent.transform.translation.set(0, 0, 5);
        cameraEntity.addToWorld();

        //Create box
        var meshData = ShapeCreator.createBox(1, 1, 1);
        var boxEntity = EntityUtils.createTypicalEntity(goo.world, meshData);
        var material = Material.createMaterial(ShaderLib.texturedLit, 'BoxMaterial');
        boxEntity.meshRendererComponent.materials.push(material);

        //Make boxx visible- adds entity to workd
        boxEntity.addToWorld(); 
    });
});