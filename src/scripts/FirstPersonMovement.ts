import {
  Script,
  Vec3,
  Entity,
  Mouse,
  BODYTYPE_DYNAMIC,
  MouseEvent as PcMouseEvent,
  KEY_A,
  KEY_Q,
  KEY_D,
  KEY_W,
  KEY_S,
} from "playcanvas";

export class FirstPersonMovement extends Script {
  static scriptName = "firstPersonMovement";

  /**
   * Optional, assign a camera entity, otherwise one is created.
   *
   * @attribute
   * @title Camera
   * @type {Entity}
   */
  camera: Entity | null = null;

  /**
   * Adjusts the speed of player movement.
   *
   * @attribute
   * @title Power
   * @type {number}
   */
  power: number = 2500;

  /**
   * Adjusts the sensitivity of looking.
   *
   * @attribute
   * @title Look Speed
   * @type {number}
   */
  lookSpeed: number = 0.25;

  // Optional jump power to match props passed from the React scene
  // (not used yet but kept for compatibility)
  jumpPower: number = 10;

  // Internal working vectors set during initialize
  force!: Vec3;
  eulers!: Vec3;

  // initialize code called once per entity
  initialize(): void {
    console.log("FirstPersonMovement postInitialize");
    console.log(this.entity.name);
    console.log(this.entity.collision);
    console.log(this.entity.rigidbody);

    this.force = new Vec3();
    this.eulers = new Vec3();

    const app = this.app;

    // Listen for mouse move events
    if (app.mouse) {
      app.mouse.on("mousemove", this._onMouseMove, this);
    }

    // when the mouse is clicked hide the cursor
    if (app.mouse) {
      app.mouse.on("mousedown", () => {
        app.mouse!.enablePointerLock();
      });
    }

    // Check for required components
    if (!this.entity.collision) {
      console.error(
        "First Person Movement script needs to have a 'collision' component"
      );
    }

    if (
      !this.entity.rigidbody ||
      this.entity.rigidbody.type !== BODYTYPE_DYNAMIC
    ) {
      console.error(
        "First Person Movement script needs to have a DYNAMIC 'rigidbody' component"
      );
    }
  }

  // update code called every frame
  update(dt: number): void {
    void dt;
    // If a camera isn't assigned from the Editor, create one
    if (!this.camera) {
      this._createCamera();
    }

    const force = this.force;
    const app = this.app;

    // Get camera directions to determine movement directions
    const forward = (this.camera as Entity).forward;
    const right = (this.camera as Entity).right;

    // movement
    let x = 0;
    let z = 0;

    // Use W-A-S-D keys to move player
    // Check for key presses
    if (
      app.keyboard &&
      (app.keyboard.isPressed(KEY_A) || app.keyboard.isPressed(KEY_Q))
    ) {
      x -= right.x;
      z -= right.z;
    }

    if (app.keyboard && app.keyboard.isPressed(KEY_D)) {
      x += right.x;
      z += right.z;
    }

    if (app.keyboard && app.keyboard.isPressed(KEY_W)) {
      x += forward.x;
      z += forward.z;
    }

    if (app.keyboard && app.keyboard.isPressed(KEY_S)) {
      x -= forward.x;
      z -= forward.z;
    }

    // use direction from keypresses to apply a force to the character
    if (x !== 0 || z !== 0) {
      force.set(x, 0, z).normalize().mulScalar(this.power);
      this.entity.rigidbody!.applyForce(force);
    }

    // update camera angle from mouse events
    (this.camera as Entity).setLocalEulerAngles(
      this.eulers.y,
      this.eulers.x,
      0
    );
  }

  _onMouseMove(e: PcMouseEvent): void {
    // If pointer is disabled
    // If the left mouse button is down update the camera from mouse movement
    if (Mouse.isPointerLocked() || e.buttons[0]) {
      this.eulers.x -= this.lookSpeed * e.dx;
      this.eulers.y -= this.lookSpeed * e.dy;
    }
  }

  _createCamera(): Entity {
    // If user hasn't assigned a camera, create a new one
    this.camera = new Entity("First Person Camera");
    this.camera.addComponent("camera");
    this.entity.addChild(this.camera);
    this.camera.translateLocal(0, 0.5, 0);
    return this.camera;
  }
}
